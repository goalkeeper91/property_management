# Immobilien Verwaltung (Rage MP)

Dieses Projekt ist ein Basissystem für die Verwaltung von vermietbaren Objekten (z.B. Schließfächer) in Rage MP.

## Features
- Erstellung von Schließfächern durch Spieler
- Vermietung von Schließfächern an andere Spieler
- Anzeige des Status eines Schließfachs (Besitzer, Mieter, Mietdauer)
- Speicherung der Daten in JSON-Dateien

## Installation
1. Das Verzeichnis `immobilien_verwaltung` in den Rage MP Server-Ordner `/packages/` kopieren.
2. Server starten.
3. Im Spiel die Befehle verwenden:
    - `/locker_add [ID]` — Neues Schließfach erstellen
    - `/locker_miete [ID] [Spielername] [Tage]` — Schließfach vermieten
    - `/locker_status [ID]` — Status eines Schließfachs abfragen

## Weiterentwicklung
- Preisänderung für Schließfächer
- Überziehung & automatische Zwangsräumung
- Passwortschutz für Schließfächer
- Tablet-Integration für einfachere Bedienung

## Struktur
- `index.js` — Hauptskript mit Server-Events und Befehlen
- `data/lockers.json` — JSON-Datei zur Speicherung der Schließfachdaten
- `utils/jsonStorage.js` — Hilfsfunktionen zum Laden und Speichern von JSON-Daten

## Lizenz
Alle Rechte vorbehalten.  
Der Code darf ohne schriftliche Genehmigung des Autors nicht verwendet, kopiert oder weiterverbreitet werden.

Copyright (c) 2025 Marcel Turlach
