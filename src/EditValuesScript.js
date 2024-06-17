//#region input text value
function editText(e, t) {
  e.stopPropagation();
  var $el = $(t.firstElementChild);
  var $fieldID = t.firstElementChild.id;
  var parentTabID = t.tabIndex;
  t.tabIndex = -1; // to enable "shift+tab" navigation
  
  if(!isNaN($el.text())) { //if the content is a number we use the number input
    var $input = $(`<input id="${$fieldID}" onclick="event.stopPropagation();" class="num-input" type="numeric"/>`).val('');
  }
  else {
    var $input = $(`<input id="${$fieldID}" onclick="event.stopPropagation();" class="text-input"/>`).val( $el.text() );
  }
  $el.replaceWith( $input );
    
  var save = function() {
    if(($input.val().startsWith('-') || $input.val().startsWith('+')) && !isNaN($input.val())) {
      var $p = $('<p id="'+$fieldID+'"/>').text( Number($input.val()) + Number($el.text()));
    }
    else if($input.val() === '') {
      var $p = $('<p id="'+$fieldID+'"/>').text( $el.text() );
    }
    else {
      var $p = $('<p id="'+$fieldID+'"/>').text( $input.val() );
    }
    
    $input.replaceWith( $p );
    processInput($fieldID);
    setTimeout(function() {
      t.tabIndex = parentTabID;
		}, 2);
    //resizeToFit($("#"+ $fieldID));
  };

  $input.on('keyup', function (e) {
    if(e.key === 'Enter' || e.keyCode === 13) {
      save();
    }
  });
  $input.on('keydown', function (e) {
    if(e.key === 'Tab' || e.keyCode === 9) {
      save();
    }
  });

  $input.one('blur', save).focus();
}

/* $(".editable-num-div").click(function(e) {
  editText(e, this);
}); */
$(".editable-num-div").focus(function(e) {
  editText(e, this);
});

//zu repaint hinzufügen xxx
function resizeToFit(elem) { //broken recursion
  var fontsize = parseFloat(elem.css('font-size'));

  if(fontsize > threshold) {
    elem.css('fontSize', fontsize - 1);
  }
  if (elem.height() >= elem.parent().height() || elem.width() >= elem.parent().width()) {
    resizeToFit(elem);
  }
}

/*jQuery function for editable Input fields*/
//$('body').on('click', '[number-editable]', function(){});
//#endregion
//#region checkbox check
function isChecked(checkbox) {
  if(checkbox){
    return "checked";
  }
  else {
    return "";
  }
}
//#region recover ressources
$("#restPrompt").hide();
function replenishRessouces() {
  var maxHP = Number(charData.HPmaxMod) + (4 * attrTotal.con) + hpTalent - charData.exhaustion;
  var maxMH = Number(charData.MHmaxMod) + (4 * attrTotal.wil) + mhTalent - charData.fatigue;
  var maxEP = Number(charData.EPmaxMod) + epTalent + attrTotal.con;
  var maxFP = Number(charData.FPmaxMod) + fpTalent + attrTotal.wil;
  if(getCharData().rulesset == 1) {
    charData.HPcurrent = maxHP;
    charData.MHcurrent = maxMH;
    charData.EPcurrent = maxEP;
    charData.FPcurrent = maxFP;
    repaintSecondaries();
  }
  else {
    $("#restPrompt").show(150);
    $("#restHours").text(1);
    $("#restSituation").prop('checked', false);
    $("#restButtonConfirm").click(function () {
      var situationFactor = $("#restSituation").is(":checked") ? 2 : 1;
      var healedHP = checkNumInput($("#restHP").text()) * checkNumInput($("#restHours").text()) * situationFactor * hpRegenTalent;
      var healedMH = checkNumInput($("#restMH").text()) * checkNumInput($("#restHours").text()) * situationFactor * mhRegenTalent;
      charData.HPcurrent = Math.min(charData.HPcurrent + healedHP, maxHP);
      charData.MHcurrent = Math.min(charData.MHcurrent + healedMH, maxMH);
      charData.EPcurrent = maxEP;
      charData.FPcurrent = maxFP;
      $("#restPrompt").hide();
      repaintSecondaries();
      $(this).unbind("click");
    });
  }
}
//#region process indiv. Input
function checkNumInput(input) {
  input = input.replace(/,/g, '.');
  if(!isNaN(input)) {
    return Number(input);
  }
  else {
    return 0;
  }
}
function processInput(fieldID){
  if(fieldID.startsWith('attrFolk')){
    var attrType = fieldID.slice(8);
    charData.attrFolk[attrType.toLowerCase()] = checkNumInput($("#" + fieldID).text());
    repaintAttributes();
  }
  else if(fieldID.startsWith('attrPotential')){
    var attrType = fieldID.slice(13);
    charData.attrPotential[attrType.toLowerCase()] = checkNumInput($("#" + fieldID).text());
    repaintAttributes();
  }
  else if(fieldID.startsWith('attrTraining')){
    var attrType = fieldID.slice(12);
    charData.attrTraining[attrType.toLowerCase()] = checkNumInput($("#" + fieldID).text()); 
    repaintAttributes();
  }
  else if(fieldID.startsWith('attrMod')){
    var attrType = fieldID.slice(7);
    charData.attrMod[attrType.toLowerCase()] = checkNumInput($("#" + fieldID).text()); 
    repaintAttributes();
  }
  else if(fieldID.startsWith('attrRank')){
    var attrType = fieldID.slice(8);
    charData.attrRank[attrType.toLowerCase()] = checkNumInput($("#" + fieldID).text()); 
    repaintAttributes();
  }
  else if(fieldID.startsWith('CharName')) {
    let newName = document.getElementById('CharName').innerHTML;
    getCharData().name = newName;
    document.title = (newName + ' Character Sheet');
    getCharData().subtitle = document.getElementById('CharNameSub').innerHTML;
    saveLocalData();
  }
  else if(fieldID.startsWith('ressource')){
    charData[fieldID.slice(9)] = checkNumInput($("#"+fieldID).text());
    saveLocalData();
  }
  else if(fieldID.startsWith('modID')){
    charData[fieldID.slice(5)] = checkNumInput($("#"+fieldID).text());
    repaintSecondaries();
  }
  else if(fieldID.startsWith('mbID')){
    charData.magicBonusMod[fieldID.slice(4)] = checkNumInput($("#"+fieldID).text());
    repaintPowers();
    repaintActions();
  }
  else if(fieldID.startsWith('customOpacity')){
    var opacity = checkNumInput($("#"+fieldID).text());
    charData.customOpacity = Math.min(Math.max(opacity, 0), 10) / 10;
    repaintCustomizations();
  }
  else if(fieldID.startsWith('customColor')){
    charData.customColor = $("#"+fieldID).html();
    repaintCustomizations();
  }
  else if(fieldID.startsWith('customImageLink')){
    charData.customImageLink = $("#"+fieldID).html();
    repaintCustomizations();
  }
  else if(fieldID.startsWith('bagID')){
    charData.bags[fieldID.slice(5)].name = $("#"+fieldID).html();
    repaintInventory();
  }
  else if(fieldID.startsWith('genIDitemfeature')){
    charData.bags[getEntryIndex()].items[getAugmentIndex()].features[fieldID.slice(16)] = $("#"+fieldID).html();
    charData.bags[getEntryIndex()].items[getAugmentIndex()].features.sort(function(a, b){
      let x = a.toLowerCase();
      let y = b.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
    $("#itemFeaturesContainer").html(paintItemFeatures(getEntryIndex(), getAugmentIndex()));
  }
  else if(fieldID.startsWith('genIDpowercolor')) {
    document.getElementById('colorShow').style.backgroundColor = $("#genIDpowercolor").html();
  }
  else if (fieldID.startsWith('itemImageURL')){
    $("#itemImage").attr("src", $("#"+fieldID).html());
    openBeneath(document.getElementById('itemImage'));
  }
  else if(fieldID.startsWith('moneyA')){
    charData.money[fieldID.slice(6)].amount = checkNumInput($("#"+fieldID).html());
    calculateMoney();
    saveLocalData();
  }
  else if(fieldID.startsWith('moneyN')){
    charData.money[fieldID.slice(6)].name = $("#"+fieldID).html();
    repaintRulesSpecifics();
    saveLocalData();
  }
  else if(fieldID.startsWith('moneyC')){
    charData.money[fieldID.slice(6)].conversion = checkNumInput($("#"+fieldID).html());
    sortMoney();
    repaintRulesSpecifics();
    saveLocalData();
  }
  else if(fieldID.startsWith('noteID')){
    charData.notes[fieldID.slice(6)].title = $("#"+fieldID).html();
    saveLocalData();
  }
  else if(fieldID.startsWith('hitzoneN')){
    charData.hitzones[fieldID.slice(8)].name = $("#"+fieldID).html();
    saveLocalData();
  }
  else if(fieldID.startsWith('hitzoneV')){
    charData.hitzones[fieldID.slice(8)].value = $("#"+fieldID).html();
    sortHitzones();
    repaintRulesSpecifics();
    saveLocalData();
  }
  else if(fieldID.startsWith('CharLevel')){
    charData.level = checkNumInput($("#CharLevel").html());
    charData.spMod = checkNumInput($("#CharLevelSPmod").html());
    charData.ppMod = checkNumInput($("#CharLevelPPmod").html());
    charData.mspMod = checkNumInput($("#CharLevelMSPmod").html());
    repaintLevel();
  }
  else if(fieldID.startsWith('xpLabel')){
    charData.xp = checkNumInput($("#xpLabel").html());
    if(!isNaN(charData.xp)) {
      while(charData.xp >= 100) {
        charData.xp -= 100;
        charData.level++;
      }
      while(charData.xp < 0) {
        charData.xp += 100;
        charData.level--;
      }
    }
    repaintLevel();
  }
  else if(fieldID.startsWith('descID')){
    if(fieldID.startsWith('descIDsizeClass')) {
      charData.sizeClass = checkNumInput($("#descIDsizeClass").html());
      repaintSecondaries();
    }
    else {
      charData[fieldID.slice(6)] = $("#"+fieldID).html();
      saveLocalData();
    }
  }
  else if(fieldID.startsWith('condiIDname')){
    charData.conditions[fieldID.slice(11)].name = $("#"+fieldID).html();
    repaintConditions();
  }
  else if(fieldID.startsWith('tired')){
    var exhaustionBefore = charData.exhaustion;
    var fatigueBefore = charData.fatigue;
    var exhaustionNow = checkNumInput($("#tiredExhaustion").html());
    var fatigueNow = checkNumInput($("#tiredFatigue").html());
    if((exhaustionNow - exhaustionBefore) > 0) {
      charData.HPcurrent -= (exhaustionNow - exhaustionBefore);
    }
    if((fatigueNow - fatigueBefore) > 0) {
      charData.MHcurrent -= (fatigueNow - fatigueBefore);
    }
    charData.exhaustion = exhaustionNow;
    charData.fatigue = fatigueNow;
    repaintSecondaries();
  }
  else if(fieldID.startsWith('maxSaves')){
    if(checkNumInput($("#"+fieldID).html()) > 1) {
      maxSaves = Number($("#"+fieldID).html());
    }
    else {
      maxSaves = 2;
      $("#"+fieldID).html(2);
    }
    charData.maxSaves = maxSaves;
    saveLocalData();
  }
}

//#region markdown converter
var mdConverter = new showdown.Converter();
mdConverter.setOption('parseImgDimensions', 'true');
mdConverter.setOption('strikethrough', 'true');
mdConverter.setOption('tables', 'true');
mdConverter.setOption('smartIndentationFix', 'true');
mdConverter.setOption('simpleLineBreaks', 'true');
mdConverter.setOption('requireSpaceBeforeHeadingText', 'true');
mdConverter.setOption('openLinksInNewWindow', 'true');
mdConverter.setOption('emoji', 'true');
function fullTextConvert(text) {
  let convertText = text;
  convertText = parseSingles(convertText);
  convertText = parseCalculations(convertText);
  convertText = mdConverter.makeHtml(convertText);
  //filter XSS?
  return convertText;
}
//#region text calculations
function calcTextInput(text){
  return parseCalculations(parseSingles(text));
}
function parseSingles(text) {
  if(text.includes("[[")) {
    return text.slice(0, text.indexOf("[[")) + 
    getVarVal(text.slice(text.indexOf("[["), text.indexOf("]]")+2)) + 
    parseSingles(text.slice(text.indexOf("]]")+2));
  }
  else {
    return text;
  }
}
function parseCalculations(text) {
  if(text.includes("{{")) {
    return text.slice(0, text.indexOf("{{")) + 
    fullCalc(text.slice(text.indexOf("{{")+2, text.indexOf("}}"))) + 
    parseCalculations(text.slice(text.indexOf("}}")+2));
  }
  else {
    return text;
  }
}

let atrKeys = {"ST": "str", "KO": "con", "PR": "acc", "GW": "agi", "WA": "per", "WK": "wil", "IN": "int", "AU": "exp"};
function getVarVal(input) {
  let varText = input.slice(2, -2);
  let skillNames = [];
  for (let i in charData.skills) {
    skillNames.push(charData.skills[i].name);
  }

  if(["ST", "KO", "PR", "GW", "WA", "WK", "IN", "AU"].includes(varText.toUpperCase())) {
    return getAttrTotal()[atrKeys[varText.toUpperCase()]];
  }
  else if(["ZBST", "ZBKO", "ZBPR", "ZBGW", "ZBWA", "ZBWK", "ZBIN", "ZBAU"].includes(varText.toUpperCase())) {
    let mbAtr = atrKeys[varText.toUpperCase().slice(2)];
    let baseAtr = getAttrTotal()[mbAtr];
    return baseAtr + getCharData().magicBonusMod[mbAtr] + mbTalent[mbAtr] + mbTalent.all;
  }
  else if(["STBON"].includes(varText.toUpperCase())) {
    let baseST = getAttrTotal()["str"];
    return baseST + stbTalent;
  }
  else if(skillNames.includes(varText)) {
    let skillP = getCharData().skills[skillNames.indexOf(varText)];
    if(getCharData().rulesset == "2") {
      return Number(skillP.rank * 10) + Number(skillP.mod);
    }
    else {
      return Number(skillP.expertise) + Number(skillP.mod);
    }
  }
  else {
    return varText;
  }
}
function fullCalc(expression) {
  expression = expression.replace(/\s/g, '');
  expression = expression.replace(/[^-()\d/*+.]/g, '');
  return calcHelper(Array.from(expression), 0).toFixed(0); //Always rounded down
}
function calcHelper(s, idx) {
  var stk = [];
  let sign = '+';
  let num = 0;
  for (let i = idx; i < s.length; i++) {
    let c = s[i];
    if (c >= '0' && c <= '9') {
      num = num * 10 + (c - '0');
    }
    if (!(c >= '0' && c <= '9') || i===s.length-1) {
      if (c==='(') {
        num = calcHelper(s, i+1);
        let l = 1, r = 0;
        for (let j = i+1; j < s.length; j++) {
          if (s[j]===')') {
            r++;
            if (r===l) {
              i=j; break;
            }
          }
          else if (s[j]==='(') l++;
        }
      }
      let pre = -1;
      switch (sign) {
        case '+':
          stk.push(num);
          break;
        case '-':
          stk.push(num*-1);
          break;
        case '*':
          pre = stk.pop();
          stk.push(pre*num);
          break;
        case '/':
          pre = stk.pop();
          stk.push(pre/num);
          break;
      }
      sign = c;
      num = 0;
      if (c===')') break;
    }
  }
  let ans = 0;
  while (stk.length > 0) {
    ans += stk.pop();
  }
  return ans;
}
/*
$("#NotesField").blur(function() {
  getCharData().notes[0].text = $("#NotesField").val();
});
*/