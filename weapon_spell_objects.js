//weapons

var fists = {
  name: "fists",
  stats: 3,
  damageType: "blunt",
  sound: punchSound
}

var oldSword = {
  name: "old sword",
  stats: 5,
  damageType: "slash",
  sound: swordAttackSound
};

var steelMace = {
  name: "Steel mace",
  stats: 20,
  damageType: "blunt",
  sound: maceAttackSound
};

//spells

var fireBall = {
  stats: 20,
  damageType: "fire",
  manaCost: 25,
  owned: false,
  sound: fireBallSounds
};

//items
var healthPot = {
  stats: 35,
  owned: 2,
  sound: healthPotSound
};
