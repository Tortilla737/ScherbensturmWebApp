/*
fetch('./src/TalentList.json')
.then(resp => resp.json())
.then(data => {talentsData = JSON.parse(data)});

fetch('./src/ConditionsList.json')
.then(resp => resp.json())
.then(data => {conditionsData = JSON.parse(data)});
		
function getThumbnail(source){
		return $.getJSON("source").then(function(data){
				return data;
		});
}

//and in your call will listen for the custom deferred's done
getThumbnail('./src').then(function(returndata){
		//received data!
}); 

async function myDisplay() {
		let myPromise = new Promise(function(resolve, reject) {
				resolve("I love You !!");
		});
}
myDisplay(); 
*/

//#region json data
var charData = {};
var talentData;
var conditionsData;

function getCharData() {
	return charData;
}
function getTalentData() {
	return talentData;
}
function getConditionsData() {
	return conditionsData;
}

function initPage() {
	Promise.all([
		$.getJSON("./src/TalentList.json", function (json) {
			talentData = json;
		}),
		$.getJSON("./src/ConditionsList.json", function (json) {
			conditionsData = json;
		})
	]).then(value => {
		checkLocalData();
	});
}
$(document).ready(function() {
	initPage();
});
/* document.onload = initPage(); */

//#region local data
let saveblock = false;
let tempstates = [];
let saveIndex = 0;
let maxSaves = 10;
function saveLocalData() {
	if(saveblock) {
		tempstates.push(charData);
	}
	else {
		saveblock = true;
		tempstates.push(charData);
		myTimeout = setTimeout(function() {
			let lastdata = tempstates[tempstates.length-1];
			localStorage.setObject("LocalCharacter", lastdata);
			saveblock = false;
			tempstates = [];
			preserveState(lastdata);
		}, 2);
	}
}
function preserveState(dataL) {
	saveIndex = (saveIndex + 1)  % maxSaves;
	sessionStorage.setObject("saves"+saveIndex, dataL);
}
function undoLast() {
	if(saveIndex === 0) {saveIndex = maxSaves;}
	if(sessionStorage.getItem("saves"+(saveIndex - 1)) !== null) {
		if(saveIndex === maxSaves) {sessionStorage.removeItem("saves0");}
		else{sessionStorage.removeItem("saves"+saveIndex);}
		saveIndex = saveIndex - 1;
		charData = sessionStorage.getObject("saves"+saveIndex);
		saveblock = true;
		repaintAll();
		saveblock = false;
	}
}

async function checkLocalData() {
	if (localStorage.getItem("LocalCharacter") === null) {
		$.getJSON("./src/EmptyCharacter.json", function (json) {
			charData = json;
		}).then(value => {
			repaintAll();
		});
	} else {
		let dataPromise = new Promise(function (resolve) {
			resolve(charData = localStorage.getObject("LocalCharacter"));
		});
		dataPromise.then(value => {
			repaintAll();
		});
	}
}

function removeLocalData() {
	localStorage.removeItem("LocalCharacter");
	checkLocalData();
}

Storage.prototype.setObject = function (key, value) {
	this.setItem(key, JSON.stringify(value));
}
Storage.prototype.getObject = function (key) {
	var value = this.getItem(key);
	return value && JSON.parse(value);
}
//#region download charData
/*function is getting called in index.html -> savebtn*/
const saveTemplateAsFile = (filename, dataObjToWrite) => {
	const blob = new Blob([JSON.stringify(dataObjToWrite)], { type: "application/json" });
	const link = document.createElement("a");

	link.download = filename;
	link.href = window.URL.createObjectURL(blob);
	link.dataset.downloadurl = ["application/json", link.download, link.href].join(":");

	const evt = new MouseEvent("click", {
		view: window,
		bubbles: true,
		cancelable: true,
	});

	link.dispatchEvent(evt);
	link.remove()
};
//#region load charData
function loadFile() {
	var input, file, fr;

	if (typeof window.FileReader !== 'function') {
		alert("The file API isn't supported on this browser yet.");
		return;
	}

	input = document.getElementById('fileinput');
	if (!input) {
		alert("Um, couldn't find the fileinput element.");
	}
	else if (!input.files) {
		alert("This browser doesn't seem to support the `files` property of file inputs.");
	}
	else if (!input.files[0]) {
		alert("Please select a file before clicking 'Load'");
	}
	else {
		file = input.files[0];
		fr = new FileReader();
		fr.onload = receivedText;
		fr.readAsText(file);
	}

	function receivedText(e) {
		let lines = e.target.result;
		charData = JSON.parse(lines);
		repaintAll();
		openNav('1', true);
	}
}
//#region load image
function loadImage() {
	var preview = document.getElementById('CharTokenImg');
	var file = document.getElementById('TokenImageLink').files[0];
	var reader = new FileReader();

	reader.onloadend = function () {
		charData.characterToken = reader.result;
		repaintCustomizations();
	}

	if (file) {
		// Load image as a base64 encoded URI. atob(encoded_string) to decode
		reader.readAsDataURL(file);
	} else {
		preview.src = "";
	}
}

//#region repaint
function repaintAll() {
	activeTalents = [];
	repaintAttributes();
	repaintSkills();
	repaintPowers();
	repaintInventory();
	repaintActions();
	repaintTalents();
	for (let i in charData.talents) {
		setTalentFactor(charData.talents[i]);
	}
	repaintConditionChoices();
	repaintNotes();
	fillEditables();
	repaintConditions();
	repaintLevel();
	repaintCustomizations();
	repaintDescription();
	repaintRulesSpecifics();
	document.title = (charData.name + ' Character Sheet');
	// Open first Tab on startup
	openTabNr(0);
}

let attrTotal = { "str": 0, "con": 0, "acc": 0, "agi": 0, "per": 0, "wil": 0, "int": 0, "exp": 0 };
function getAttrTotal() {
	return attrTotal;
}
let activeTalents = [];
//#region repaint attributes
function repaintAttributes() {
	let ats = ["Str", "Con", "Acc", "Agi", "Per", "Wil", "Int", "Exp"];
	for (let i in ats) {
		$("#attrFolk" + ats[i]).html(charData.attrFolk[ats[i].toLowerCase()]);
		$("#attrPotential" + ats[i]).html(charData.attrPotential[ats[i].toLowerCase()]);
		$("#attrTraining" + ats[i]).html(charData.attrTraining[ats[i].toLowerCase()]);
		$("#attrMod" + ats[i]).html(charData.attrMod[ats[i].toLowerCase()]);
		$("#attrRank" + ats[i]).html(charData.attrRank[ats[i].toLowerCase()]);
		$("#attrNote" + ats[i]).html(charData.attrNote[ats[i].toLowerCase()]);

		let training = 0;
		if (charData.attrTraining[ats[i].toLowerCase()] > (charData.attrRank[ats[i].toLowerCase()] * 10 + attrMaxTalent)) {
			training = charData.attrRank[ats[i].toLowerCase()] * 10;
		}
		else {
			training = charData.attrTraining[ats[i].toLowerCase()];
		}
		attrTotal[ats[i].toLowerCase()] =
			Number(charData.attrFolk[ats[i].toLowerCase()]) +
			Number(charData.attrPotential[ats[i].toLowerCase()]) +
			Number(training) +
			Number(charData.attrMod[ats[i].toLowerCase()]);

		$("#attr" + ats[i] + "Total").html(attrTotal[ats[i].toLowerCase()]);
	};
	repaintSecondaries();
	repaintSkills();
	repaintLevel();
}
//#region repaint secondaries
function repaintSecondaries() {
	$("#ressourceHPcurrent").html(charData.HPcurrent);
	$("#HPtotal").html(Number(charData.HPmaxMod) + (4 * attrTotal.con) + hpTalent);
	$("#ressourceMHcurrent").html(charData.MHcurrent);
	$("#MHtotal").html(Number(charData.MHmaxMod) + (4 * attrTotal.wil) + mhTalent);
	$("#ressourceEPcurrent").html(charData.EPcurrent);
	$("#EPtotal").html(Number(charData.EPmaxMod) + attrTotal.con + epTalent);
	$("#ressourceFPcurrent").html(charData.FPcurrent);
	$("#FPtotal").html(Number(charData.FPmaxMod) + attrTotal.wil + fpTalent);
	$("#Initiative").html(Number(charData.initiativeMod) + attrTotal.per + iniTalent);
	$("#WoundCap").html(Number(charData.woundCapMod) + attrTotal.con + woundTalent);
	$("#TraumaCap").html(Number(charData.traumaCapMod) + attrTotal.wil + traumaTalent);
	$("#tiredExhaustion").html(charData.exhaustion);
	$("#tiredFatigue").html(charData.fatigue);
	$("#Movement").html(Number(charData.sizeClass) + Number(charData.movementMod) + Number(moveTalent.toFixed(1)));
	let ats = ["str", "con", "acc", "agi", "per", "wil", "int", "exp"];
	for (let i = 0; i < 8; i++) {
		$("#mbID" + ats[i]).html(charData.magicBonusMod[ats[i]]);
	}
	saveLocalData();
}
//#region repaint skills
function repaintSkills() {
	if (charData.sort) {
		charData.skills.sort(function (a, b) {
			let x = a.name.toLowerCase();
			let y = b.name.toLowerCase();
			if (x < y) { return -1; }
			if (x > y) { return 1; }
			return 0;
		});
	}

	let allSkills = ``;
	for (let i in charData.skills) {
		let asterisk = () => { if (charData.skills[i].mod > 0) { return "*"; } else { return ""; } };
		allSkills += `
			<div class="entry-wrapper skill-grid" onclick="openSkillPanel(${i})">
				<p>${charData.skills[i].name}</p>
				<p class="text-middle">+${Number(charData.skills[i].expertise) + Number(charData.skills[i].mod)}${asterisk()/*maybe not? xxx*/}</p>
				<p class="text-middle">${charData.skills[i].rank}</p>
				<p class="text-middle small-text">${charData.skills[i].attributes}</p>
			</div>
			<div class="vertical-spacing"></div>
		`;
	}
	$("#skillListContainer").html(allSkills);
	repaintLevel();
}
//#region repaint talents
function repaintTalents() {
	let paintTalents = "";
	charData.talents.sort(function (a, b) {
		let x = a.name.toLowerCase();
		let y = b.name.toLowerCase();
		if (x < y) { return -1; }
		if (x > y) { return 1; }
		return 0;
	});

	activeTalents = talentData.filter(function (entry) {
		for (let i in charData.talents) {
			if (entry.name == charData.talents[i].name) {
				let rankBoxes = "";
				for (let tier in entry.ranks) {
					if (entry.ranks[tier] == 0) {
						rankBoxes += `<div>-</div>`;
					}
					else if (entry.ranks[tier] >= 1) {
						let mastery = "";
						if (entry.ranks[tier] >= 2) {
							mastery = '*';
						}
						rankBoxes += `
							<div style="display: flex; align-items: center;">
								<input type="checkbox" onclick="event.stopPropagation();" onchange="getCharData().talents[${i}].ranks[${tier}] = !getCharData().talents[${i}].ranks[${tier}]; setTalentFactor(getCharData().talents[${i}]); repaintLevel();" ${isChecked(getCharData().talents[i].ranks[tier])}></input>
								${mastery}
							</div>
						`;
					}
				}
				paintTalents += `
					<div class="entry-wrapper" onclick="openBeneath(this.firstElementChild)">
						<div class="talent-grid">
							<div>${charData.talents[i].name}</div>
							<div class="grid-5 talent-ranks-wrapper">${rankBoxes}</div>
							<div class="small-text">${entry.shorttext}</div>
						</div>
						<div class="info-beneath" onclick="event.stopPropagation()">
							<div class="horizontal-container">
								<p>Details:</p>
								<button onclick="openDeleteModal('deleteTalent(${i})')"><div class="icon-trash"></div></button>
							</div>
							<p class="breaking-text">${entry.longtext}</p>
						</div>
					</div>
					<div class="vertical-spacing"></div>
				`;
				return entry;
			}
		}
	});
	activeTalents.sort(function (a, b) {
		let x = a.name.toLowerCase();
		let y = b.name.toLowerCase();
		if (x < y) { return -1; }
		if (x > y) { return 1; }
		return 0;
	});
	$("#talentListContainer").html(paintTalents);
	repaintLevel();
	//repaintSecondaries();
}
//#region repaint powers
function repaintPowers() {
	if (charData.sort) {
		charData.powers.sort(function (a, b) {
			let x = a.name.toLowerCase();
			let y = b.name.toLowerCase();
			if (x < y) { return -1; }
			if (x > y) { return 1; }
			return 0;
		});
	}

	let allPowers = "";
	for (let i in charData.powers) {
		let powerN = charData.powers[i];
		allPowers += `
			<div class="power-entry" style="background-image: linear-gradient(110deg, #0000 65%, ${powerN.color});" onclick="openBeneath(this.firstElementChild)">
				<div>
					<div class="power-grid">
						<p class="power-name">${powerN.name}</p>
						<p class="power-skill">~ ${powerN.skill}</p>
						<button onclick="openPowersPanel(${i}); event.stopPropagation();"><div class="icon-edit"></div></button>
					</div>
					<div class="power-sub-grid gradient-line-top">
						<input type="checkbox" onclick="event.stopPropagation()" onchange="getCharData().powers[${i}].equipped = !getCharData().powers[${i}].equipped; repaintActions();" ${isChecked(powerN.equipped)}></input>
						<p>${calcTextInput(powerN.cost)}</p>
						<p>${powerN.type}</p>
						<p>${powerN.time}</p>
						<p>T${powerN.rank}</p>
						<p>CD: ${powerN.cooldown}</p>
					</div>
				</div>
				<div class="info-beneath" onclick="event.stopPropagation()">
					<p class="dim-text">Beschreibung:</p>
					<p class="breaking-text">${calcTextInput(powerN.text)}</p>
				</div>
			</div>
			`
		for (let j in powerN.augments) {
			let augmentN = powerN.augments[j];
			allPowers += `
				<div class="augment-entry" onclick="openBeneath(this.firstElementChild)">
					<div class="augment-grid gradient-line-top">
						<p class="power-name">${augmentN.name}</p>
						<p>${calcTextInput(augmentN.cost)}</p>
						<p>- ${augmentN.type}</p>
						<p>T${augmentN.rank}</p>
						<button onclick="openAugmentsPanel(${i}, ${j}); event.stopPropagation();"><div class="icon-edit"></div></button>
					</div>
					<div class="info-beneath" onclick="event.stopPropagation()">
						<p class="dim-text">Beschreibung:</p>
						<p class="breaking-text">${calcTextInput(augmentN.text)}</p>
					</div>
				</div>
				`;
		}
		allPowers += `<div class="vertical-spacing"></div>`;
	}
	$("#powerListContainer").html(allPowers);
	repaintActions();
	repaintLevel();
}
//#region repaint inventory
function repaintInventory() {
	let totalWeight = 0;
	let allBags = "";
	let bagChoices = "";
	if (charData.sort) {
		charData.bags.sort(function (a, b) {
			let x = a.name.toLowerCase();
			let y = b.name.toLowerCase();
			if (x < y) { return -1; }
			if (x > y) { return 1; }
			return 0;
		});
	}

	for (let i in charData.bags) {
		let bagWeight = 0;
		let allItems = "";
		if (charData.sort) {
			charData.bags[i].items.sort(function (a, b) {
				let x = a.name.toLowerCase();
				let y = b.name.toLowerCase();
				if (x < y) { return -1; }
				if (x > y) { return 1; }
				return 0;
			});
		}
		//Items first for weight calculations
		for (let j in charData.bags[i].items) {
			let itemN = charData.bags[i].items[j];
			bagWeight += itemN.weight * itemN.count;
			allItems += `
				<div class="entry-wrapper item-grid" onclick="openItemsPanel(${i}, ${j});">
					<p>${itemN.name}</p>
					<p class="text-middle small-text">${itemN.count}</p>
					<p class="text-middle small-text">${itemN.weight} kg</p>
					<p class="small-text">${calcTextInput(itemN.shorttext)}</p>
				</div>
				<div class="vertical-spacing"></div>
		`;
		}
		allBags += `
		<div class="bag-wrapper">
			<div class="bag-grid">
				<button id="closeBagbtn${i}" onclick="closeContentBeneath(this.parentNode); getCharData().bags[${i}].open = !getCharData().bags[${i}].open;"><div class="transition-div"><p>&#x2BC6;</p></div></button>
				<div class="editable-num-div" onclick="editText(event, this)"><p id="bagID${i}">${charData.bags[i].name}</p></div>
				<input type="checkbox" onclick="event.stopPropagation()" onchange="getCharData().bags[${i}].equipped = !getCharData().bags[${i}].equipped; repaintInventory();" ${isChecked(charData.bags[i].equipped)}></input>
				<p class="text-middle">${bagWeight.toFixed(1)} kg</p>
				<button onclick="openDeleteModal('deleteBag(${i})');"><div class="icon-trash small-text margin-center"></div></button>
			</div>
			<div class="content-beneath">
				<div class="first-table-row item-grid gradient-line-top">
					<p>Item</p>
					<p>Anzahl</p>
					<p>Gewicht</p>
					<p>Kurzbeschreibung</p>
				</div>
				<div class="vertical-spacing"></div>
				${allItems}
				<button class="add-entry-btn" onclick="addNewItem(${i})">+</button>
				<div class="vertical-spacing"></div>
			</div>
		</div>
		<div class="vertical-spacing"></div>
		`;
		bagChoices += `<option value="${i}">${charData.bags[i].name}</option>`;
		if (charData.bags[i].equipped) totalWeight += bagWeight;
	}
	$("#totalWeight").html(Number(totalWeight.toFixed(1)) + " kg");
	$("#inventoryContainer").html(allBags);
	$("#newBagChoice").html(bagChoices);
	for (let i in charData.bags) {
		if (!charData.bags[i].open) {
			closeContentBeneath(document.getElementById("closeBagbtn" + i).parentNode);
		}
	}
	repaintGear();
}
//#region repaint gear
function repaintGear() {
	let allWeapons = "";
	let allArmor = "";
	let totalArmor = 0;
	for (let i in charData.bags) {
		for (let j in charData.bags[i].items) {
			itemN = charData.bags[i].items[j];
			if (itemN.type == 'weapon') {
				allWeapons += `
					<div class="entry-wrapper" onclick="openItemsPanel(${i}, ${j});">
						<div class="horizontal-container stretchy">
								<p class="power-name">${itemN.name}</p>
								<p class="italic-text">${calcTextInput(itemN.damage)}</p>
						</div>
						<div class="item-feature-flex gradient-line-top small-text">
							<div><input type="checkbox" onchange="getCharData().bags[${i}].items[${j}].equipped = !getCharData().bags[${i}].items[${j}].equipped; repaintActions();" onclick="event.stopPropagation()" ${isChecked(itemN.equipped)}></input></div>
				`;
				for (let k in itemN.features) {
					allWeapons += `
						<p>${calcTextInput(itemN.features[k])}</p>
					`;
				}
				allWeapons += `
						</div>
						<div class="small-text gradient-line-top">
							<p class="breaking-text">${calcTextInput(itemN.longtext)}</p>
						</div>
					</div>
					<div class="vertical-spacing"></div>
				`;
			}
			else if (itemN.type == 'armor') {
				allArmor += `
					<div class="entry-wrapper" onclick="openItemsPanel(${i}, ${j});">
						<div class="horizontal-container stretchy">
							<p class="power-name">${itemN.name}</p>
							<p class="italic-text">Rüstung: ${itemN.armor}</p>
						</div>
						<div class="item-feature-flex gradient-line-top small-text">
							<div><input type="checkbox" onchange="getCharData().bags[${i}].items[${j}].equipped = !getCharData().bags[${i}].items[${j}].equipped; repaintGear();" onclick="event.stopPropagation()" ${isChecked(itemN.equipped)}></input></div>
				`;
				for (let k in itemN.features) {
					allArmor += `
									<p>${calcTextInput(itemN.features[k])}</p>
					`;
				}
				allArmor += `
						</div>
						<div class="small-text gradient-line-top">
							<p class="breaking-text">${calcTextInput(itemN.longtext)}</p>
						</div>
					</div>
					<div class="vertical-spacing"></div>
				`;
				if (itemN.equipped) totalArmor += Number(itemN.armor);
			}
		}
	}
	$("#WeaponGearContainer").html(allWeapons);
	$("#ArmorGearContainer").html(allArmor);
	$("#totalArmor").html(totalArmor + armorTalent);
	repaintActions();
	saveLocalData();
}
//#region repaint actions
function repaintActions() {
	let weaponActions = "";
	let powerActions = "";
	for (let i in charData.bags) {
		for (let j in charData.bags[i].items) {
			itemN = charData.bags[i].items[j];
			if (itemN.equipped && itemN.type == "weapon") {
				weaponActions += `
					<div class="action-grid" onclick="openItemsPanel(${i}, ${j});">
						<p>${itemN.name}</p>
						<p>${calcTextInput(itemN.hit)}</p>
						<p>${calcTextInput(itemN.damage)}</p>
					</div>
					<div class="vertical-spacing"></div>
		`;
			}
		}
	}
	for (let i in charData.powers) {
		powerN = charData.powers[i];
		if (powerN.equipped) {
			powerActions += `
				<div class="action-grid action-power-grid" onclick="openPowersPanel(${i});">
					<p>${powerN.name}</p>
					<p>${calcTextInput(powerN.cost)}</p>
					<p>${calcTextInput(powerN.hit)}</p>
					<p>${calcTextInput(powerN.damage)}</p>
				</div>
				<div class="vertical-spacing"></div>
			`;
		}
	}
	$("#weaponActionContainer").html(weaponActions);
	$("#powerActionContainer").html(powerActions);
	saveLocalData();
}
//#region repaint description
function repaintDescription() {
	$("#descIDfullname").html(charData.fullname);
	$("#descIDheritage").html(charData.heritage);
	$("#descIDfolkshards").html(charData.folkshards);
	$("#descIDgender").html(charData.gender);
	$("#descIDage").html(charData.age);
	$("#descIDheight").html(charData.height);
	$("#descIDsizeClass").html(charData.sizeClass);
	$("#descIDweight").html(charData.weight);
	$("#descIDfaith").html(charData.faith);
	$("#descTxtpersonality").html(charData.personality);
	$("#descTxtlook").html(charData.look);
	$("#descTxtabilities").html(charData.abilities);
	$("#descTxtbackground").html(charData.background);
	let event = new Event('input', { bubbles: true });
	document.getElementById("descTxtpersonality").dispatchEvent(event);
	document.getElementById("descTxtlook").dispatchEvent(event);
	document.getElementById("descTxtabilities").dispatchEvent(event);
	document.getElementById("descTxtbackground").dispatchEvent(event);
	saveLocalData();
}
//#region repaint notes
function repaintNotes() {
	let allNotes = "";
	for (let i in charData.notes) {
		allNotes += `
		<div class="note-wrapper">
			<div class="horizontal-container">
				<button id="closeNotebtn${i}" onclick="closeContentBeneath(this.parentNode); getCharData().notes[${i}].open = !getCharData().notes[${i}].open;"><div class="transition-div"><p>&#x2BC6;</p></div></button>
				<div class="editable-num-div" onclick="editText(event, this)"><p id="noteID${i}">${charData.notes[i].title}</p></div>
				<button onclick="openDeleteModal('deleteNote(${i})');"><div class="icon-trash small-text"></div></button>
			</div>
			<div class="growing-text-wrap open-beneath">
				<textarea id="noteTextarea${i}" onInput="this.parentNode.dataset.replicatedValue = this.value" onblur="getCharData().notes[${i}].text = this.value; saveLocalData();">${charData.notes[i].text}</textarea>
			</div>
		</div>
		<div class="vertical-spacing"></div>
		`;
	}
	$("#NotesContainer").html(allNotes);
	let event = new Event('input', { bubbles: true });
	for (let i in charData.notes) {
		if (!charData.notes[i].open) {
			closeContentBeneath(document.getElementById("closeNotebtn" + i).parentNode);
		}
		document.getElementById("noteTextarea" + i).dispatchEvent(event);
	}
	saveLocalData();
}
//#region repaint customization
function repaintCustomizations() {
	$("#darkmodeContainer").html(`<input type="checkbox" onchange="getCharData().darkmode = !getCharData().darkmode; repaintCustomizations();" ${isChecked(charData.darkmode)}></input>`);

	$("#sortContainer").html(`<input type="checkbox" onchange="getCharData().sort = !getCharData().sort; repaintSkills(); repaintPowers(); repaintInventory();" ${isChecked(charData.sort)}></input>`);

	document.documentElement.style.setProperty('--accent-color', charData.customColor);

	if (charData.darkmode) {
		document.documentElement.className = "darkmode";
	}
	else {
		document.documentElement.className = "lightmode";
	}

	$("#customColor").html(charData.customColor);
	document.getElementById("BackgroundImage").style.background = "url('" + charData.customImageLink + "') center/cover";
	$("#customImageLink").html(charData.customImageLink);
	document.getElementById('CharTokenImg').src = charData.characterToken;
	saveLocalData();
}
//#region repaint level
function repaintLevel() {
	let currentSPscore = 0;
	let currentPPscore = 0;
	let currentMSPscore = 0;
	for (let i in charData.skills) {
		currentSPscore += Number(charData.skills[i].basecost);
		for (let rc = charData.skills[i].rank; rc > 1; rc--) {
			currentSPscore += Number(rc);
		}
		currentPPscore += Number(Math.floor(charData.skills[i].expertise / 2));
		if (charData.skills[i].rank >= 4) { currentMSPscore++; }
	}
	for (let attr in charData.attrRank) {
		for (let rc = charData.attrRank[attr]; rc > 1; rc--) {
			currentSPscore += Number(rc);
		}
		currentPPscore += Number(charData.attrTraining[attr]);
		if (charData.attrRank[attr] >= 4) { currentMSPscore++; }
	}
	for (let i in charData.powers) {
		currentSPscore += Number(charData.powers[i].rank);
		if (charData.powers[i].mastery) { currentMSPscore++; }

		for (let j in charData.powers[i].augments) {
			currentSPscore += Number(charData.powers[i].augments[j].rank);
			if (charData.powers[i].augments[j].mastery) { currentMSPscore++; }
		}
	}
	for (let i in activeTalents) {
		for (let tier = 0; tier < 5; tier++) {
			if (charData.talents[i].ranks[tier]) {
				currentSPscore += Number(tier + 1);
				if (activeTalents[i].ranks[tier] >= 2) {
					currentMSPscore++;
				}
			}
		}
	}

	document.getElementById("xpBar").style.width = charData.xp + "%";

	let spTotal = (charData.level * 5) + Number(charData.spMod);
	let ppTotal = (charData.level * 10) + Number(charData.ppMod);
	let mspTotal = Math.floor(charData.level / 10) + Number(charData.mspMod) + Number(mspTalent);

	$("#xpLabel").html(charData.xp);
	$("#CharLevel").html(charData.level);
	$("#levelDisplaybtn").html("Lvl: " + charData.level);
	$("#SPcurrent").html(currentSPscore);
	$("#PPcurrent").html(currentPPscore);
	$("#MSPcurrent").html(currentMSPscore);
	$("#SPtotal").html(spTotal);
	$("#PPtotal").html(ppTotal);
	$("#MSPtotal").html(mspTotal);
	$("#CharLevelSPmod").html(charData.spMod);
	$("#CharLevelPPmod").html(charData.ppMod);
	$("#CharLevelMSPmod").html(charData.mspMod);
	saveLocalData();

	if (currentSPscore > spTotal || currentPPscore > ppTotal || currentMSPscore > mspTotal) {
		$("#levelDisplaybtn").toggleClass("red-text", true);
	}
	else {
		$("#levelDisplaybtn").toggleClass("red-text", false);
	}
}
//#region repaint conditions
function repaintConditions() {
	let allConditions = "";
	for (let i in charData.conditions) {
		allConditions += `
		<div class="status-wrapper">
			<div class="status-grid">
				<button onclick="openBeneath(this.parentNode); this.firstElementChild.classList.toggle('open-content-rotate');"><div class="transition-div"><p>&#x2BC8;</p></div></button>
				<div class="editable-num-div status-name" onclick="editText(event, this)"><p id="condiIDname${i}">${charData.conditions[i].name}</p></div>
				<button onclick="openDeleteModal('deleteCondition(${i})'); event.stopPropagation();"><div class="icon-trash smaller-text margin-center"></div></button>
			</div>
			<div class="collapsed-beneath">
				<textarea id="condiIDtext${i}" onblur="${charData.conditions[i].text} = this.value; saveLocalData();" placeholder="Beschreibe den Statuseffekt.">${charData.conditions[i].text}</textarea>
			</div>
		</div>
		<div class="vertical-spacing"></div>
		`;
	}
	$("#conditionsContainer").html(allConditions);
	saveLocalData();
}
function repaintConditionChoices() {
	let allChoices = `
		<option value='-'>Effekt hinzufügen</option>
		<option value='custom'>Eigener Effekt</option>
	`;
	for (let i in conditionsData) {
		allChoices += `
			<option value='${i}'>${conditionsData[i].name}</option>
		`;
	}
	$("#conditionChoice").html(allChoices);
}
//#region repaint editables
function fillEditables() {
	//powersNote is in repaintPowers
	//notes are in repaintNotes
	//SP/PP are in repaintLevel
	//custom stuff in repaintCustoms
	//Magic Bonus in repaintSecondaries
	$("#CharName").html(charData.name);
	$("#CharNameSub").html(charData.subtitle);
	$("#modIDHPmaxMod").html(charData.HPmaxMod);
	$("#modIDMHmaxMod").html(charData.MHmaxMod);
	$("#modIDEPmaxMod").html(charData.EPmaxMod);
	$("#modIDFPmaxMod").html(charData.FPmaxMod);
	$("#modIDwoundCapMod").html(charData.woundCapMod);
	$("#modIDtraumaCapMod").html(charData.traumaCapMod);
	$("#modIDinitiativeMod").html(charData.initiativeMod);
	$("#modIDmovementMod").html(charData.movementMod);
	$("#shortNote").html(charData.shortNote);
	$("#rulesChoice").val(charData.rulesset);
	$("#secondaryNote").html(charData.secondaryNote);
	$("#maxSaves").html(charData.maxSaves);
	maxSaves = charData.maxSaves;
	let event = new Event('input', { bubbles: true });
	document.getElementById("secondaryNote").dispatchEvent(event);
	$("#PowersTextArea").html(charData.powersNote);
	document.getElementById("PowersTextArea").dispatchEvent(event);
}
//#region repaint rules
function repaintRulesSpecifics() {
	var contentOF, contentED;
	let moneys = ``, conversions = ``, hitzones = ``;
	contentOF = document.getElementsByClassName("rulesOF");
	contentED = document.getElementsByClassName("rulesED");

	if(charData.rulesset === "of") {
		for (let i = 0; i < contentOF.length; i++) {
			contentOF[i].style.display = "block";
			contentED[i].style.display = "none";
		}

		//Money
		for (let i in charData.money) {
			let thisMoney = charData.money[i];
			moneys += `
				<div class="editable-num-div" onclick="editText(event, this)">
					<p id="moneyN${i}">${thisMoney.name}</p>
				</div>
				<div class="editable-num-div" onclick="editText(event, this)">
					<p id="moneyA${i}">${thisMoney.amount}</p>
				</div>
				<button onclick="openDeleteModal('deleteMoney(${i})')">
					<div class="icon-trash small-text margin-center"></div>
				</button>
			`;
		}
		moneys += `<button onclick="addMoney()" class="grid-span-3 in-panel-btn">+ Währung</button>`;
		conversions += `<p class="first-table-row">Währung</p><p class="first-table-row">Faktor zur Primärwährung</p>`;
		for (let i in charData.money) {
			let thisMoney = charData.money[i];
			conversions += `
				<p>${thisMoney.name}</p>
				<div class="editable-num-div" onclick="editText(event, this)">
					<p id="moneyC${i}">${thisMoney.conversion}</p>
				</div>
			`;
		}
		//Hitzones
		for (let i in charData.hitzones) {
			let thisZone = charData.hitzones[i];
			hitzones += `
				<div class="editable-num-div" onclick="editText(event, this)">
					<p id="hitzoneN${i}">${thisZone.name}</p>
				</div>
				<div class="editable-num-div" onclick="editText(event, this)">
					<p id="hitzoneV${i}">${thisZone.value}</p>
				</div>
				<button onclick="openDeleteModal('deleteHitzone(${i})')">
					<div class="icon-trash small-text margin-center"></div>
				</button>
			`;
		}
		hitzones += `<button onclick="addHitzone()" class="grid-span-3 in-panel-btn">+ Trefferzone</button>`;
		//Talents if(talentPanel.diplay != none) openPanelPage(talentPanelPage);
		//Homebrew Link einfügen
	}
	else if(charData.rulesset === "ed") {
		for (let i = 0; i < contentOF.length; i++) {
			contentOF[i].style.display = "none";
			contentED[i].style.display = "block";
		}
		//Money
		for (let i = 1; charData.money.length < 4; i++) {
			charData.money.push({
				"name": "Geld " + i,
				"amount": 0,
				"conversion": 1
			});
		}
		moneys = `
			<p>Mehrwertscheine:</p>
			<div class="editable-num-div text-middle" onclick="editText(event, this)">
				<p id="moneyA0">${charData.money[0].amount}</p>
			</div>
			<div class="icon-money-m"></div>
			<p>Wertscheine:</p>
			<div class="editable-num-div text-middle" onclick="editText(event, this)">
				<p id="moneyA1">${charData.money[1].amount}</p>
			</div>
			<div class="icon-money-w"></div>
			<p>Gulden:</p>
			<div class="editable-num-div text-middle" onclick="editText(event, this)">
				<p id="moneyA2">${charData.money[2].amount}</p>
			</div>
			<div class="icon-money-g"></div>
			<p>Silberlinge:</p>
			<div class="editable-num-div text-middle" onclick="editText(event, this)">
				<p id="moneyA3">${charData.money[3].amount}</p>
			</div>
			<div class="icon-money-s"></div>
		`;
	}
	
	
	calculateMoney();
	$("#moneyGridContent").html(moneys);
	$("#moneyConversionContent").html(conversions);
	$("#hitzonesGridContent").html(hitzones);
}
function calculateMoney() {
	let total = 0;
	if(charData.rulesset === "of") {
		for (let i in charData.money) {
			let thisMoney = charData.money[i];
			total += Math.floor(thisMoney.amount * thisMoney.conversion);
		}
	}
	else if(charData.rulesset === "ed") {
		let facts = [144, 12, 1, (1/12)]; //ED specific
		for (let i = 0; i < 4; i++) {
			let thisMoney = charData.money[i];
			total += Math.floor(thisMoney.amount * facts[i]);
		}
	}
	$("#moneyTotal").text(total);
}
