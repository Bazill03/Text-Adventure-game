$(document).ready(function() {
//sets up dialogue
//todo add armor
//todo add disguise
//todo add conversation
//todo stick play/pause buttons to bottom
//todo convert usefireball and useweapon into single function


  $("#console").fadeIn(1500);

      //Audio start
      //intro sounds
      withered.introSound.play();
      steelMace.sound.play();

      var currentSong = song1;
      //Audio
      setTimeout(function(){song1.play()}, 5000);

      song1.addEventListener("ended", function(){
        currentSong = song2;
        song2.play();
      });

      song2.addEventListener("ended", function(){
        currentSong = song1;
        song1.play();
      });

      //audio controls
      $("#play").click(function(){
        currentSong.play();
      });

      $("#pause").click(function(){
        currentSong.pause();
      });

//player object
  var player = {
    health: 100,
    mana: 100,
    inventory: [],
    travelHistory: [],
    sound: swordAttackSound
  }
  //players equipped weapon
  let playerEquipped = fists;
  let playerArmor = rags;

  var gameData = {
  // item and room objects
  items : [
  //Items

  oldSword = {
    name: "old sword",
    owned: false,
    condition: "Broken and mangled. You should find a replacement soon.",
    findText: "You lift up the broken sword, your mind flashing through the countless battles it must have been through. No doubt this once great weapon has now dilapidated into rust, and decay. What mighty warrior would cast aside a relic? What mighty foe made sure he didn't have a choice?",
    lookText: "You approach the table carefully. You see an old, rusted sword, chipped from years of battle. Any defense at all would help stave off the fear. Try 'take sword'.",
  },

  steelMace = {
    name: "Steel mace",
    owned: false,
    condition: "Candle light glints off of every polished surface. Truely a powerful weapon.",
    findText: "You wrap your fingers around the leather hilt of the mace. Every possible angle seems impossibly polished. Judging by the condition of the weapon you guess that this mace is something someone is very proud of. It was well taken care of.",
    lookText: "You notice from the corner of your eye a text the writer should redo once he knows where this mace is found."
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
        player.inventory.push("torch");
        gameData.items[1].owned = true;
        pickUpNew.play();
        //not sure what this does anymore
        //gameData.rooms[0].splice(0,1);
        }
      },
      {
        input: 'open old door',
        result: function(){
          currentRoom = gameData.rooms[1];
          player.travelHistory.push(currentRoom);
          currentRoom = gameData.rooms[1];
          currentRoom.description()
          moveThroughDoor.play();
          }
        },
    ]

  },//end of strange room
  {
    name: 'Library',
    look: ["shining object", "bookshelves", "window", "door leading south", "back to starting room"],
    description: function(){
      if(gameData.items[1].owned === false){
            print("You arrive in the western corridor. Books line the walls top to bottom, the tomes old and rotten with age. The unmistakeable scent of old books makes the room feel humid and dense. The room is dimly lit by moonlight streaming in from arched windows between the bookcases. Birds flying outside cause shadows to play throughout the room making you feel threatened and small. Every skittering shadow makes you recoil in fear, too afraid to even breathe. You vaguely remember a torch in the north room.");
          } else {
            print("You arrive in the western corridor. Books line the walls top to bottom, the tomes old and rotten with age. The unmistakeable scent of old books makes the room feel humid and dense. The room is dimly lit by moonlight streaming in from arched windows between the bookcases. Birds flying outside cause shadows to play throughout the room, making you feel threatened, but prepared. With the light of your torch, you are able to make out a shining object laying on a table in the center of the room. You hesitantly move closer. Try your 'look' command.");
    }
    },
    commands: [
      {
        input: 'back to starting room',
        result: function(){
          currentRoom = gameData.rooms[0];
          print("You return to the starting room.");
          print(gameData.rooms[0].description);
          moveThroughDoor.play();
        }
      },
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
        result: function(){print("You walk past the rows of books to a southern door. You put your ears up to it but hear nothing but the distant screams you've heard all along. Try 'open door leading south'.")}
      },
      {
        input: "look empty table",
        result: function(){print("You look over the empty table. There seems to be nothing else of value.")}
      },
      {
        input: "open door leading south",
        result: function(){
          if(gameData.items[1].owned === true){
          currentRoom = gameData.rooms[2];
          //player.travelHistory.push(currentRoom);
          print(currentRoom.description());
          moveThroughDoor.play();
          }
        }
      },
      {
        input: "take sword",
        result: function(){
        print("You lift up the broken sword, your mind flashing through the countless battles it must have been through. No doubt this once great weapon has now dilapidated into rust, and decay. What mighty warrior would cast aside a relic? What mighty foe made sure he didn't have a choice?");
        player.inventory.push("old sword");
        gameData.items[0].owned = true;
        gameData.rooms[1].look.shift();
        gameData.rooms[1].look.push("empty table");
        pickUpNew.play();
        }
      }
    ]
  },
  {
    name: "Lounge",
    look: ["end table", "chair", "bookshelves", "door leading east"],
    description: function(){
      print("You open the door and find yourself in a quiet room outfitted with chairs, a small end table, and even more bookshelves. The room seems to be unnaturally dark. Your torch doesn't throw as much light here.")
      },
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
            print("The round end table seems to be made of a dark, polished hardwood. You find an empty oil lantern with busted glass, and a key. You pick up the key for a moment and hold the torch up to it. The notches seem ground down to almost nothing. Try taking it.");
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
        player.inventory.push("skeleton key");
        gameData.items[2].owned = true;
        pickUpNew.play();
        }
      },
      {
        input: "use key on door leading east",
        result: function(){
        gameData.rooms[2].lockedDoor.locked = false;
        print("The key turns easily in the lock. The clicking sound of the lock gives off an unnatural echo in the room.");
        unlockDoor.play();
        }
      },
      {
        input: "open door leading east",
        result: function(){
          if(gameData.rooms[2].lockedDoor.locked === true){
            print("You approach the door and wiggle the handle. Locked.")
          } else {
            currentRoom = gameData.rooms[3];
            combat(player, withered);
            print(gameData.rooms[3].description);
            moveThroughDoor.play();
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
          input: "open barrel",
          result: function(){
            player.inventory.push("Health Potion");
            print("You find a small vial tucked away beneath some grain. You lift it out of the barrel and hold it up to your torch. You watch the glistening red liquid swirl around in the vial momentarily before placing it in your bags.");
            print("Health potion added to inventory. You may use it during combat for 25 health points!");
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
             moveThroughDoor.play();
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
            pickUpNew.play();
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
            moveThroughDoor.play();
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
          pickUpNew.play();
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
       moveThroughDoor.play();
       currentRoom = gameData.rooms[4];
       print("You are back in the grand hall. The pounding against the door has yet to cease.");
      }
    },
    ]
  }
] //end of rooms
}; //end of gameData

  //places the player in the starting room.
  var currentRoom = gameData.rooms[0];


  //functions
  //prints out items to be looked at
  function printLook(room) {
      print("You glance around the room finding: ");
      print(currentRoom.look);
  }

 function attachListeners(){
    //  Event listeners
  document.getElementById('useWeapon').addEventListener("click", useWeapon, false);
  document.getElementById('useFireball').addEventListener("click", useFireball, false);
  document.getElementById('backToGame').addEventListener("click", backToGame, false);
 }

  //prints out input to screen
  function print(input) {
    $("<p class='text-center'>" + input + "</p>").insertBefore("#placeholder").fadeIn(1000);
          //reset textbox
      $("#commandline").val("");
  }
  attachListeners();

  $("#commandline").keypress(function(e) {
    if (e.keyCode === 13) {
      var input = $("#commandline").val().toLowerCase();
      var roomCmd = currentRoom.commands;
      if(input=="fight"){
        combat(player,withered);
      }
      //prints out current room
      if(input=="room"){
        print(currentRoom.name);
        console.log(currentRoom.name);
      }
      //prints out user inventory
      if(input == "inventory"){
        if(player.inventory < 1){
          print("You have nothing.");
        } else {
          print("You rifle through your bags finding: ");
          print(player.inventory);
        }
      }
      if(input == "use cipher on scroll" && gameData.items[5].owned === true && gameData.items[4].owned === true){
        print("You open up the cipher, and begin work on the scroll. After some time you work out the message. It reads: 'Thaddius on the ways of man: We must follow in the footsteps of Rain and follow his three rules, which are as follows. One: Do not succumb to the powers of idols. This serves only to cause war. Two: Do not war against another man. This serves only to empower Umbril and his creatures. Three: Do not give into the influences Umbril. This serves only to end mankind.' ")
        return;
      }
      //prints out look items in room
      if(input.match(/look$/)){
        printLook(currentRoom.look);
      }

      //formats the command
      var input_words = input.split(/\s+/) // ["open", "old", "door"]
      var command = input_words[0] // "open"
      var noun = input_words.slice(1).join(" ") // "old door"

      //prints out look descriptions
      if(input.match(/look\s+/) || /open\s+/ || /take\s+/ || /use\s+/){
        for (var i = 0; i < roomCmd.length; i++) {
          if (input === roomCmd[i].input) {
            roomCmd[i].result();
          }
        }
      }

      //checking what weapon is equipped
      if(input == "equipped"){
        print("You have " + playerEquipped.name + " equipped." + " It deals up do " + playerEquipped.stats + " damage. And has a damage type of " + playerEquipped.damageType + ".");
        print(playerArmor.description + " You take " + playerArmor.stats + " less damage.");
      }

      //conversation testing
      if(input == "convo"){
        $('#console').fadeOut(1500);
        $(".conversationMenu").fadeIn(1500);
        $(".conversation").fadeIn(1500);
        //conversation with gnu
        $("body").addClass("forrest-bg");
        Dialogue.load("gnu", "dialogue_files/gnu.txt");
        console.log(Dialogue.interact("gnu", "player", 2));
      }

      //equipping weapons
      if(input == "equip old sword" && oldSword.owned === true){
          print("You fasten the old sheath to your belt and gently place the rusted blade inside.");
          playerEquipped = oldSword;
        } else if(input == "equip old sword" && oldSword.owned === false) {
            print("You do not own the weapon 'old sword'");
          }

      if(input == "equip steel mace" && steelMace.owned === true){
          print("You hold the mace tightly, ready to attack whatever growls in the dark.");
          playerEquipped = steelMace;
      } else if(input == "equip steel mace" && steelMace.owned === false) {
          print("You do not own the weapon 'steel mace'");
        }


      //player help
      if(input === "help"){
        print("Commands to consider: look, open, take, use, consider, equip, equipped, inventory, use * on *, and room.");
      }


      //consider commands
      if (input == "consider sword" && gameData.items[0].owned === true) {
        print(gameData.items[0].condition);
      } else if (input == "consider torch" && gameData.items[1].owned === true) {
        print(gameData.items[1].condition);
      } else if (input == "consider key" && gameData.items[2].owned === true) {
        print(gameData.items[2].condition);
      } else if (input == "consider potion" && gameData.items[3].owned === true){
        print(gameData.items[3].condition);
      } else if (input == "consider scroll" && gameData.items[4].owned === true){
        print(gameData.items[4].condition);
      } else if (input == "consider cipher" && gameData.items[5].owned === true){
        print(gameData.items[5].condition);
      }
      //reset textbox
      $("#commandline").val("");
    }
  });

    //COMBAT HERE
    //player damage before being rounded down
    let playerDamage;
    //player damage after being rounded down
    let playerRealDamage;
    //stores random number deciding what move the enemy is using
    let enemyMove;
    //enemy damage
    let enemyDamage;
    //enemy player is currently fighting
    let enemy;
    //checks to see if the enemy has already attacked. Player goes first.
    let hasAttacked = true;
    //prints out combat to combat div
    function combatPrint(input) {
      $(".combatOutput")
        .append("<p class='text-center'>" + input + "</p>");
      //reset textbox
      $("#commandline").val("");
    }
    //  Combat section
    //checks if the game is over by comparing health
    function gameOverCheck() {
      if (player.health <= 0) {
        combatPrint("You lose. Refresh to try again.");
        return true;
      } else if (enemy.health <= 0) {
        combatPrint("You've defeated the " + enemy.name + ".");
        $("#backToGame").fadeIn(1000);
        battleVictory.play();
        enemy.death.play();
        return true;
      }
      return false;
    }

    //returns the player to the main game
    function backToGame(){
      $('#console').fadeIn(1500);
      $(".combatMenu").fadeOut(1500);
      $(".combat").fadeOut(1500);
      battleMusic.pause();
      battleMusic.currentTime = 0;
      currentSong.play();
    }

    //takes in the maxmum and minimum damage a given move can inflict and returns a random value between those ranges.
    function calcDamage(max, min) {
      return Math.random() * (max - min) + min;
    }

    //finds the number of moves the current enemy can perform and calculates a random number to decide which move is performed.
    function calcEnemyMove(name) {
      var howMany = name.moveNum;
      return Math.floor(calcDamage(howMany + 1, 1)) - 1;
    }

    //changes the height of the player and enemy health and mana bars.
    function calcHealthBars(who, howMuch) {
      document.getElementById(who).style.height = howMuch * 2 + "px";
    }

    //checks enemy object vulnerability and compares it to the current damage type the player is performing.
    function checkForDamageType(damageTypeAttacking, enemyDamageType) {
      if (damageTypeAttacking.damageType === enemyDamageType.vulnerability[0]) {
        return enemyDamageType.vulnerability[1];
      }
    }

    //loops through player inventory for any given value and returns a boolean.
    function inventorySearch(input) {
      for (var i = 0; i < player.inventory.length + 1; i++) {
        if (player.inventory[i] === input) {
          return true;
        } else {
          return false;
        }
      }
    }

    function enemyTurn() {
      if(gameOverCheck() === false){
        enemyMove = calcEnemyMove(enemy);
        enemyDamage = calcDamage(enemy.moves[enemyMove][1], 1);
        var enemyRealDamage = Math.floor(enemyDamage) - playerArmor.stats;
        player.health = player.health - enemyRealDamage;
        combatPrint(
          enemy.name +
          " attacks you with " +
          enemy.moves[enemyMove][0] +
          " for " +
          enemyRealDamage +
          "!"
      );
        calcHealthBars("playerHealth", player.health);
        witheredAttackSound.play();
        hasAttacked = true;
      }
    }

    function useWeapon() {
      if (hasAttacked === false) {
        return combatPrint("You are still recovering from your attack.");
      }
      if (
        gameOverCheck() === false &&
        hasAttacked === true
      ) {
        playerDamage = calcDamage(playerEquipped.stats, 1);
        playerRealDamage = Math.floor(playerDamage);
        enemy.health = enemy.health - playerRealDamage;
        combatPrint(
          "You attack " +
            enemy.name +
            " with your " +
            playerEquipped.name +
            " for " +
            playerRealDamage
        );
        calcHealthBars("enemyHealth", enemy.health);
        playerEquipped.sound.play();
        setTimeout(enemyTurn, 1000);
        hasAttacked = false;
      } else {
        combatPrint("The game is over.");
      }
    }
    function useFireball() {
      if (hasAttacked === false) {
        return combatPrint("You are still recovering from your attack.");
      }
      if (
        gameOverCheck() === false &&
        hasAttacked === true &&
        player.mana >= 25
      ) {
        playerDamage = calcDamage(fireBall.stats, 1);
        playerRealDamage = Math.floor(playerDamage);
        enemy.health = enemy.health - playerRealDamage;
        player.mana = player.mana - fireBall.manaCost;
        combatPrint(
          "You sling a flaming ball at " + enemy.name + " for " + playerRealDamage
        );
        if (checkForDamageType(fireBall, enemy) > 0) {
          combatPrint(
            "Fireball deals an extra " + enemy.vulnerability[1] + " damage"
          );
          enemy.health = enemy.health - enemy.vulnerability[1];
        }
        calcHealthBars("enemyHealth", enemy.health);
        calcHealthBars("playerMana", player.mana);
        fireBall.sound.play();
        setTimeout(enemyTurn, 1000);
        hasAttacked = false;
      } else {
        combatPrint("You do not have enough mana");
      }
    }

    function useHealthPot() {
      if (hasAttacked === false) {
        return combatPrint("You are still recovering from your attack.");
      }
      if (healthPot.owned > 0) {
        player.health = player.health + healthPot.stats;
        healthPot.owned = healthPot.owned - 1;
        combatPrint("You use a health potion. You feel invigorated!");
        healthPot.sound.play();
        calcHealthBars("playerHealth", player.health);
        setTimeout(enemyTurn, 1000);
        hasAttacked = false;
      } else {
        combatPrint("You do not have a health potion");
      }
    }

    //combat function
    function combat(player, enemyFighting) {
      $('#console').fadeOut(1500);
      $(".combatMenu").fadeIn(1500);
      $(".combat").fadeIn(1500);
      enemy = enemyFighting;
      combatPrint(enemy.greeting);
      if (enemy.attackFirst === true) {
        enemyTurn();
      }
      currentSong.pause();
      enemy.introSound.play();
      battleMusic.play();
      document.getElementById("enemyHealth").style.height = enemy.health + "px";
    }
    //COMBAT END
});
