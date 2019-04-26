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
  owned: false,
  sound: swordAttackSound,
  condition: "Broken and mangled. You should find a replacement soon.",
  findText: "You lift up the broken sword, your mind flashing through the countless battles it must have been through. No doubt this once great weapon has now dilapidated into rust, and decay. What mighty warrior would cast aside a relic? What mighty foe made sure he didn't have a choice? (Equip with 'equip old sword'.)",
  lookText: "You approach the table carefully. You see an old, rusted sword, chipped from years of battle. Any defense at all would help stave off the fear. Try 'take sword'."
};

var steelMace = {
  name: "Steel mace",
  owned: false,
  condition: "Candle light glints off of every polished surface. Truely a powerful weapon.",
  findText: "You wrap your fingers around the leather hilt of the mace. Every possible angle seems impossibly polished. Judging by the condition of the weapon you guess that this mace is something someone is very proud of. It was well taken care of.",
  lookText: "You notice from the corner of your eye a text the writer should redo once he knows where this mace is found.",
  stats: 20,
  damageType: "blunt",
  sound: maceAttackSound
};

var claymore = {
  name: "Claymore",
  stats: 30,
  owned: false,
  damageType: "slash",
  sound: claymoreAttackSound
};

//spells

var fireBall = {
  stats: 20,
  damageType: "fire",
  manaCost: 25,
  owned: false,
  sound: fireBallSounds
};

var iceShard = {
  stats: 15,
  damageType: "ice",
  manaCost: 20,
  owned: false
  //sound: iceShard
};

//items
var healthPot = {
  name: "Health Potion",
  condition: "You hold the potion up to the torch. You can see small shimmers, almost thread-like floating in the solution.",
  findText: "You reach in and grasp the bottle. You worry briefly how badly you might need it in the hours to come.",
  stats: 35,
  owned: 2,
  sound: healthPotSound
};

var torch = {
  name: "torch",
  combat: false,
  owned: false,
  condition: "The bright dancing flames warm you, giving you the feeling of safety",
};

var skeleKey = {
  name: "Skeleton Key",
  combat: false,
  owned: false,
  condition: "You look over the key. It seems to be made of rusted copper. Bits and pieces of green flaking off to reveal the dull copper underneath. The notches seem worn down to almost nothing.",
  findText: "You gently pick the key up off the table. The rusted key leaving flakes of dark green copper on the end table. Looking closer you see the that the notches are worn down to almost nothing. You wonder for a moment what use this key might be. (Try using the key on something.)"
};

var throneScroll = {
  //Scroll
  name: "Thaddius' scroll",
  owned: false,
  condition: "Yellowed with age and has the distinct smell of sage.",
};

var cipher = {
  //Cipher
  name: "Cipher",
  owned: false,
  condition: "Old and bound in a deep black flesh. Theres a rune on the front you don't recongnize. Using the cipher you're able to determine that the text on the front reads 'Notes on the workings of Thaddius, the first shard keeper.",
};

let theOriginOfRain = {
  name: "The Origin of Rain",
  owned: false,
  condition: "An old Tome that must be thousands of years old. The bindings held together only by magic. Blue runes glow on the spine. With the cipher you're able to make out the title. Use 'read' to read the book.{{{{{{{{{{{{{{{THIS DOES NOT WORKK BUT DEFINITELY SHOULD ONE DAY}}}}}}}}}}}}}}}"
}

let serum = {
  name: "serum",
  owned: false,
  condition: "Glowing bright blue and viscous. Used as a torture method to make shardkeepers attack those who are unpure."
}

//armor
let rags = {
  stats: 0,
  description: "You look over your 'rags' despairingly. You feel cold, and vulnerable."
};

let cultistRobe = {
  name: "Cultist Disguise",
  owned: false,
  condition: "Bloody and full of stab wounds. No one should notice.",
  stats: 0,
  description: "The robes of the followers of Thaddius. Cultists will believe you are one of their brothers."
};

let chainMail = {
  stats: 10,
  description: "You look over your 'chainmail' with pride." //To be replaced by cooler text with context.
};
