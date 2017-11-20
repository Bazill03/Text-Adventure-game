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

var clayMore = {
  name: "Claymore",
  stats: 30,
  damageType: "slash",
  sound: swordAttackSound //to be replaced by cooler sound
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

//armor
let rags = {
  stats: 0,
  description: "You look over your 'rags' despairingly. You feel cold, and vulnerable."
};

let cultistRobe = {
  stats: 5,
  description: "The robes of the followers of Thaddius. Cultists will believe you are one of their brothers."
};

let chainMail = {
  stats: 10,
  description: "You look over your 'chainmail' with pride." //To be replaced by cooler text with context.
};
