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
  death: witheredDeathSound
};

var shardKeeper = {
  name: "Shard Keeper",
  greeting:
    "The Shard Keeper lumbers towards you, twirling its massive polearm. Good Luck",
  health: 100,
  moveNum: 3,
  moves: [["slash", 30], ["charge", 50], ["fire breath", 12]],
  vulnerability: ["blunt", 50],
  introSound: shardKeeperIntroSound
};


var brokenJailer = {
 name: "broken jailer",
 health: 75,
 moves: ["killer move here", 800],
 vulnerability: ["ice", 10]
}
