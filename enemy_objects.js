//prints out combat to combat div
function combatPrint(input, color) {
  $(".combatOutput").append("<p class='text-center'" + color + ">" + input + "</p>");
}
function updateInvDisplay(item) {
  $("#playerInventoryDisplay").append(item);
  $("#playerInventoryDisplay").append(document.createElement("br"));
}


//player object
var player = {
  name: "player",
  indentifier: "player",
  isPlayer: true,
  health: 98,
  mana: 98,
  strength: 5,
  agility: 1,
  intelligence: 5,
  charisma: 5,
  xp: 0,
  level: 0,
  pointsToSpend: 0,
  gold: 0,
  inventory: [],
  healthPotNum: 0,
  manaPotNum: 0,
  turnRoll: 0,
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
  travelHistory: [],
  //Resistances
  coldDefence: false
};

//enemies
class rat {
  constructor(name,health,goldReward,dodgeChance,loot,xp,greeting,agility){
    this.name = name;
    this.health = health;
    this.agility = agility;
    this.indentifier = null;
    this.greeting = greeting;
    this.attackFirst = false;
    this.isPlayer = false;
    //debuffs
    this.stunned = 0;
    this.moveNum = 2;
    this.moves = [
      ["bite", 2],
      ["slash", 3],
      ["go for the neck", 10]
    ];
    this.vulnerability = [["blunt", 3],["fire", 2]];
    this.goldReward = goldReward;
    this.sounds = ratAttackSound;
    this.introSound = ratAttackSound;
    this.death = ratDeathSound;
    this.dodgeChance = dodgeChance;
    this.loot = loot;
    this.xp = xp;
    this.turnRoll = 0;
  }
}

//withered class
class withered {
  constructor(name,health,goldReward,dodgeChance,loot,xp,greeting, agility){
    this.name = name;
    this.health = health;
    this.agility = agility;
    this.goldReward = goldReward;
    this.indentifier = null;
    this.isPlayer = false;
    //defuffs
    this.stunned = 0;
    this.turnRoll = 0;
    this.attackFirst = true;
    this.moveNum = 2;
    this.moves = [
      ["bite", 5],
      ["slash", 8]
    ];
    this.vulnerability = ["fire", 5];
    this.dodgeChance = dodgeChance;
    this.loot = loot;
    this.sounds = witheredAttackSound;
    this.introSound = witheredIntroSound;
    this.death =  witheredDeathSound;
    this.xp = xp;
    this.greeting = greeting;
    this.turnRoll = 0;
  }
}

var antechamber_withered = {
  name: "withered",
  greeting: "You open the antechamber door, brancing yourself for impact only to find the sad creature huddled into the alcove. It sits in the fetal position, its arms wrapped tight around its knees. With the door open, you're finally able to make out what it's speaking. 'I was great once...', it mumbles in a raspy, desert dry voice. It looks up at you. It's mouth opens wide and claws extend from it's hand. 'I was great once!' it screams as it lunges towards you.",
  health: 30,
  indentifier: null,
  attackFirst: true,
  turnRoll: null,
  agility: 5,
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
  dodgeChance: 0.12,
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
  dodgeChance: 0.12,
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
  dodgeChance: 0.05,
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
  dodgeChance: 0.01,
  xp: 1000
};


var brokenJailer = {
  name: "broken jailer",
  health: 75,
  moves: ["killer move here", 800],
  vulnerability: ["ice", 10],
  goldReward: 20,
  dodgeChance: 0.03
};
