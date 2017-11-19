var gameData = {
//player and enemy objects
player: {
  health: 100,
  mana: 100,
  inventory: [],
  travelHistory: [],
  equip: Math.floor(Math.random()*(5-1+1)+1)
},
spells: [
//spells objects
fireBall = {
  damage: Math.floor(Math.random()*(20-10+1)+1),
  manaCost: 25,
  owned: false
}
],
  enemies : [
  {
  name: "withered",
  health: 50,
  moves: [["bite", Math.floor(Math.random() * (5 - 1 + 1)) + 1], ["slash", Math.random(4 - 6)]],
  vulnerability: ["fire", 3]
  },
  {
   name: "Shard Keeper",
   health: 200,
   moves: [["slash", 30],["charge"], 50],
   vulnerability: null
  },
  {
   name: "broken jailer",
   health: 75,
   moves: ["killer move here", 800],
   vulnerability: ["ice", 10]
  }
],
items : [
//Items

  {
  name: "old sword",
  combat: true,
  owned: false,
  condition: "Broken and mangled. You should find a replacement soon.",
  findText: "You lift up the broken sword, your mind flashing through the countless battles it must have been through. No doubt this once great weapon has now dilapidated into rust, and decay. What mighty warrior would cast aside a relic? What mighty foe made sure he didn't have a choice?",
  lookText: "You approach the table carefully. You see an old, rusted sword, chipped from years of battle. Any defense at all would help stave off the fear. Try 'take sword'.",
  stats: Math.floor(Math.random()*(5-1+1)+1)
},

{
  name: "torch",
  combat: false,
  owned: false,
  condition: "The bright dancing flames warm you, giving you the feeling of safety",
},
{
  name: "Skeleton Key",
  combat: false,
  owned: false,
  condition: "You look over the key. It seems to be made of rusted copper. Bits and pieces of green flaking off to reveal the dull copper underneath. The notches seem worn down to almost nothing.",
  findText: "You gently pick the key up off the table. The rusted key leaving flakes of dark green copper on the end table. Looking closer you see the that the notches are worn down to almost nothing. You wonder for a moment what use this key might be. (Try using the key on something.)"
},
  {
  //health potion
  name: "Health Potion",
  owned: false,
  condition: "You hold the potion up to the torch. You can see small shimmers, almost thread-like floating in the solution.",
  findText: "You reach in and grasp the bottle. You worry briefly how badly you might need it in the hours to come."
  },
  {
  //Scroll
  name: "Thaddius' scroll",
  owned: false,
  condition: "Yellowed with age and has the distinct smell of sage.",
  },
  {
  //Cipher
  name: "Cipher",
  owned: false,
  condition: "Old and bound in a deep black flesh. Theres a rune on the front you don't recongnize. Using the cipher you're able to determine that the text on the front reads 'Notes on the workings of Thaddius, the first shard keeper.",
  },
  ],
  rooms: [
  {
  name: 'strange room',
  look: ['old door, torch'],
  description: "You are back in the strange room.",
  commands: [
    {
     input: 'look old door',
     result:  function(){
      print("A large oak door lays before you. The screams still echoing around you, you lean closer trying to hear what may be on the other side. Ear glued to the door, your hand reaches down to grasp the latch. The door opens freely. Try typing 'open old door' to find out whats on the other side.");
     }
    },
    {
      input: 'look torch',
      result: function(){
        print("The torch lays lifeless on the ground.");
      }
    },
    {
      input: 'take torch',
      result: function(){
        print("Looking closer at the torch you find a flint and steel placed nearby, as if by a delicate hand. The hair on the back of your head stands up. You light the torch and the room blooms with light. Taking another look, you find that you're in a small, windowless room with one door on the western side. Try typing 'Look old door' to look closer. Or, try 'consider torch' to look at it.");
      gameData.player.inventory.push("torch");
      gameData.items[1].owned = true;
      gameData.rooms[0].splice(0,1);
      }
    },
    {
      input: 'open old door',
      result: function(){
        currentRoom = gameData.rooms[1];
        gameData.player.travelHistory.push(currentRoom);
        currentRoom = gameData.rooms[1];
        currentRoom.description()
        }
      },
  ]

},//end of strange room
{
  name: 'Library',
  look: ["shining object", "bookshelves", "window", "door leading south"],
  description: function(){
    if(gameData.items[1].owned === false){
          print("You arrive in the western corridor. Books line the walls top to bottom, the tomes old and rotten with age. The unmistakeable scent of old books makes the room feel humid and dense. The room is dimly lit by moonlight streaming in from arched windows between the bookcases. Birds flying outside cause shadows to play throughout the room making you feel threatened and small. Every skittering shadow makes you recoil in fear, too afraid to even breathe. You vaguely remember a torch in the north room.");
        } else {
          print("You arrive in the western corridor. Books line the walls top to bottom, the tomes old and rotten with age. The unmistakeable scent of old books makes the room feel humid and dense. The room is dimly lit by moonlight streaming in from arched windows between the bookcases. Birds flying outside cause shadows to play throughout the room, making you feel threatened, but prepared. With the light of your torch, you are able to make out a shining object laying on a table in the center of the room. You hesitantly move closer. Try your 'look' command.");
  }
  },
  commands: [
    {
      input: 'look window',
      result: function(){ print("You poke your head out the window. Crows soar around your head, desperate for a meal. You find yourself fighting them off, unable to get a good look outside.")}
    },
    {
      input: 'look shining object',
      result: function(){print("You approach the table carefully. You see an old, rusted sword, chipped from years of battle. Any defense at all would help stave off the fear. Try 'take sword'.")}
    },
    {
      input: 'look bookshelves',
      result: function(){print("You browse the tomes along the walls. The leatherbound books seem to be so old that you no longer recongnize the language.")}
    },
    {
      input: "look door leading south",
      result: function(){print("You walk past the rows of book to a southern door. You put your ears up to it but hear nothing but the distant screams you've heard all along. Try 'open door leading south'.")}
    },
    {
      input: "open door leading south",
      result: function(){
        if(gameData.items[1].owned === true){
        currentRoom = gameData.rooms[2];
        gameData.player.travelHistory.push(currentRoom);
        print(currentRoom.description());
        } else {
          print("Darkness and fear envelops you. You struggle to push through the darkness but the further you get into the blackness the more your mind races with the thoughts of the undead pouring out of the ground. You are in the gallows, hanging by your neck, your eyes twisting wildly in your head while your skin disintegrates into bone. You feel your hands and feet tied. The sky is blue dotted only with a few clouds that are so far away, they barely seem to exist at all. You're suspended in the air by your ties. A whistle goes up, and the four horses you just noticed are running away from you, you're arms and legs following them. Then suddenly you are back on a small farm you once called home. A black haired woman calls out to you from the distance. You try to run to her but your legs are heavy. Every painful step seems to take you farther away. Soon she begins to fade off in the distace as if the world is growing larger between you. You cry out for her but the world turns black. You open your eyes, you are back in the library.")
        }
      }
    },
    {
      input: "take sword",
      result: function(){
      print("You lift up the broken sword, your mind flashing through the countless battles it must have been through. No doubt this once great weapon has now dilapidated into rust, and decay. What mighty warrior would cast aside a relic? What mighty foe made sure he didn't have a choice?");
      gameData.player.inventory.push("old sword");
      gameData.items[0].owned = true;
      gameData.rooms[1].look.shift();
      gameData.rooms[1].look.push("empty table");
      }
    }
  ]
},
{
  name: "Lounge",
  look: ["end table", "chair", "bookshelves", "door leading east"],
  description: function(){print("You open the door and find yourself in a quiet room outfitted with chairs, a small end table, and even more bookshelves. The room seems to be unnaturally dark. Your torch doesn't throw as much light here.")},
  lockedDoor: {
    locked: true
  },
  commands: [
    {
      input: "look chair",
      result: function(){print("A large velvet chair sits before you. The deep red hue of the chair reminds you of blood. You consider sitting in it for a moment but a dark force makes you consider otherwise")}
    },
    {
      input: "look end table",
      result: function(){
        if(gameData.items[2].owned === false){
          print("The round end table seems to be made of a dark, polished hardwood. You find an empty oil lantern with busted glass, and a key. You pick up the key for a moment and hold the torch up to it. The notches seem ground down to almost nothing.");
        } else {
          print("There's an indent in the wood the shape of the key. As if the key had been slowly burning it's way through the table. The key seems cool to the touch.");
        }
      }
    },
    {
      input: "look bookshelves",
      result: function(){print("You browse the tomes along the walls. The leatherbound books seem to be so old that you no longer recongnize the language.")}
    },
    {
      input: "look door leading east",
      result: function() {
        if(gameData.rooms[2].lockedDoor.locked === true){
          print("You approach the door and try to open it. Locked. Glancing through the keyhole you see only darkness.");
        } else {
          print("You look through the keyhole. You see only darkness.");
        }
      },
    },
    {
      input: "take key",
      result: function(){
      print("You gently pick the key up off the table. The rusted key leaving flakes of dark green copper on the end table. Looking closer you see the that the notches are worn down to almost nothing. You wonder for a moment what use this key might be. (Try using the key on something.)");
      gameData.player.inventory.push("skeleton key");
      gameData.items[2].owned = true;
      }
    },
    {
      input: "use key on door leading east",
      result: function(){
      gameData.rooms[2].lockedDoor.locked = false;
      print("The key turns easily in the lock. The clicking sound of the lock gives off an unnatural echo in the room.");
      }
    },
    {
      input: "open door leading east",
      result: function(){
        if(gameData.rooms[2].lockedDoor.locked === true){
          print("You approach the door and wiggle the handle. Locked.")
        } else {
          currentRoom = gameData.rooms[3];
          print(gameData.rooms[3].description);
        }

      }
    }
  ]
},
{
  name: "small hallway",
  look: ['barrel, dead enemy, small archway, door leading east'],
  description: "You are in a small hallway. Your torch seems to emit even less light here. The smell of rotting flesh tingles your nose and makes your stomach turn over. There's a small barrel in the corner of the otherwise dangerous but unimpressive room.",
  figuresSpoken: false,
  withered: true,
  commands: [
      {
      input: "look barrel",
      result: function(){
        if(gameData.items[4].owned === false){
          print("A large wooden barrel sits idly in the corner. The top seems slightly ajar. You wonder if you should try opening it.");
        } else {
          print("There is nothing left here but cobwebs and dust.");
        }
        }
      },
      {
      input: "look dead enemy",
      result: function(){
          print("You look over your defeated foe. Your heart is still beating and sweat is now dripping down your face. You are out of breath and every noise now seems that much more dangerous.");
        }
      },
      {
      input: "look small archway",
      result: function(){
          print("You peek into the archway. Inside is an alter. The alter is the figure of a young girl holding out a bowl. The bowl seems filled with blood.");
        }
      },
      {
      input: "look door leading east",
      result: function(){
        if(gameData.rooms[3].figuresSpoken === false){
            print("You peek through the keyhole. You can hear voices on the other side. Shadowy figures are pacing and speaking in muffled tones. Try using listen.");
        } else {
          print("You hold your ear up to the door but hear nothing. Looking through the keyhole you can make out red carpet, and marble columns.");
        }
        }
      },
      {
      input: "listen",
      result: function(){
          if(gameData.rooms[3].figuresSpoken === false){
          print("The blood will flow Cassius. I am certain. Umbril has spoken to me and given me his sacred charge. The boy in the cellar is subdued and will remain so until you're ready.' Another figure seems to mock the first but it is unintelligable. The first speaks up again: 'Do you dare threaten me Cassius? I won't stand idly by and let our people rot into that figure in the hallway. The blood must flow Cassius, and I will see to it alone if I must.' With that, the figures are gone.");
          gameData.rooms[3].figuresSpoken = true;
          }  else {
              print("You listen hard but hear nothing.");
          }
        }
      },
      {
      input: "open door leading east",
      result: function(){
           currentRoom = gameData.rooms[4];
           print(gameData.rooms[4].description);
        }
      },
  ]
},
{
  name: "Grand Hall",
  look: ["throne", "column", "doors leading outside", "red aisle runner", "alter", "dead crow", "door leading east", 'small door'],
  description: "You slowly peek open the door. On the other side looks to be a throne room. It's much brighter here compared to the other rooms. You quickly extinguish your torch and hide behind one of the many columns that line the room. The ceilings here are tall and even minute sounds echo profoundly. The throne at the end of the room is large, and made of materials you've yet seen. Outside the window, a murder of crows caws ominously, desparate for food. Suddenly, something seems to slam against the large, oak doors that make up the entrance to the throne room. You hide in fear but after some time a crow slams into the window hard enough to break a small hole in the glass, and falls dead to the throne room floor. The slamming on the door continues, picking up speed as more and more birds charge into the door. Soon the orchestra of birds is so loud it consumes you. You glance around hesitantly, waiting for the figures to return. After some time you become sure enough to get a better look around the room.",
  commands:[
      {
      input: "look throne",
      result: function(){
          print("Whoever sat here had considerable power. The fabric and metals seem to echo far away lands. On one of the arm rests is a small scroll.");
          gameData.rooms[4].look.push("scroll");
        }
      },
      {
      input: "look scroll",
      result: function(){
          print("The scroll looks to be the oldest thing you ever seen. Upon opening you see something scrawled in ancient text. You'll need to find a way to decipher this.");
        }
      },
      {
      input: "take scroll",
      result: function(){
          print("You place the scroll delicately in your bag.");
          gameData.player.inventory.push("strange scroll");
          gameData.items[4].owned = true;
        }
      },
      {
      input: "look column",
      result: function(){
          print("Tall marble columns line either side of the red carpet. Looking closer you see the columns look to have had large sections taken out of them. Some small, as if a stray blade sliced the marble. Others seem large, like an explosion had slammed into it.");
        }
      },
      {
      input: "look doors leading outside",
      result: function(){
          print("Birds continue to slam their heads into the door. It sounds as if a hailstorm is raging all around you. The sounds drown out any small noises. Feeling like something might be behind you, you turn around, but there is nothing.");
        }
      },
      {
      input: "look red aisle runner",
      result: function(){
          print("A beautiful red carpet runs central to the room leading down to the throne. The carpet is pockmarked with feathers and blood.");
        }
      },
      {
      input: "look alter",
      result: function(){
          print("A large alter similar to one you'd seen in the hallway. It looks to be a statue of a young angelic girl draped in cloth, and holding out a large basin. Her eyes are covered by the cloth, with only the curling hair falling out. You reach your head into the basin and see that even this one, as large as it is, is filled with blood.");
        }
      },
      {
      input: "look door leading east",
      result: function(){
          print("You peek through the keyhole and see a strange creature lumbering around a large room. In the center of the room looks to be a staircase leading down. The creature is tall, but hunched over, a large, glowing pack strapped to its back. Its arms stretch down to the floor and with every step the shackles on its wrist grind against the stone floor. Its mouth is agape and a blue fluid drips out slowly. Its clothes are tattered rags and whatever hair this creature may have once had has fallen out. It begins to move towards you, its glowing bright blue eyes seem fixated on the key hole. It lets out a long, low howl and tries to pick up its pace. You recoil in fear and hear the large thud of the creature slamming into the doorway.");
        }
      },
      {
      input: "look dead crow",
      result: function(){
          print("You approach the crow slowly. It's head is still arcing slowly from side to side, it's eyes slowly transforming into a bright blue hue. Its feathers are ragged and worn. Its chest, bald from over pruning. The claws, worn down to stumps. What happened to this bird?");
        }
      },
      {
      input: "look small door",
      result: function(){
          print("While looking through the alcoves that line the walls you come across a small, rectangular door with no lock. You crack the door open and peer inside. It seems to be another small library, similar to the first that you found.");
        }
      },
      {
      input: "open small door",
      result: function(){
          currentRoom = gameData.rooms[5];
          print(gameData.rooms[5].description);
        }
      },
    ] //end of commands
},
{
  name: "Thaddius' Shrine",
  look: ["pedestal", "bookshelves", "note", "wall writing","corpse", "sky light", "back to the grand hall"],
  description: "You find yourself in a large library, the walls lined with shelves. In the center of the room you see a bright light shining down upon a wooden pedestal. There seems to be no other lights or windows in the room other than the skylight. You move around the room slowly, scouting out enemies but find none. In the far corner of the room one of the bookshelves had been toppled over leaving a mess of books and loose pages. A corpse lays in a crumpled heap over top the shelf, papers below still drinking the blood oozing out.",
  commands: [
    {
    input: "look pedestal",
    result : function(){
      if(gameData.items[4].owned === true){
      print("The pedestal seems to be made out of living wood. A vine curls along the stand ending in two small leaves basking in the moonlight streaming in from above. On the pedestal sits a dark book bound in a rough, black skin. A strange rune lays in the center of the book, with an unreadable text swirling below it. You reach over and open the book. On the first page you find a key to the strange text laid out in scrawled handwriting by some dutiful notetaker. It seems to be a cipher. The rest of the book is in the old writing you found in the scroll. ");
      } else {
          print("The pedestal seems to be made out of living wood. A vine curls along the stand ending in two small leaves basking in the moonlight streaming in from above. On the pedestal sits a dark book bound in a rough, black skin. A strange rune lays in the center of the book, with a strange text swirling below it. You reach over and open the book. On the first page you find a key to the strange text laid out in scrawled handwriting by some dutiful notetaker. It seems to be a cipher. You wonder what use this book might be.");
          }
    }
   },
   {
     input: "take cipher",
     result: function(){
        gameData.items[5].owned = true;
        gameData.player.inventory.push("cipher");
        print("You gently pick up the book. The text begins to glow a faint blue but subsides. You feel a strange courage welling up within you.");
        }
   },
   {
      input: "look bookshelves",
      result: function(){
        if(gameData.items[5].owned === true){
            print("These books somehow seem older than the other books you've seen thus far. Most are bound in an unfamiliar black leather that warms your hands when you hold them. None of the books seem to have titles on the spine, or on the front. After flipping through a few you find most to only have the first few pages written in, and the rest are blank. You decipher an excerpt from one: 'The demonic influence radiates from the shards. Nothing can contain them. If we are to protect this world from the cults that spring up around where these evil seeds are sown, we must destroy them. Only Rain knows how we'll break this curse.' You close the book.");
        } else {
            print("These books somehow seem older than the other books you've seen thus far. Most are bound in an unfamiliar black leather that warms your hands when you hold them. None of the books seem to have titles on the spine, or on the front. After flipping through a few you find most to only have the first few pages written in, and the rest are blank.");
        }
      }
   },
  {
    input: "look note",
    result: function(){
      print("You find a small note laying on one of the bookshelves. It reads: 'Cassius, I know you tried to follow in the ways of Umbril but ultimately your heritage betrays you. You are the true keeper of the shard and I do not dispute that. You must see the error of your ways. Should we destroy it, we may well have nothing left to fight for. I have sat next to the shard for many nights praying to Umbril for guidance and to lose that would be devistating.'");
    }
  },
   {
    input: "look wall writing",
    result: function(){
       print("The writing on the wall is written in blood. Small drops that have yet to dry are running down to the floor. It reads: 'All is lost without th...' It doesn't seem like the writer had time to finish.");
    }
   },
   {
    input: "look corpse",
    result: function(){
     print("After examining the body you find that the corpse still seems fresh. Its eyes has yet to turn the blueish hue you'd seen in the birds eyes. Its hands are curled violently as if he'd been struggling to hold onto something during his demise. He is dressed in grey and red robes with multiple puncture marks in the chest, and back. It seems like whoever this was, he was assassinated.");
     }
  },
  {
    input: "look sky light",
    result: function(){
      print("Light streams in from a small dome in the ceiling. Standing in the light calms you. You stand for a moment, soaking in the light before realizing that the light is a different color than the light coming from the windows in other rooms. Whatever is making this light, it's inside the building.");
   }
  },
  {
   input: "back to the grand hall",
   result: function(){
     currentRoom = gameData.rooms[4];
     print("You are back in the grand hall. The pounding against the door has yet to cease.");
    }
  },
  ]
}
] //end of rooms
}; //end of gameData
