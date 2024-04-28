let hpTalent = 0, mhTalent = 0, epTalent = 0, fpTalent = 0, woundTalent = 0, traumaTalent = 0, iniTalent = 0, moveTalent = 0, moveReductionTalent = 0, armorTalent = 0, attrMaxTalent = 0, mspTalent = 0;
let mbTalent = {"str": 0, "con": 0, "acc": 0, "agi": 0, "per": 0, "wil": 0, "int": 0, "exp": 0, "all": 0};

/*
Bereitschaft - Initiative - iniTalent
Bewegen in Rüstung - BEW Abzug - moveReductionTalent
Brillianz - ZBon IN - mbTalent.int
Dicke Haut - Rüstung - armorTalent
Ehrgeitz - Msp - mspTalent
Geschärfter Fokus - ZBon PR - mbTalent.acc
Hervorrufung - ZBon WK - mbTalent.wil
Integrität - mLP - mhTalent
Kraftreserve - AP - epTalent
Lebensfunke - ZBon KO - mbTalent.con
Machtladung - FP - fpTalent
Machtvolle Ausstrahlung - ZBon AU - mbTalent.exp
Magiestrom - ZBon GW - mbTalent.agi
Mobilität (ED) - BEW - moveTalent
Optimierung - Attribute Max - attrMaxTalent
Robustheit - VwS - woundTalent
Rohe Kraft - ZBon ST - mbTalent.str
Starke Nerven - TrS - traumaTalent
Tiefes Bewusstsein - ZBon WA - mbTalent.per
Vitalität - LP - hpTalent
Zaubermacht - ZBon alle - mbTalent.all
*/

function setTalentFactor(thisTalent) {
    if("Bereitschaft" == thisTalent.name) {
        iniTalent = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                iniTalent += 10;
            }
        }
        repaintSecondaries();
    }
    else if("Bewegen in Rüstung" == thisTalent.name) {
        moveReductionTalent = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                moveReductionTalent += 10;
            }
        }
        //repaintAttributes();
    }
    else if("Bewegen in Rüstung (ED)" == thisTalent.name) {
        moveReductionTalent = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                moveReductionTalent += 10;
            }
        }
        //repaintAttributes();
    }
    else if("Brillianz" == thisTalent.name) {
        mbTalent.int = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                mbTalent.int += 10;
            }
        }
        $("#mbTalentInt").html(mbTalent.int);
        repaintPowers();
    }
    else if("Dicke Haut" == thisTalent.name) {
        armorTalent = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                armorTalent += 10;
            }
        }
        repaintGear();
    }
    else if("Ehrgeiz" == thisTalent.name) {
        mspTalent = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                mspTalent += 1;
            }
        }
        repaintLevel();
    }
    else if("Geschärfter Fokus" == thisTalent.name) {
        mbTalent.acc = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                mbTalent.acc += 10;
            }
        }
        $("#mbTalentAcc").html(mbTalent.acc);
        repaintPowers();
    }
    else if("Hervorrufung" == thisTalent.name) {
        mbTalent.wil = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                mbTalent.wil += 10;
            }
        }
        $("#mbTalentWil").html(mbTalent.wil);
        repaintPowers();
    }
    else if("Integrität" == thisTalent.name) {
        mhTalent = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                if(j <= 1){
                    mhTalent += 40;
                }
                else {
                    mhTalent += 60;
                }
            }
        }
        repaintSecondaries();
    }
    else if("Kraftreserve" == thisTalent.name) {
        epTalent = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                epTalent += 10;
            }
        }
        repaintSecondaries();
    }
    else if("Lebensfunke" == thisTalent.name) {
        mbTalent.con = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                mbTalent.con += 10;
            }
        }
        $("#mbTalentCon").html(mbTalent.con);
        repaintPowers();
    }
    else if("Machtladung" == thisTalent.name) {
        fpTalent = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                fpTalent += 10;
            }
        }
        repaintSecondaries();
    }
    else if("Machtvolle Ausstrahlung" == thisTalent.name) {
        mbTalent.exp = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                mbTalent.exp += 10;
            }
        }
        $("#mbTalentExp").html(mbTalent.exp);
        repaintPowers();
    }
    else if("Magiestrom" == thisTalent.name) {
        mbTalent.agi = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                mbTalent.agi += 10;
            }
        }
        $("#mbTalentAgi").html(mbTalent.agi);
        repaintPowers();
    }
    else if("Mobilität" == thisTalent.name) {
        moveTalent = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                moveTalent += (0.2 * getCharData().sizeClass);
            }
        }
        repaintSecondaries();
    }
    else if("Mobilität (ED)" == thisTalent.name) {
        moveTalent = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                moveTalent += 1;
            }
        }
        repaintSecondaries();
    }
    else if("Optimierung" == thisTalent.name) {
        attrMaxTalent = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                attrMaxTalent += 5;
            }
        }
        repaintAttributes();
    }
    else if("Robustheit" == thisTalent.name) {
        woundTalent = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                woundTalent += 10;
            }
        }
        repaintSecondaries();
    }
    else if("Rohe Kraft" == thisTalent.name) {
        mbTalent.str = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                mbTalent.str += 10;
            }
        }
        $("#mbTalentStr").html(mbTalent.str);
        repaintPowers();
    }
    else if("Starke Nerven" == thisTalent.name) {
        traumaTalent = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                traumaTalent += 10;
            }
        }
        repaintSecondaries();
    }
    else if("Tiefes Bewusstsein" == thisTalent.name) {
        mbTalent.per = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                mbTalent.per += 10;
            }
        }
        $("#mbTalentPer").html(mbTalent.per);
        repaintPowers();
    }
    else if("Vitalität" == thisTalent.name) {
        hpTalent = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                if(j <= 1){
                    hpTalent += 40;
                }
                else {
                    hpTalent += 60;
                }
            }
        }
        repaintSecondaries();
    }
    else if("Zaubermacht" == thisTalent.name) {
        mbTalent.all = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                mbTalent.all += 10;
            }
        }
        repaintPowers();
    }
    else if("Zaubermacht (ED)" == thisTalent.name) {
        mbTalent.all = 0;
        for(let j = 0; j<5; j++) {
            if(thisTalent.ranks[j]) {
                mbTalent.all += 10;
            }
        }
        repaintPowers();
    }
}
/* 
function gethpTalent() {return hpTalent;}
function getmhTalent() {return mhTalent;}
function getepTalent() {return epTalent;}
function getfpTalent() {return fpTalent;}
function getwoundTalent() {return woundTalent;}
function gettraumaTalent() {return traumaTalent;}
function getiniTalent() {return iniTalent;}
function getmoveTalent() {return moveTalent;}
function getmoveReductionTalent() {return moveReductionTalent;}
function getarmorTalent() {return armorTalent;}
function getattrMaxTalent() {return attrMaxTalent;}
function getmspTalent() {return mspTalent;}
function getmbTalentstr() {return mbTalent.str;}
function getmbTalentcon() {return mbTalent.con;}
function getmbTalentacc() {return mbTalent.acc;}
function getmbTalentagi() {return mbTalent.agi;}
function getmbTalentper() {return mbTalent.per;}
function getmbTalentwil() {return mbTalent.wil;}
function getmbTalentint() {return mbTalent.int;}
function getmbTalentexp() {return mbTalent.exp;}
function getmbTalentall() {return mbTalent.all;} 
*/