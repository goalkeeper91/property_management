const playerRoles = {
    "Max_Mustermann": ["gewerbeamt", "admin"],
    "Anna_Schmidt": ["gewerbeamt"],
    "Peter_Müller": ["unternehmen"],
    // weitere Spieler mit Rollen...
  };
  
  function hasRole(playerName, role) {
    const roles = playerRoles[playerName] || [];
    return roles.includes(role);
  }
  
  module.exports = { hasRole };
  