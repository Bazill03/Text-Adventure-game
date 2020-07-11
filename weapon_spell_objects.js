//weapons

var fists = {
  weaponName: "fists",
  identifier: "fists",
  weaponStats: 1,
  weaponDamageType: "blunt",
  weaponSound: punchSound
};

var oldSword = {
  weaponName: "old sword",
  identifier: "oldSword",
  weaponStats: 5,
  weaponDamageType: "slash",
  owned: false,
  weaponSound: swordAttackSound,
  weaponCondition: "Broken and mangled. You should find a replacement soon.",
  findText: "You lift up the broken sword, your mind flashing through the countless battles it must have been through. No doubt this once great weapon has now dilapidated into rust, and decay. What mighty warrior would cast aside a relic? What mighty foe made sure he didn't have a choice? (Equip with 'equip old sword'.)",
  lookText: "You approach the table carefully. You see an old, rusted sword, chipped from years of battle. Any defense at all would help stave off the fear. Try 'take sword'.",
  reqStrength: 3,
  canWieldShield: true
};

var woodenMallet = {
  weaponName: "wooden mallet",
  identifier: "woodenMallet",
  weaponStats: 3,
  weaponDamageType: "blunt",
  owned: false,
  weaponSound: woodenWeaponSound,
  weaponCondition: "Broken and mangled. You should find a replacement soon.",
  findText: "You lift up the broken sword, your mind flashing through the countless battles it must have been through. No doubt this once great weapon has now dilapidated into rust, and decay. What mighty warrior would cast aside a relic? What mighty foe made sure he didn't have a choice? (Equip with 'equip old sword'.)",
  lookText: "You approach the table carefully. You see an old, rusted sword, chipped from years of battle. Any defense at all would help stave off the fear. Try 'take sword'.",
  reqStrength: 1,
  canWieldShield: true
};

var royalSabre = {
  weaponName: "Royal Sabre",
  identifier: "royalSabre",
  owned: false,
  weaponCondition: "A royal sabre. To be changed at a later date.",
  findText: "Teach the player how to equip.",
  lookText: "Try to equip this with equip, then the name royal sabre",
  stats: 10,
  weaponDamageType: "slash",
  weaponSound: swordAttackSound,
  reqStrength: 4,
  canWieldShield: true
};

var steelMace = {
  weaponName: "Steel mace",
  identifier: "steelMace",
  owned: false,
  weaponCondition: "Candle light glints off of every polished surface. Truely a powerful weapon.",
  findText: "You wrap your fingers around the leather hilt of the mace. Every possible angle seems impossibly polished. Judging by the condition of the weapon you guess that this mace is something someone is very proud of. It was well taken care of.",
  lookText: "You notice from the corner of your eye a text the writer should redo once he knows where this mace is found.",
  weaponStats: 20,
  weaponDamageType: "blunt",
  sound: maceAttackSound,
  reqStrength: 10,
  canWieldShield: true
};

var claymore = {
  weaponName: "Claymore",
  identifier: "claymore",
  weaponStats: 35,
  owned: false,
  weaponDamageType: "slash",
  sound: claymoreAttackSound,
  reqStrength: 20,
  canWieldShield: false
};
//END WEAPONS

//BEGIN SHIELDS
var makeshiftShield = {
  shieldStats: 3,
  shieldBlockChance: 5,
  shieldName: "Makeshift Shield",
  shieldDescription: "What once was an old pot lid is now the only thing between you, and the gnashing teeth of a charging withered.",
  owned: false
};

var aeleasbulwark = {
  shieldStats: 20,
  shieldBlockChance: 20,
  shieldName: "Aelea's Bulwark",
  shieldDescription: "A wall of solid golden light that emits from your wrist at your time of greatest need.",
  owned: false
}
//armor
var rags = {
  armorName: "rags",
  armorStats: 0,
  armorDescription: "You look over your 'rags' despairingly. You feel cold, and vulnerable."
};

var cultistRobe = {
  armorName: "Cultist Disguise",
  owned: false,
  armorCondition: "Bloody and full of stab wounds. No one should notice.",
  armorStats: 0,
  armorDescription: "The robes of the followers of Thaddius. Cultists will believe you are one of their brothers."
};

var leatherChest = {
  armorName: "leather vest",
  owned: false,
};

var chainMail = {
  stats: 10,
  owned: false,
  description: "You look over your 'chainmail' with pride." //To be replaced by cooler text with context.
};

var rainsPlate = {
  stats: 50,
  owned: false,
  description: "A sturdy white and gold plate armor. The chest is emblazened with the royal crest. You are now an elite warrior"
}


//spells

var fireBallScroll = {
  owned: false
};

var fireBall = {
  name: "fireball",
  playerHas: true,
  stats: 15,
  damageType: "fire",
  manaCost: 10,
  owned: false,
  sound: fireBallSounds,
  castText: "You sling the fireball for "
};

var stun = {
  name: "stun",
  playerHas: true,
  stats: 2,
  damageType: "stun",
  manaCost: 25,
  owned: true,
  sound: electricShock,
};

var explosion = {
  name: "explosion",
  playerHas: true,
  stats: 15,
  damageType: "fire",
  manaCost: 30,
  owned: true,
  sound: fireBallSounds
};

var iceShard = {
  name: "ice shard",
  playerHas: true,
  stats: 15,
  damageType: "ice",
  manaCost: 12,
  owned: false,
  sound: iceShardSound,
  castText: "You summon an ice shard! It flies forwards like an arrow for "
};

var aeleasLight = {
  playerHas: false,
  stats: 30,
  damageType: "holy",
  manaCost: 50,
  owned: false
  //sound: aeleasLightSound
}

//items
var healthPot = {
  name: "Health Potion",
  condition: "You hold the potion up to the torch. You can see small shimmers, almost thread-like floating in the solution.",
  findText: "You reach in and grasp the bottle. You worry briefly how badly you might need it in the hours to come.",
  stats: 35,
  owned: 0,
  sound: healthPotSound
};

var torch = {
  name: "torch",
  combat: false,
  owned: false,
  condition: "The bright dancing flames warm you, giving you the feeling of safety",
};

var skeleKey = {
  name: "Old Copper Key",
  combat: false,
  owned: false,
  condition: "You look over the key. It seems to be made of rusted copper. Bits and pieces of green flaking off to reveal the dull copper underneath. The notches seem worn down to almost nothing.",
  findText: "You gently pick the key up off the table. The rusted key leaving flakes of dark green copper on the end table. Looking closer you see the that the notches are worn down to almost nothing. You wonder for a moment what use this key might be. (Try using the key on something.)"
};

var butlersKey = {
  name: "Bulers Key",
  combat: false,
  owned: false,
  condition: "There should be something written here."
};

var butlersDoor = {
  locked: true
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

var theOriginOfRain = {
  name: "The Origin of Rain",
  owned: false,
  condition: "An old Tome that must be thousands of years old. The bindings held together only by magic. Blue runes glow on the spine. With the cipher you're able to make out the title. Use 'read' to read the book.{{{{{{{{{{{{{{{THIS DOES NOT WORKK BUT DEFINITELY SHOULD ONE DAY}}}}}}}}}}}}}}}"
};

var serum = {
  name: "serum",
  owned: false,
  condition: "Glowing bright blue and viscous. Used as a torture method to make shardkeepers attack those who are unpure."
};

var scrawledWritings = {
  name: "Scrawled writings",
  owned: false,
  condition: "You look over the torn vellum. Most of the note is illegible but beneath all the scrawling some words can be made out: I was born to be a king. It was my only purpose. How dare I die to this contemptable fate. What tragedy befalls me. My brother. My rotten King Ambrosianus. He taunted me as he assumed the throne. Now my skin withers and sloughs off, beneath it my muscles pulse and squirm. I crave the flesh. I crave the neck of King Ambrosianus."
};

noteUnderRug = {
  name: "Note",
  owned: false,
  deciphered: false,
  condition: "A note you found under the rug.",
  read: "A note you found under the rug in the royal dressing room. It reads: Some shit."
  
}

var smallHallwayBarrel = {
  opened: false
};

var weaponList = [fists,oldSword,woodenMallet,royalSabre,steelMace,claymore];