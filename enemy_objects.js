//player object
var player = {
    health : 100,
    mana : 100,
    strength: 5,
    agility: 5,
    intelligence: 5,
    charisma: 5,
    xp: 0,
    level: 0,
    inventory : [],
    travelHistory : []
  }


//enemies

var withered = {
  name: "withered",
  greeting:
    "A withered shambles forward, barring its menacing teeth. It leaps forwards, attacking first.",
  health: 25,
  attackFirst: true,
  moveNum: 2,
  moves: [["bite", 5], ["slash", 8]],
  vulnerability: ["fire", 5],
  sounds: witheredAttackSound,
  introSound: witheredIntroSound,
  death: witheredDeathSound,
  xp: 500
};

var shardKeeper = {
  name: "Shard Keeper",
  greeting:
    "The Shard Keeper lumbers towards you, twirling its massive polearm. Good Luck",
  health: 100,
  moveNum: 3,
  moves: [["slash", 30], ["charge", 50], ["fire breath", 12]],
  vulnerability: ["blunt", 50],
  introSound: shardKeeperIntroSound,
  sounds: shardKeeperAttackSounds
  // death: shardKeeperDeathSound
};

var weakenedShardKeeper = {
  name: "Shard Keeper",
  greeting:
    "The Shard Keeper lumbers towards you. Blue liquid spewing from every orafice. It doesn't look well.",
  health: 50,
  moveNum: 3,
  moves: [["slash", 30], ["charge", 50], ["fire breath", 12]],
  vulnerability: ["blunt", 50],
  introSound: shardKeeperIntroSound,
  sounds: shardKeeperAttackSounds,
  xp: 1000
}


var brokenJailer = {
 name: "broken jailer",
 health: 75,
 moves: ["killer move here", 800],
 vulnerability: ["ice", 10]
}
