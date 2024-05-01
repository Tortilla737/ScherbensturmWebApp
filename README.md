![Line](https://i.imgur.com/zQIoFD7.png)

## Scherbensturm darüber hinaus

**[Zur Anwendung](https://tortilla737.github.io/ScherbensturmWebApp/).**

Der Scherbensturm Charakterbogen als Webapp.

### Datei Speichern
- Die Seite speichert den aktuellen Bogen automatisch im Browser-Cashe.
- Manuelles Speichern über das Menü, lädt den Bogen als Datei herunter.
- Auf diese Art kann man mehrere Charakterbögen speichern und teilen (z.b. über Dropbox).

### Bilder
- Hintergrundbild und Itembilder werden als Link eingefügt.
- Dafür bei einem beliebigen Online-Bild mit Rechtsklick -> **Bildadresse kopieren** und anschließend in das Textfeld einfügen.
- Der Charaktertoken kann direkt über das Token Bild als Datei hochgeladen werden.

### Einträge verändern
- Bei Zahlenfeldern könnt ihr entweder direkt die Zahl eingeben, oder mit - oder + Werte abziehen bzw. addieren.
- Wenn ein Eintrag erstellt, oder verändert wird, nicht vergessen auf **Speichern** zu drücken.
- Bereiche, die durch obskure Regeln oder unvollständige Funktionen nicht vorhanden sind, können durch manuelle Modifikatoren gelöst werden.
  - z.B. manuelle Mods. beim ZBon, SP, PP, Bewegung, etc...
  - Nutze die Notizboxen, um die Quellen der Modifikatoren festzuhalten.

### Automatische Berechnung von Werten
- Die meisten Werte werden automatisch berechnet, wie z.B. ausgegebene SP und PP, oder Attribute.
- Trefferwerte, Schadenswerte und Beschreibungen können mit manuellen Berechnungen gefüttert werden.
- Text, der von zwei geschwungenen Klammern eingefasst ist, wird berechnet.
  - z.B.: {{10-6}}
- Text, der von zwei eckigen Klammern eingefasst ist, ruft den zugehörigen Wert ab.
  - z.B.: \[\[AU\]\], \[\[ZBST\]\], \[\[Ausweichen\]\]
  - Zulässig sind Attribute (ST, KO, PR, ...), ZBon (ZBST, ZBKO, ZBPR, ...), StBon (STBON) und Fertigkeiten.
  - Wichtig ist, die Fertigkeiten exakt so zu schreiben, wie sie eingetragen wurden.
  - ZBon und StBon sind dabei nur der Bonus **ohne Attribut**. (Für den Fall, dass Attribute und Boni ungewöhnlich kombiniert werden)
- Diese Funktion ist zunächst nur für Trefferwerte, Schadenswerte, Beschreibungen, Itemfeatures und Kosten von Kräften verfügbar.
- Daraus ergibt sich z.B.: 
*"Trefferwert: PR+10."* => *Trefferwert: {{\[\[PR\]\] + 10}}.*
*"Diese Kraft trifft auf AU + Exp(Feuer) und macht (ZBon(AU) / 2) + 5 Schaden."* => *Diese Kraft trifft auf {{\[\[AU\]\] + \[\[Feuer\]\]}} und macht {{((\[\[AU\]\] + \[\[ZBAU\]\]) / 2) + 5}} Schaden.*
*"33-(ZBon(PR)/2)"* => *{{33-((\[\[pr\]\]+\[\[zbpr\]\])/2)}}*
*"Schaden: StBon+5 Schnittschaden + WK/2 Giftschaden"* => *Schaden: {{\[\[ST\]\] + \[\[stbon\]\] + 5}} Schnittschaden + {{\[\[Wk\]\] / 2}} Giftschaden*

### Regeln umschalten
- Im Menü kann zwischen Regelvarianten hin und her gewechselt werden.
- Damit ändert sich: Die liste der Talente, die Währung und Trefferzonen bzw. Rüstung.

### Zur Sicherheit
- Auch wenn ich bereits viel gestestet habe, rechne ich damit, dass Fehler auftreten werden.
- Führt deshalb am Besten bei wichtigen Charakteren einen traditionellen Bogen parallel als Backup.
- Schreibt mir zu Bugs, denen ihr begegnet am Besten über Discord.

### Bekannte Fehler
- Es ist nicht möglich mehrere Charakterbögen nebeneinander zu öffnen.
- Modulare Talente (z.B. Umgang \[Personengruppe\]) werden über custom Talente gelöst. Der Eintrag in der Talentliste dient als Referenz.
- Man kann mehr SP/PP/MsP augeben, als einem zur Verfügung stehen. (Die Levelanzeige wird dann rot)
- Man kann einen höheren Talentgrad freischalten, bevor man den vorherigen freigeschaltet hat.
- Es wird nicht geprüft, ob die Voraussetzungen zum Freischalten von Fertigkeiten, Graden oder Talenten erfüllt sind.
- Umlaute werden manchmal falsch einsortiert.
- Zu lange Einträge (z.B. Links) in Textboxen in der Charakterbeschreibung sorgen auf schmaleren Bildschirmen für abgeschnittenen Text.