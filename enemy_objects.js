//prints out combat to combat div
function combatPrint(input, color) {
  $(".combatOutput")
    .append("<p class='text-center'" + color + ">" + input + "</p>");
  //reset textbox
  $("#commandline").val("");
}
function updateInvDisplay(item) {
  $("#playerInventoryDisplay").append(item);
  $("#playerInventoryDisplay").append(document.createElement("br"));
}


//player object
var player = {
  health: 100,
  mana: 100,
  strength: 5,
  agility: 5,
  intelligence: 5,
  charisma: 5,
  xp: 0,
  level: 0,
  pointsToSpend: 0,
  gold: 0,
  inventory: [],
  healthPotNum: 0,
  manaPotNum: 0,
  //Weapon
  weaponName: "",
  weaponStats: 0,
  weaponDamageType: "",
  weaponCondition: "",
  weaponSound: "",
  //Armor
  armorName: "",
  armorStats: 0,
  armorDescription: "",
  armorCondition: "",
  //Shield
  shieldName: "",
  shieldStats: 0,
  shieldBlockChance: 0,
  shieldDescription: "You have no shield equipped",
  travelHistory: []
};


//enemies

var withered = {
  name: "withered",
  greeting: "A withered shambles forward, barring its menacing teeth. It leaps forwards, attacking first.",
  health: 25,
  attackFirst: true,
  moveNum: 2,
  moves: [
    ["bite", 5],
    ["slash", 8]
  ],
  vulnerability: ["fire", 5],
  goldReward: 5,
  loot: function() {
    combatPrint("You stand over the shattered body of the withered. His mangled hand slow unfurles revealing five gold!.");
    combatPrint("You receive 5 gold!", "yellow");
  },
  sounds: witheredAttackSound,
  introSound: witheredIntroSound,
  death: witheredDeathSound,
  xp: 500
};


var hallwayWithered = {
  name: "withered",
  greeting: "A withered shambles forward, barring its menacing teeth. It leaps forwards, attacking first.",
  health: 25,
  attackFirst: true,
  moveNum: 2,
  moves: [
    ["bite", 5],
    ["slash", 8]
  ],
  vulnerability: ["fire", 5],
  goldReward: 5,
  loot: function() {
    combatPrint("You stand over the shattered body of the withered. His mangled hand slow unfurles revealing some gold!.");
    combatPrint("You receive 5 gold!", "yellow");
    combatPrint("Beneath the withereds body you find an old pot lid. You pull it from underneath the mangled corpse.");
    combatPrint("Try to equip your new shield with 'equip makeshift shield'");
    makeshiftShield.owned = true;
    player.inventory.push("makeshift shield");
  },
  sounds: witheredAttackSound,
  introSound: witheredIntroSound,
  death: witheredDeathSound,
  xp: 500
};


var antechamber_withered = {
  name: "withered",
  greeting: "You open the antechamber door, brancing yourself for impact only to find the sad creature huddled into the alcove. It sits in the fetal position, its arms wrapped tight around its knees. With the door open, you're finally able to make out what it's speaking. 'I was great once...', it mumbles in a raspy, desert dry voice. It looks up at you. It's mouth opens wide and claws extend from it's hand. 'I was great once!' it screams as it lunges towards you.",
  health: 30,
  attackFirst: true,
  moveNum: 2,
  moves: [
    ["bite", 7],
    ["slash", 10]
  ],
  vulnerability: ["fire", 3],
  goldReward: 5,
  loot: function() {
    combatPrint("You stand over the shattered body of the withered. Behind him, in the corner of the antechamber you see a piece of vellum.");
    combatPrint("You receive the Scrawled Writings!", "intColor");
    scrawledWritings.owned = true;
    updateInvDisplay("Scrawled Writings");
    combatPrint("You receive 5 gold!", "yellow");
  },
  sounds: witheredAttackSound,
  introSound: witheredIntroSound,
  death: witheredDeathSound,
  xp: 600
};

var shrine_withered = {
  name: "withered",
  greeting: "The withered charges you, claws outstretched, sharp teeth bared. It closes the distance faster than you can draw your weapon.",
  health: 35,
  attackFirst: true,
  moveNum: 3,
  moves: [
    ["bite", 7],
    ["slash", 10],
    ["fireball", 8]
  ],
  vulnerability: ["fire", 3],
  goldReward: 5,
  loot: function() {
    combatPrint("The withered falls before your blade.");
    combatPrint("You receive 5 gold!", "yellow");
    //add a health potion to inventory
  },
  sounds: witheredAttackSound,
  introSound: witheredIntroSound,
  death: witheredDeathSound,
  xp: 600,
  is_alive: true
};

var shardKeeper = {
  name: "Shard Keeper",
  greeting: "The Shard Keeper lumbers towards you, twirling its massive polearm. Good Luck",
  health: 100,
  moveNum: 3,
  moves: [
    ["slash", 30],
    ["charge", 50],
    ["fire breath", 12]
  ],
  vulnerability: ["blunt", 50],
  goldReward: 13,
  introSound: shardKeeperIntroSound,
  sounds: shardKeeperAttackSounds,
  // death: shardKeeperDeathSound
  xp: 1500
};

var weakenedShardKeeper = {
  name: "Shard Keeper",
  greeting: "The Shard Keeper lumbers towards you. Blue liquid spewing from every orafice. It doesn't look well.",
  health: 50,
  moveNum: 3,
  moves: [
    ["slash", 30],
    ["charge", 50],
    ["fire breath", 12]
  ],
  vulnerability: ["blunt", 50],
  goldReward: 13,
  introSound: shardKeeperIntroSound,
  sounds: shardKeeperAttackSounds,
  xp: 1000
};


var brokenJailer = {
  name: "broken jailer",
  health: 75,
  moves: ["killer move here", 800],
  vulnerability: ["ice", 10],
  goldReward: 20
};
