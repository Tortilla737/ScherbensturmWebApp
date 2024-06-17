//#region panel open/close
let rightOpen = false;
let leftOpen = false;

function openNav(panelside, canClose) {
  if(panelside == '1' || panelside === 'left') {
    if (!leftOpen) {
      document.getElementById("leftSidepanel").style.width = "350px";
      document.getElementById("leftpanelbtn").innerHTML = "&#10799;";
      document.getElementById("leftpanelbtn").classList.add("leftOpen");
      leftOpen = true;
    } else if (leftOpen && canClose) {
      document.getElementById("leftSidepanel").style.width = "0px";
      document.getElementById("leftpanelbtn").innerHTML = "&#9776;";
      document.getElementById("leftpanelbtn").classList.remove("leftOpen");
      leftOpen = false;
    }
  }
  else if(panelside == '2' || panelside === 'right') {
    if (!rightOpen) {
      document.getElementById("rightSidepanel").style.width = "350px";
      document.getElementById("rightpanelbtn").innerHTML = "&#10799;";
      document.getElementById("rightpanelbtn").classList.add("rightOpen");
      rightOpen = true;
    } else if (rightOpen && canClose) {
      document.getElementById("rightSidepanel").style.width = "0px";
      document.getElementById("rightpanelbtn").innerHTML = "&#11164;";
      document.getElementById("rightpanelbtn").classList.remove("rightOpen");
      rightOpen = false;
    }
  }
}
function openPanelPage(pageName) {
  var i, allPages;
  allPages = document.getElementsByClassName("panel-content");
  for (i = 0; i < allPages.length; i++) {
    allPages[i].style.display = "none";
  }
  document.getElementById(pageName).style.display = "flex";
  openNav(2, false);
}
//#region tabs
function openTabPage(pageName, elmnt) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("tab-clicked");
  }

  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";

  // Add the specific color to the button used to open the tab content
  if(elmnt) {
    elmnt.classList.add("tab-clicked");
  }
}
function openTabNr(n) {
  document.getElementsByClassName("tablink")[n].click(); 
}
//#region open beneath
function openBeneath(thisDiv) {
  thisDiv.classList.toggle("open-sibling");
  thisDiv.nextElementSibling.classList.toggle("open-info-beneath");
} 
function closeContentBeneath(thisDiv) {
  //cares for the Node order in repaintInventory()
  thisDiv.firstElementChild.firstElementChild.classList.toggle("close-content-rotate");
  thisDiv.nextElementSibling.classList.toggle("close-content-beneath");
}
//#region delete modal
function openDeleteModal(funct) {
  document.getElementById('deleteModal').style.display='block';
  $("#confirmDeleteButton").html(
    `<button class="in-panel-btn savebtn" onclick="${funct}; document.getElementById('deleteModal').style.display='none';">Löschen</button>`
  );
}
//#region search
function filterPanelTalents() {
  var searchTerm = $("#searchTalents").val().toLowerCase();
  for(let i in talentData) {
    if(
      (talentData[i].name.toLowerCase().indexOf(searchTerm) > -1 ||
      talentData[i].shorttext.toLowerCase().indexOf(searchTerm) > -1 ||
      talentData[i].longtext.toLowerCase().indexOf(searchTerm) > -1) && 
      talentData[i].rules.includes(getCharData().rulesset) && 
      talentData[i].attributes.includes($("#attributeChoice").val())
    ) {
      $("#searchTalent"+i).show();
    }
    else{
      $("#searchTalent"+i).hide();
    }
  }
}
function filterPowers() {
  var searchTerm = $("#searchPowers").val().toLowerCase();
  for(let i in getCharData().powers) {
    if(getCharData().powers[i].name.toLowerCase().indexOf(searchTerm) > -1 ||
    getCharData().powers[i].skill.toLowerCase().indexOf(searchTerm) > -1 ||
    getCharData().powers[i].text.toLowerCase().indexOf(searchTerm) > -1
    ) {
      $("#scrollIDpower"+i).show();
    }
    else{
      $("#scrollIDpower"+i).hide();
    }
  }
}
/* 
$(document).ready(function () {
  $("#searchTalents").on("keyup", function () {
    $('.searchTalent').hide();
    var searchTerm = $(this).val().toLowerCase();
    $('.searchTalent').filter(function () {
      return $(this).find("p").text().toLowerCase().indexOf(searchTerm) > -1;
    }).show();
  });
});
*/
//#region keys
var pressedKeys = {};
window.onkeydown = function (e) {
  pressedKeys[e.keyCode] = true;
  if (e.shiftKey) {pressedKeys['shift'] = true;}
  if (e.altKey) {pressedKeys['alt'] = true;}
  if (e.ctrlKey) {pressedKeys['ctrl'] = true;}
}
window.onkeyup = function (e) {
  pressedKeys[e.keyCode] = false;
  if (e.keyCode == 16) {pressedKeys['shift'] = false;}
  if (e.keyCode == 18) {pressedKeys['alt'] = false;}
  if (e.keyCode == 17) {pressedKeys['ctrl'] = false;}
}

//------------panel page content management--------------
//#region panels
let entryIndex = 0;
function getEntryIndex() {
  return entryIndex;
}
let augmentIndex = 0;
function getAugmentIndex() {
  return augmentIndex;
}
//#region skill panel
function openSkillPanel(indexN){
  $("#genIDskillname").text(getCharData().skills[indexN].name);
  $("#genIDskillbasecost").text(getCharData().skills[indexN].basecost);
  $("#genIDskillrank").text(getCharData().skills[indexN].rank);
  $("#genIDskillexpertise").text(getCharData().skills[indexN].expertise);
  $("#genIDskillattributes").text(getCharData().skills[indexN].attributes);
  $("#genIDskillmod").text(getCharData().skills[indexN].mod);
  $("#genIDskilltext").val(getCharData().skills[indexN].text);
  entryIndex = indexN;
  openPanelPage('skillPanelPage');
}

function saveSkill(indexN) {
  getCharData().skills[indexN].name = $("#genIDskillname").text();
  getCharData().skills[indexN].basecost = $("#genIDskillbasecost").text();
  getCharData().skills[indexN].rank = $("#genIDskillrank").text();
  getCharData().skills[indexN].expertise = $("#genIDskillexpertise").text();
  getCharData().skills[indexN].attributes = $("#genIDskillattributes").text();
  getCharData().skills[indexN].mod = $("#genIDskillmod").text();
  getCharData().skills[indexN].text = $("#genIDskilltext").val();
  repaintSkills();
  repaintActions();
  openNav(2, true);
}
function deleteSkill(indexN) {
  getCharData().skills.splice(indexN, 1);
  repaintSkills();
  openNav(2, true);
}
function addNewSkill() {
  getCharData().skills.push({
    "name": "Neue Fertigkeit",
    "basecost": 0,
    "rank": 0,
    "expertise": 0,
    "attributes": "",
    "mod": 0,
    "text": ""
  });
  openSkillPanel(getCharData().skills.length-1);
  let state = charData.sort;
  charData.sort = false;
  repaintSkills();
  charData.sort = state;
}
//#region talent panel
function openTalentPanel(){
  allTalents = "";
  for(let i in talentData) {
    rankContent = "";
    addButton = `<button onclick="addNewTalent(${i}); event.stopPropagation();">+</button>`;
    for(let t = 0; t<5; t++) {
      if(talentData[i].ranks[t] == 1) {
        rankContent += `<p>&#9671</p>`;
      }
      else if(talentData[i].ranks[t] == 2) {
        rankContent += `<p>&#9672</p>`;
      }
      else {
        rankContent += `<p>-</p>`;
      }
    }
    for(let j in getCharData().talents) {
      if(getCharData().talents[j].name == talentData[i].name) {
        addButton = "";
        break;
      }
    }
    allTalents += `
    <div id="searchTalent${i}">
      <div class="talent-panel-grid pointer-div gradient-line-top" onclick="openBeneath(this)">
        <p>${talentData[i].name}</p>
        <div class="grid-5 talent-ranks-wrapper">${rankContent}</div>
        <div>${addButton}</div>
      </div>
      <div class="info-beneath">
        <div>${fullTextConvert(talentData[i].longtext)}</div>
        <div class="vertical-spacing"></div>
        <p class="italic-text">${talentData[i].flavor}</p>
      </div>
    </div>
    `;
  }
  $("#fullTalentList").html(allTalents);
  filterPanelTalents();
  openPanelPage('talentPanelPage');
}
function deleteTalent(indexN) {
  getCharData().talents.splice(indexN, 1);
  repaintTalents();
}
function addNewTalent(indexN) {
  let newT = talentData[indexN];
  getCharData().talents.push({
    "name": newT.name,
    "ranks": [false, false, false, false, false],
    "ranksPossible": [newT.ranks[0], newT.ranks[1], newT.ranks[2], newT.ranks[3], newT.ranks[4]],
    "shorttext": newT.shorttext,
    "longtext": newT.longtext
  });
  repaintTalents();
  if(!pressedKeys.shift) {
    openNav(2, true); //press shift to add more talents
  }
  else {
    openTalentPanel();
  }
  document.getElementById('scrollTalent'+newT.name).scrollIntoView({
    behavior: 'auto',
    block: 'center',
    inline: 'center'
  });
}
function addNewCustomTalent() {
  document.getElementById('customTalentContainer').classList.remove('open-custom-talent');
  document.getElementById('customTalentTri').classList.remove('open-content-rotate');
  function determineCustomRank(box, boxMastery) {
    if(document.getElementById(box).checked){
      if(document.getElementById(boxMastery).checked){
        return 2;
      }
      else {
        return 1;
      }
    }
    else {
      return 0;
    }
  }
  getCharData().talents.push({
    "name": $("#customTalentname").text(),
    "ranks": [false, false, false, false, false],
    "ranksPossible": [
      determineCustomRank("customTalentrank1", "customTalentmasteryrank1"), 
      determineCustomRank("customTalentrank2", "customTalentmasteryrank2"), 
      determineCustomRank("customTalentrank3", "customTalentmasteryrank3"), 
      determineCustomRank("customTalentrank4", "customTalentmasteryrank4"), 
      determineCustomRank("customTalentrank5", "customTalentmasteryrank5")
    ],
    "shorttext": $("#customTalentshorttext").text(),
    "longtext": $("#customTalentlongtext").val()
  });
  repaintTalents();
  openNav(2, true);

  $("#customTalentname").html(""); //reset panel
  for(let i = 1; i <= 5; i++) {
    document.getElementById("customTalentrank" + i).checked = false;
    document.getElementById("customTalentmasteryrank" + i).checked = false;
  }
  $("#customTalentshorttext").text("");
  $("#customTalentlongtext").val("");
}
//#region powers panel
function openPowersPanel(indexN) {
  $("#genIDpowername").text(getCharData().powers[indexN].name);
  $("#genIDpowertype").text(getCharData().powers[indexN].type);
  $("#genIDpowertime").text(getCharData().powers[indexN].time);
  $("#genIDpowercost").text(getCharData().powers[indexN].cost);
  $("#genIDpowerrank").text(getCharData().powers[indexN].rank);
  document.getElementById("genIDpowermastery").checked = getCharData().powers[indexN].mastery;
  $("#genIDpowerskill").text(getCharData().powers[indexN].skill);
  $("#genIDpowerhit").text(getCharData().powers[indexN].hit);
  $("#genIDpowerdamage").text(getCharData().powers[indexN].damage);
  $("#genIDpowercooldown").text(getCharData().powers[indexN].cooldown);
  $("#genIDpowercolor").text(getCharData().powers[indexN].color);
  $("#genIDpowertext").val(getCharData().powers[indexN].text);
  entryIndex = indexN;
	let event = new Event('input', { bubbles: true });
	document.getElementById("genIDpowertext").dispatchEvent(event);
  document.getElementById('colorShow').style.backgroundColor = $("#genIDpowercolor").html();
  openPanelPage('powerPanelPage');
}
function savePower(indexN) {
  getCharData().powers[indexN].name = $("#genIDpowername").text();
  getCharData().powers[indexN].type = $("#genIDpowertype").text();
  getCharData().powers[indexN].time = $("#genIDpowertime").text();
  getCharData().powers[indexN].cost = $("#genIDpowercost").text();
  getCharData().powers[indexN].rank = $("#genIDpowerrank").text();
  getCharData().powers[indexN].mastery = document.getElementById("genIDpowermastery").checked;
  getCharData().powers[indexN].skill = $("#genIDpowerskill").text();
  getCharData().powers[indexN].hit = $("#genIDpowerhit").text();
  getCharData().powers[indexN].damage = $("#genIDpowerdamage").text();
  getCharData().powers[indexN].cooldown = $("#genIDpowercooldown").text();
  getCharData().powers[indexN].color = $("#genIDpowercolor").text();
  getCharData().powers[indexN].text = $("#genIDpowertext").val();
  repaintPowers();
  repaintActions();
  openNav(2, true);
}
function deletePower(indexN) {
  getCharData().powers.splice(indexN, 1);
  repaintPowers();
  openNav(2, true);
}
function addNewPower() {
  getCharData().powers.push({
    "name": "Neue Kraft",
    "rank": 1,
    "mastery" : false,
    "cost": "-",
    "type": "Einsatz",
    "time": "-",
    "skill": "-",
    "hit": "-",
    "damage": "-",
    "cooldown": "-",
    "color": "#555",
    "text": "",
    "augments": []
  });
  openPowersPanel(getCharData().powers.length-1);
  let state = charData.sort;
  charData.sort = false;
  repaintPowers();
  charData.sort = state;
}
//#region augment panel
function openAugmentsPanel(indexN, indexP) {
  $("#genIDaugmentname").text(getCharData().powers[indexN].augments[indexP].name);
  $("#genIDaugmentcost").text(getCharData().powers[indexN].augments[indexP].cost);
  $("#genIDaugmentrank").text(getCharData().powers[indexN].augments[indexP].rank);
  $("#genIDaugmenttype").text(getCharData().powers[indexN].augments[indexP].type);
  document.getElementById("genIDaugmentmastery").checked = getCharData().powers[indexN].augments[indexP].mastery;
  $("#genIDaugmenttext").val(getCharData().powers[indexN].augments[indexP].text);
  entryIndex = indexN;
  augmentIndex = indexP;
  openPanelPage('augmentPanelPage');
}
function saveAugment(indexN, indexP) {
  getCharData().powers[indexN].augments[indexP].name = $("#genIDaugmentname").text();
  getCharData().powers[indexN].augments[indexP].cost = $("#genIDaugmentcost").text();
  getCharData().powers[indexN].augments[indexP].rank = $("#genIDaugmentrank").text();
  getCharData().powers[indexN].augments[indexP].type = $("#genIDaugmenttype").text();
  getCharData().powers[indexN].augments[indexP].mastery = document.getElementById("genIDaugmentmastery").checked;
  getCharData().powers[indexN].augments[indexP].text = $("#genIDaugmenttext").val();
  repaintPowers();
  openNav(2, true);
}
function deleteAugment(indexN, indexP) {
  getCharData().powers[indexN].augments.splice(indexP, 1);
  repaintPowers();
  openNav(2, true);
}
function addNewAugment(indexN) {
  getCharData().powers[indexN].augments.push({
    "name": "Neues Augment",
    "rank": 1,
    "mastery" : false,
    "cost": "-",
    "type": "Augment",
    "text": ""
  });
  openAugmentsPanel(indexN, getCharData().powers[indexN].augments.length-1);
  repaintPowers();
}
//#region items panel
function openItemsPanel(indexN, indexP) {
  let itemN = getCharData().bags[indexN].items[indexP];
  $("#genIDitemname").text(itemN.name);
  $("#genIDitemshorttext").text(itemN.shorttext);
  $("#genIDitemweight").text(itemN.weight);
  $("#genIDitemcount").text(itemN.count);
  $("#newBagChoice").val(indexN);
  $("#genIDitemtype").val(itemN.type);
  $("#genIDitemdamage").text(itemN.damage);
  $("#genIDitemhit").text(itemN.hit);
  $("#genIDitemarmor").text(itemN.armor);
  $("#itemFeaturesContainer").html(paintItemFeatures(indexN, indexP));
  $("#genIDitemlongtext").val(itemN.longtext);
  $("#itemImageURL").text(itemN.imgurl);
  $("#itemImage").attr("src", itemN.imgurl);
  entryIndex = indexN;
  augmentIndex = indexP;
	let event = new Event('input', { bubbles: true });
	document.getElementById("genIDitemlongtext").dispatchEvent(event);
  showItemExtra();
  openPanelPage('inventoryPanelPage');
}
function showItemExtra() {
  typeSelect = $("#genIDitemtype").val();
  weaponextra = document.getElementById("weapon-extra");
  armorextra = document.getElementById("armor-extra");
  weaponextra.style.display = "none";
  armorextra.style.display = "none";
  if(typeSelect == "weapon") {
    weaponextra.style.display = "block";
  }
  else if(typeSelect == "armor") {
    armorextra.style.display = "block";
  }
}
function paintItemFeatures(n, p) {
  let item = getCharData().bags[n].items[p];
  let featureContent = ``;
  for(let i in item.features) {
    featureContent += `
      <div class="editable-num-div" onclick="editText(event, this)">
        <p id="genIDitemfeature${i}">${item.features[i]}</p>
      </div>
      <button class="transpbtn" onclick="deleteItemFeature(${n}, ${p}, ${i});"><div class="icon-trash"></div></button>
    `;
  }
  return featureContent;
}
function saveItem(indexN, indexP) {
  if(indexN == $("#newBagChoice").val()){
    getCharData().bags[indexN].items[indexP].name = $("#genIDitemname").text();
    getCharData().bags[indexN].items[indexP].shorttext = $("#genIDitemshorttext").text();
    getCharData().bags[indexN].items[indexP].weight = checkNumInput($("#genIDitemweight").text());
    getCharData().bags[indexN].items[indexP].count = $("#genIDitemcount").text();
    getCharData().bags[indexN].items[indexP].type = $("#genIDitemtype").val();
    getCharData().bags[indexN].items[indexP].damage = $("#genIDitemdamage").text();
    getCharData().bags[indexN].items[indexP].hit = $("#genIDitemhit").text();
    getCharData().bags[indexN].items[indexP].armor = $("#genIDitemarmor").text();
    getCharData().bags[indexN].items[indexP].longtext = $("#genIDitemlongtext").val();
    getCharData().bags[indexN].items[indexP].imgurl = $("#itemImageURL").text();
  }
  else{
    getCharData().bags[$("#newBagChoice").val()].items.push({
      "name": $("#genIDitemname").text(),
      "weight": checkNumInput($("#genIDitemweight").text()),
      "shorttext": $("#genIDitemshorttext").text(),
      "longtext": $("#genIDitemlongtext").val(),
      "count": $("#genIDitemcount").text(),
      "equipped": charData.bags[indexN].items[indexP].equipped,
      "type": $("#genIDitemtype").val(),
      "damage": $("#genIDitemdamage").text(),
      "hit": $("#genIDitemhit").text(),
      "armor": $("#genIDitemarmor").text(),
      "features": charData.bags[indexN].items[indexP].features,
      "imgurl": $("#itemImageURL").text()
    });
    getCharData().bags[indexN].items.splice(indexP, 1);
  }
  repaintInventory();
  repaintActions();
  $("#newBagChoice").val(indexN);
  openNav(2, true);
  document.getElementById('scrollItem'+indexN+'_'+indexP).scrollIntoView({
    behavior: 'auto',
    block: 'center',
    inline: 'center'
  });
}
function deleteItem(indexN, indexP) {
  getCharData().bags[indexN].items.splice(indexP, 1);
  repaintInventory();
  openNav(2, true);
}
function addNewItem(indexN){
  getCharData().bags[indexN].items.push({
    "name": "Neues Item",
    "weight": 0,
    "shorttext": "",
    "longtext": "",
    "count": 1,
    "equipped": false,
    "type": "item",
    "damage": 0,
    "hit": 0,
    "armor": 0,
    "features": [],
    "imgurl": "https://cdn2.iconfinder.com/data/icons/video-game-items-concepts/128/loot-box-512.png"
  });
  openItemsPanel(indexN, getCharData().bags[indexN].items.length-1);
  let state = charData.sort;
  charData.sort = false;
  repaintInventory();
  charData.sort = state;
  $("#newBagChoice").val(indexN);
  document.getElementById('scrollItem'+indexN+'_'+(getCharData().bags[indexN].items.length-1)).scrollIntoView({
    behavior: 'auto',
    block: 'center',
    inline: 'center'
  });
}
function deleteItemFeature(indexN, indexP, indexQ) {
  getCharData().bags[indexN].items[indexP].features.splice(indexQ, 1);
  
  openItemsPanel(indexN, indexP);
}
function addItemFeature(indexN, indexP) {
  getCharData().bags[indexN].items[indexP].features.push("Neue Eigenschaft");
  $("#itemFeaturesContainer").html(paintItemFeatures(indexN, indexP));
}
//#region bags
function addNewBag() {
  getCharData().bags.push({
    "name": "Tasche",
    "equipped": true,
    "open": true,
    "items": []
  });
  repaintInventory();
  //document.getElementById('scrollBag'+??).scrollIntoView();
}
function deleteBag(indexN) {
  getCharData().bags.splice(indexN, 1);
  repaintInventory();
}
//#region notes
function addNewNote() {
  getCharData().notes.push({
    "title": "Notiz",
    "open": true,
    "text": ""
  });
  repaintNotes();
}
function deleteNote(indexN) {
  getCharData().notes.splice(indexN, 1);
  repaintNotes();
}
//#region conditions
function addNewCondition(choice) {
  if(choice == 'custom') {
    getCharData().conditions.push({
      "name": "Neuer Statuseffekt",
      "text": ""
    });
  }
  else {
    getCharData().conditions.push({
      "name": getConditionsData().at(Number(choice)).name,
      "text": getConditionsData().at(Number(choice)).text
    });
  }
  repaintConditions();
}
function deleteCondition(indexN) {
  getCharData().conditions.splice(indexN, 1);
  repaintConditions();
}
//#region money
function sortMoney() { //big to small!
  getCharData().money.sort(function (a, b) {
    let x = a.conversion;
    let y = b.conversion;
    if (x < y) { return 1; }
    if (x > y) { return -1; }
    return 0;
  });
}
function addMoney() {
  getCharData().money.push({
    "name": "Geld",
    "amount": 0,
    "conversion": 1
  });
  repaintRulesSpecifics();
}
function deleteMoney(indexN) {
  if(getCharData().money.length > 1) {
    getCharData().money.splice(indexN, 1);
  }
  repaintRulesSpecifics();
}
//#region hitzones
function sortHitzones() {
  getCharData().hitzones.sort(function (a, b) {
    let x = a.value;
    let y = b.value;
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0;
  });
}
function addHitzone() {
  getCharData().hitzones.push({
    "name": "Zone",
    "value": "1-100",
  });
  repaintRulesSpecifics();
}
function deleteHitzone(indexN) {
  getCharData().hitzones.splice(indexN, 1);
  repaintRulesSpecifics();
}
