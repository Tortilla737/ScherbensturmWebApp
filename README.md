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
- Dafür bei einem beliebigen Online-Bild mit Rechtsklick -> **Bildadresse** kopieren und anschließend in das Textfeld einfügen.
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
  - Zulässig sind Attribute (ST, KO, PR, ...), ZBon (ZBST, ZBKO, ZBPR, ...), und Fertigkeiten.
  - Wichtig ist, die Fertigkeiten exakt so zu schreiben, wie sie eingetragen wurden.
  - ZBon ist dabei nur der Bonus ohne Attribut.
- Daraus ergibt sich z.B.: *"Trefferwert: {{\[\[PR\]\] + 10}}."* oder *"Diese Kraft trifft auf {{\[\[AU\]\] + \[\[Feuer\]\]}} und macht {{(\[\[ZBAU\]\] / 2) + 5}} Schaden."* oder *"{{33-((\[\[pr\]\]+\[\[zbpr\]\])/2)}}"*.
- Diese Funktion ist zunächst nur für Trefferwerte, Schadenswerte, Beschreibungen, Itemfeatures und Kosten von Kräften verfügbar.

### Regeln umschalten
- Im Menü kann zwischen Regelvarianten hin und her gewechselt werden.
- Damit ändert sich: Die liste der Talente, die Währung und Trefferzonen bzw. Rüstung.

### Zur Sicherheit
- Auch wenn ich bereits viel gestestet habe, rechne ich damit, dass Fehler auftreten werden.
- Führt deshalb am Besten bei wichtigen Charakteren einen traditionellen Bogen parallel als Backup.
- Schreibt mir zu Bugs, denen ihr begegnet am Besten über Discord.

### Bekannte Fehler
- Modulare Talente (z.B. Umgang \[Personengruppe\]) können nur einmal freigeschaltet werden.
- Man kann mehr SP/PP/MsP augeben, als einem zur Verfügung stehen. (Die Levelanzeige wird dann rot)
- Man kann einen höheren Talentgrad freischalten, bevor man den vorherigen freigeschaltet hat.
- Es wird nicht geprüft, ob die Voraussetzungen zum Freischalten von Fertigkeiten, Graden oder Talenten erfüllt sind.