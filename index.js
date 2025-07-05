const { loadJSON, saveJSON } = require('./utils/jsonStorage');
const LOCKER_PATH = 'data/lockers.json';
const { hasRole } = require('./utils/roles');

// Schließfach hinzufügen
mp.events.addCommand('locker_add', (player, _, lockerId) => {
    const lockers = loadJSON(LOCKER_PATH);

    if (!lockerId) return player.outputChatBox("Benutzung: /locker_add [ID]");
    if (lockers[lockerId]) return player.outputChatBox("❌ Schließfach existiert bereits.");

    lockers[lockerId] = {
        id: lockerId,
        owner: player.name,
        pricePerDay: 100,
        rentedTo: null,
        rentalEnds: null
    };

    saveJSON(LOCKER_PATH, lockers);
    player.outputChatBox(`✅ Schließfach '${lockerId}' erstellt.`);
});

// Schließfach vermieten
mp.events.addCommand('locker_miete', (player, _, lockerId, spielerName, tage) => {
    const lockers = loadJSON(LOCKER_PATH);
    const target = mp.players.toArray().find(p => p.name === spielerName);

    if (!lockerId || !spielerName || !tage) return player.outputChatBox("Benutzung: /locker_miete [ID] [Spielername] [Tage]");
    if (!target) return player.outputChatBox("❌ Spieler nicht online.");

    let locker = lockers[lockerId];
    if (!locker) return player.outputChatBox("❌ Schließfach nicht gefunden.");
    if (locker.owner !== player.name) return player.outputChatBox("❌ Du besitzt dieses Schließfach nicht.");
    if (locker.rentedTo) return player.outputChatBox("❌ Schon vermietet.");

    let durationMs = parseInt(tage) * 24 * 60 * 60 * 1000;

    locker.rentedTo = target.name;
    locker.rentalEnds = new Date(Date.now() + durationMs).toISOString();

    saveJSON(LOCKER_PATH, lockers);

    player.outputChatBox(`✅ Vermietet an ${target.name} für ${tage} Tage.`);
    target.outputChatBox(`🔑 Du hast Schließfach '${lockerId}' gemietet.`);
});

// Status anzeigen
mp.events.addCommand('locker_status', (player, _, lockerId) => {
    const lockers = loadJSON(LOCKER_PATH);
    const locker = lockers[lockerId];
    if (!locker) return player.outputChatBox("❌ Nicht gefunden.");

    const info = `
📦 Schließfach: ${locker.id}
👤 Besitzer: ${locker.owner}
💰 Preis/Tag: $${locker.pricePerDay}
🔑 Mieter: ${locker.rentedTo || "Niemand"}
⏳ Bis: ${locker.rentalEnds || "—"}
`.trim();

    player.outputChatBox(info.replace(/\n/g, ' | '));
});

// Schließfach einem Spieler/Gewerbe zuordnen
mp.events.addCommand('locker_setowner', (player, _, lockerId, spielerName) => {
    if (!hasRole(player.name, 'gewerbeamt')) {
        return player.outputChatBox("❌ Nur Gewerbeamtsmitarbeiter dürfen diesen Befehl nutzen.");
    }

    if (!lockerId || !spielerName) {
        return player.outputChatBox("Benutzung: /locker_setowner [Schließfach-ID] [Spielername]");
    }

    const lockers = loadJSON(LOCKER_PATH);
    const locker = lockers[lockerId];
    if (!locker) {
        return player.outputChatBox("❌ Schließfach nicht gefunden.");
    }

    const target = mp.players.toArray().find(p => p.name === spielerName);
    if (!target) {
        return player.outputChatBox("❌ Spieler nicht online.");
    }

    // Hier kannst du evtl. noch prüfen, ob der Spieler berechtigt ist (optional)

    locker.owner = target.name;

    // Falls der Schließfach vorher vermietet war, Mieter und Mietzeit resetten
    locker.rentedTo = null;
    locker.rentalEnds = null;

    saveJSON(LOCKER_PATH, lockers);

    player.outputChatBox(`✅ Schließfach '${lockerId}' wurde dem Besitzer ${target.name} zugewiesen.`);
    target.outputChatBox(`🔑 Du bist jetzt Besitzer des Schließfachs '${lockerId}'.`);
});

