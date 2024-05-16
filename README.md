![Line](https://i.imgur.com/zQIoFD7.png)

## Scherbensturm darüber hinaus

Der Scherbensturm Charakterbogen als Webapp.

**[Zur Anwendung](https://tortilla737.github.io/ScherbensturmWebApp/).**

### Datei Speichern
- Die App speichert den aktuellen Bogen automatisch im Browser-Cache.
- Manuelles Speichern über das Menü lädt den Bogen als Datei herunter.
  - Auf diese Art kann man mehrere Charakterbögen speichern und teilen (z.b. über Dropbox).

### Einträge verändern
- Bei Zahlenfeldern könnt ihr entweder direkt die Zahl eingeben, oder mit - oder + Werte abziehen bzw. addieren.
- Wenn ein Eintrag erstellt oder verändert wurde, nicht vergessen beim Eintrag auf **Speichern** zu drücken!
- Bereiche, die durch obskure Regeln oder unvollständige Funktionen nicht vorhanden sind, können durch manuelle Modifikatoren gelöst werden.
  - z.B. für SP, PP, Bewegung, LP-Max. etc...
  - Nutze die Notizboxen, um die Quellen der Modifikatoren festzuhalten.

### Markdown
- Die Beschreibungstexte unterstützen Markdown Formatierung.
  - Die Textboxen von *Kräften*, *Talenten*, *Waffen*, *Rüstungen* und der *Charakterbeschreibung* können formatiert werden.
- Die Markdown Basics findest du [hier](https://www.markdownguide.org/cheat-sheet/).
  - Und weitere Infos zu [Dos and Don'ts](https://www.markdownguide.org/basic-syntax/).

### Bilder
- Hintergrundbild und Itembilder werden direkt als Link eingefügt.
  - Dafür bei einem beliebigen Online-Bild mit Rechtsklick -> **Bildadresse kopieren** und anschließend in das Textfeld einfügen.
- Der Charaktertoken kann direkt über das Token Bild als Datei hochgeladen werden. 
- Bilder im Markdown Text können weiter formatiert werden.
  - **!\[titel\](bild-URL.jpg)** fügt ein Bild im Text ein.
  - **!\[titel\](bild-URL.jpg =100x\*)** In diesem Beispiel ist die Breite auf 100px festgelegt und die Höhe wird automatisch proportional gesetzt.
  - **!\[titel alt >\](bild-URL.jpg)** macht das Bild rechtsbündig. ("alt <" für linksbündig, "alt ><" für mittig)

### Automatische Berechnung von Werten
- Die meisten Werte werden automatisch berechnet, wie z.B. ausgegebene SP und PP, oder Attribute.
- Trefferwerte, Schadenswerte und Beschreibungen können mit manuellen Berechnungen gefüttert werden.
- Text, der von zwei geschwungenen Klammern eingefasst ist, wird berechnet.
  - z.B.: {{10-6}} zeigt: 4.
- Text, der von zwei eckigen Klammern eingefasst ist, ruft den zugehörigen Wert ab.
  - z.B.: \[\[AU\]\], \[\[ZBST\]\], \[\[Ausweichen\]\]
  - Zulässig sind Attribute (ST, KO, PR, ...), ZBon (ZBST, ZBKO, ZBPR, ...), StBon (STBON) und Fertigkeiten (Ausweichen, FEUER, Schwert, ...).
  - Wichtig ist, die *Fertigkeiten* exakt so zu schreiben, wie sie eingetragen wurden.
  - ZBon und StBon schließen das jeweilige Attribut automatisch mit ein. (Für den Fall, dass Attribute und Boni ungewöhnlich kombiniert werden, am besten in der Rechnung das jeweilige Attribut wieder abziehen)
- Diese Funktion ist zunächst nur für *Trefferwerte*, *Schadenswerte*, *Beschreibungen*, *Itemfeatures* und *Kosten von Kräften* verfügbar. Das heißt auch, dass ihr mitten im Text von Items oder Kräften Berechnungen schreiben könnt!
- Beispiele findest du weiter unten.

### Regeln umschalten
- Im Menü kann zwischen Regelvarianten hin und her gewechselt werden.
- "Enthrone Darkness" ändert damit die verfügbaren Talente, die Währung und Trefferzonen bzw. Rüstung.
- "Werkstatt" ändert damit den Umgang mit Training, Expertise und Graden.

### Zur Sicherheit
- Auch wenn ich bereits viel gestestet habe, rechne ich damit, dass Fehler auftreten.
- Führt deshalb am Besten bei wichtigen Charakteren parallel ein Backup.
- Schreibt mir zu Bugs, denen ihr begegnet, per Discord.

### Bekannte Fehler
- Es ist nicht möglich mehrere Charakterbögen nebeneinander zu öffnen.
- Modulare Talente (z.B. Umgang \[Personengruppe\]) werden über custom Talente gelöst. Nutze den Eintrag in der Talentliste als Referenz.
- Man kann mehr SP/PP/MsP augeben, als einem zur Verfügung stehen. (Die Levelanzeige wird dann rot)
- Man kann einen höheren Talentgrad freischalten, bevor man den vorherigen freigeschaltet hat.
- Es wird nicht geprüft, ob die Voraussetzungen zum Freischalten von Fertigkeiten, Graden oder Talenten erfüllt sind.
- Umlaute werden manchmal falsch einsortiert.
- Zu lange Einträge (z.B. Links) in Textboxen in der Charakterbeschreibung sorgen auf schmaleren Bildschirmen für abgeschnittenen Text.

### Beispiele für Berechnungen im Text
*"IN ist meine Intelligenz, ZBon(IN) ist mein Zauberbonus."* => *\[\[IN\]\] ist meine Intelligenz, \[\[ZBIN\]\] ist mein Zauberbonus.*\
\
*"Trefferwert: PR + Expertise(Schwert)."* => *Trefferwert: {{\[\[PR\]\] + \[\[Schwert\]\]}}.*\
\
*"Diese Kraft trifft auf AU + Exp(Feuer) und macht (ZBon(AU) / 2) + 5 Schaden."* => *Treffer: {{\[\[AU\]\] + \[\[Feuer\]\]}}, Schaden: {{(\[\[ZBAU\]\] / 2) + 5}}.*\
\
*"Kompliziertere Berechnung: 33-(ZBon(PR)/2)"* => *{{33-(\[\[zbpr\]\]/2)}}*\
\
*"Schaden: St + mächtiger Schlag + 5 Schnittschaden + WK/2 Giftschaden"* => *Schaden: {{\[\[stbon\]\] + 5}} Schnittschaden + {{\[\[Wk\]\] / 2}} Giftschaden*\
\
*"Diese Kraft macht Schaden mit WK aber nutzt den ZBon von IN."* => *Schaden: {{\[\[WK\]\] + \[\[ZBIN\]\] - \[\[IN\]\]}}.*\
\
*"Diese Waffe macht Schaden mit GW + Mächtiger Schlag."* => *Schaden: {{\[\[GW\]\] + \[\[StBon\]\] - \[\[ST\]\]}}.*