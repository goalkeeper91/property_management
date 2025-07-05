const fs = require('fs');
const path = require('path');

function loadJSON(relativePath) {
    const fullPath = path.join(__dirname, '..', relativePath);
    if (!fs.existsSync(fullPath)) fs.writeFileSync(fullPath, '{}');
    return JSON.parse(fs.readFileSync(fullPath));
}

function saveJSON(relativePath, data) {
    const fullPath = path.join(__dirname, '..', relativePath);
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
}

module.exports = { loadJSON, saveJSON };
