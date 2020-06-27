$(document).ready(function() {

  //move this elsewhere later.
  var makeStrong = document.createElement("STRONG");

  var input = $("#commandline").val().toLowerCase();
  $("#console").fadeIn(1500);

  //Audio start
  //intro sounds
  withered.introSound.play();
  setTimeout(function() {
    shardKeeper.introSound.play();
  }, 2000);
  steelMace.sound.play();

  var currentSong = song1;
  //Audio
  setTimeout(function() {
    song1.play();
  }, 2000);

  function loopOneSong(song){
    currentSong.pause();
    currentSong = song;
    currentSong.play();
    currentSong.addEventListener("ended", function() {
      currentSong.play();
    });
  }

  //audio controls
  $("#play").click(function() {
    currentSong.play();
  });
  $("#pause").click(function() {
    currentSong.pause();
  });

  //starting equipment
  player = Object.assign(player, rags);
  player = Object.assign(player, fists);


  //player Stats //wow do I feel like this could be done better.
  function refreshPlayerStats() {
    $("#playerHealthDisplay").html('');
    $("#playerManaDisplay").html('');
    $("#playerStrengthDisplay").html('');
    $("#playerAgilityDisplay").html('');
    $("#playerIntDisplay").html('');
    $("#playerCharismaDisplay").html('');
    $("#playerXPDisplay").html('');
    $("#playerLevelDisplay").html('');
    $("#playerHealthPotDisplay").html('');
    $("#playerManaPotDisplay").html('');
    $("#playerHealthDisplay").append(player.health);
    $("#playerManaDisplay").append(player.mana);
    $("#playerStrengthDisplay").append(player.strength);
    $("#playerAgilityDisplay").append(player.agility);
    $("#playerIntDisplay").append(player.intelligence);
    $("#playerCharismaDisplay").append(player.charisma);
    $("#playerXPDisplay").append(player.xp);
    $("#playerLevelDisplay").append(player.level);
    $("#playerHealthPotDisplay").append(player.healthPotNum);
    $("#playerManaPotDisplay").append(player.manaPotNum);
  }

  function refreshPlayerGold(){
    //players gold count
    $("#playerGoldDisplay").html('');
    $("#playerGoldDisplay").append(player.gold);
  }

  function updateInvDisplay(item) {
    $("#playerInventoryDisplay").append(item);
    $("#playerInventoryDisplay").append(document.createElement("br"));
  }

  refreshPlayerStats(); //intitializes players stat display.

function startGame(){
  loopOneSong(tavernSounds);
  document.getElementById('startGame').disabled = true;
  document.getElementById('startGame').classList.add("disabled_button");
  print("You find yourself in a bustling tavern. Surrounded by loved ones and acquaintances. Before you, on the beaten mahogany bar top, a dark ale's froth is just dying down.");
  print("Next to you is your best friend, Sawyer. A bumbling but kind man, warm from alcohol and good times. He's been rambling about the benefits of fish oil for what seems like ages. This is your second drink of the night and you're growing antsy.");
  print("You turn to Sawyer, interrupting his presentation of his ever clearing complexion.");
  print("'Tell me Sawyer, before I die, will this conversation end?'", "agiColor");
  print("Sawyer looks at you dejectedly. Then nods towards your drink.");
  print("Maybe you could use a bit more of that in ya? Make ya a bit more agreeable for the night?", "manaColor");
  print("You quietly agree and take a solemn drink.");
  print("So, maybe you're up to somethin' fun tonight? Maybe somethin' a little dangerous?","agiColor");
  Dialogue.load("Sawyer", "dialogue_files/sawyer1.txt");
  var name = document.createElement("BUTTON");   // Create a <button> element
  name.innerHTML = "Speak"; //Gives the button text
  name.classList.add("dialogue_button"); //Gives the button the dialogue_button CSS style
  $(name).insertBefore("#placeholder"); //Places the button in the text stream
  name.addEventListener("click", function(){
    conversation("Sawyer", "player_1");
    name.disabled = true;
    name.classList.add("disabled_button");
    print("--------------------");
    print("As you and Sawyer are arguing a strange man approaches. Drooped eyes and crooked nose dominate his face. Ragged cloth and patinated brass piercings draw your mind into the imagineings of a life lived very roughly.");
    print("The man drops heavily onto the stool next to you and Sawyer as you stand transfixed.");
    print("The man glances at you for a moment, ice blue eyes shimmering errily in the low light of the tavern before turning to the bartender and ordering a lager in a gruff, low voice.");
    print("The three of you sit silent for some time as the tender drafts the lager.");
    print("After some time, Sawyer leans in close, as if to whisper into your ear but the heavyset man intervenes.");
    print("Either of you lads got fortitude?","healthColor");
    print("'Fortitude?', Sawyer stammers out. 'Sure, my pal and I were just about to venture to the woods, cause some trouble with that cult there.'","manaColor");
    print("'Good, thas just what I needed ya for. Come with me', the man replied before downing his drink in an impressive display and beginning to stand.", "healthColor");
    print("We got a long night ahead of us. Take a good look around before ya leave. Don't want you missin' anything.","healthColor");
    print("Saywer rolls his eyes at the intensity of the mans words");
    print("'Alright old man, we're comin.","manaColor");
    print("This is a good time to try out the look command. Try typing 'look' into the text box. You may also type something like 'look bartop' to get a description. Whenever you're ready to leave type 'leave bar'", "intColor");
  })
  
}

  var gameData = {
    //room objects
    rooms: [
      {
        name: "tavern", //0
        look: ['bartop','Sawyer','Bartender',"stool"],
        commands: [{
          input: 'look bartop',
          result: function(){
            print("An old mahogany bartop, supposedly crafted by one of Sawyers great grandfathers many years ago. Its coloring is uneven from decades of slammed drinks and constant washing.");
          }
          },
          {
          input: "look sawyer",
          result: function(){
            print("Your best friend. Goofy, curly blonde hair that's only washed when he swims in the local pond and a devilish grin that tells you he's up to no good.");
          }
          },
          {
          input: "look bartender",
          result: function(){
            print("A timid old man, who doesn't want any trouble. He's been a staple in your villiage for decades.");
          }
          },
          {
          input: "look stool",
          result: function(){
            print("A fairly unremarkable stool, but for some reason it's always available for you when you visit the tavern.");
          }
          }
      ]
      },
      {
        name: 'strange room', //1
        look: ['old door, torch'],
        description: "You are back in the strange room.",
        commands: [{
            input: 'look old door',
            result: function() {
              print("A large oak door lays before you. The screams still echoing around you, you lean closer trying to hear what may be on the other side. Ear glued to the door, your hand reaches down to grasp the latch. The door opens freely. Try typing 'open old door' to find out whats on the other side.");
            }
          },
          {
            input: 'look torch',
            result: function() {
              print("The torch lays lifeless on the ground.");
            }
          },
          {
            input: 'take torch',
            result: function() {
              if (torch.owned == false) {
                print("Looking closer at the torch you find a flint and steel placed nearby, as if by a delicate hand. The hair on the back of your head stands up. You light the torch and the room blooms with light. Taking another look, you find that you're in a small, windowless room with one door on the western side. Try typing 'Look old door' to look closer. Or, try 'consider torch' to look at it.");
                player.inventory.push("torch");
                torch.owned = true;
                updateInvDisplay("torch");
                pickUpNew.play();
              } else(print("You've already picked up the torch."));
            }
          },
          {
            input: 'open old door',
            result: function() {
              currentRoom = gameData.rooms[1];
              player.travelHistory.push(currentRoom);
              currentRoom = gameData.rooms[1];
              currentRoom.description();
              moveThroughDoor.play();
            }
          },
        ]

      }, //end of strange room
      {
        name: 'Library', //1
        look: ["shining object", "bookshelves", "window", "door leading south", "back to starting room"],
        description: function() {
          if (torch.owned === false) {
            print("You arrive in the western corridor. Books line the walls top to bottom, the tomes old and rotten with age. The unmistakeable scent of old books makes the room feel humid and dense. The room is dimly lit by moonlight streaming in from arched windows between the bookcases. Birds flying outside cause shadows to play throughout the room making you feel threatened and small. Every skittering shadow makes you recoil in fear, too afraid to even breathe. You vaguely remember a torch in the north room. A strange man approaches you.");
            print("'Go back, get the torch.' the robed figure croaks.", "manaColor");
          } else {
            print("You arrive in the western corridor. Books line the walls top to bottom, the tomes old and rotten with age. The unmistakeable scent of old books makes the room feel humid and dense. The room is dimly lit by moonlight streaming in from arched windows between the bookcases. Birds flying outside cause shadows to play throughout the room, making you feel threatened, but prepared. With the light of your torch, you are able to make out a shining object laying on a table in the center of the room. You hesitantly move closer. Try your 'look' command.");
            print("'I see you've made it out alive. Hope that torch comes in handy.'", "manaColor");
            print("The robed figure slowly gestures over to a sword laying on a table.");
            print("'You might need that.", "manaColor");
            dialogueButton("Here is some extremely long text in order to test out how this button will handle being very very large. I hope this is big enough I can definitely see characters in the game having reponses that are quite large. Don't want everything to look all weird should the occasion arrise when text gets very very long such as now where I have indeed typed many words and my word processor must work extra hard in order to be able to process such many various words. Okay, that's good enough.","Go", "roomZeroDialogueButton");
          }
        },
        commands: [{
            input: 'back to starting room',
            result: function() {
              currentRoom = gameData.rooms[0];
              print("You return to the starting room.");
              print(gameData.rooms[0].description);
              moveThroughDoor.play();
            }
          },
          {
            input: 'look window',
            result: function() {
              print("You poke your head out the window. Crows soar around your head, desperate for a meal. You find yourself fighting them off, unable to get a good look outside.");
            }
          },
          {
            input: 'look shining object',
            result: function() {
              print("You approach the table carefully. You see an old, rusted sword, chipped from years of battle. Any defense at all would help stave off the fear. Try 'take sword'.");
            }
          },
          {
            input: 'look bookshelves',
            result: function() {
              print("You browse the tomes along the walls. The leatherbound books seem to be so old that you no longer recongnize the language.");
            }
          },
          {
            input: "look door leading south",
            result: function() {
              print("You walk past the rows of books to a southern door. You put your ears up to it but hear nothing but the distant screams you've heard all along. Try 'open door leading south'.");
            }
          },
          {
            input: "look empty table",
            result: function() {
              print("You look over the empty table. There seems to be nothing else of value.");
            }
          },
          {
            input: "open door leading south",
            result: function() {
              if (torch.owned === true) {
                currentRoom = gameData.rooms[2];
                //player.travelHistory.push(currentRoom);
                print(currentRoom.description());
                moveThroughDoor.play();
              }
            }
          },
          {
            input: "take sword",
            result: function() {
              if (oldSword.owned == false) {
                print("You lift up the broken sword, your mind flashing through the countless battles it must have been through. No doubt this once great weapon has now dilapidated into rust, and decay. You pull your shirt over your hand and use your palm to scrape away some of the rust before holding it up to the light. Your fear dissapates slightly. Try typing 'equip old sword'");
                player.inventory.push("old sword");
                updateInvDisplay("old sword");
                oldSword.owned = true;
                gameData.rooms[1].look.shift();
                gameData.rooms[1].look.push("empty table");
                pickUpNew.play();
              } else(print("You've already taken the old sword."));
            }
          }
        ]
      },
      {
        name: "Assassistants Office", //2
        look: ["end table", "chair", "bookshelves", "messy desk", "door leading west"],
        description: function() {
          print("You open the door and find yourself in a quiet room outfitted with chairs, a small end table, and even more bookshelves. The room seems to be unnaturally dark. Your torch doesn't throw as much light here.");
        },
        lockedDoor: {
          locked: true
        },
        commands: [{
            input: "look chair",
            result: function() {
              print("A large velvet chair sits before you. The deep red hue of the chair reminds you of blood. You consider sitting in it for a moment but a dark force makes you consider otherwise");
            }
          },
          {
            input: "look messy desk",
            result: function() {
              print("You look over the large desk. Stacks of old parchment dominate either end of the desk. The center is strangely clean with only one piece of paper folded neatly in half. It reads: To whomever finds this, these are my final words. 'use look' ");
              gameData.rooms[2].look.push("old note");
            }
          },
          {
            input: "look old note",
            result: function() {
              print("I can feel myself changing. Fifty years I gave this Kingdom, and fifty years I toiled over the Kings wishes. I gave him advice when he was unsure. I gave him stability in his times of distress. I did his day-to-days. I gave Generals marching orders. I was important. Now these cultists have come. The coup succeeded. They brought their wretched gems and crystals and lay close to them at night. I am not near them, but I can feel them. They whisper to me. In my dreams I see a dark cloud gathering over the hills. Soon the cloud erupts into a million blue eyed ravens who tear into me. Over and over I have suffered these nightmares. I am weak now. Too weak to go on. My skin has shrivled and my mind races with canabalistic thoughts. I feel I do not have much longer before I become deranged. Whoever finds this, I pray the Goddess of Light watches over you.");
              print("You set the note down, unsure of what to make of it. You can hear a growling behind the door at the far end of the room. Something is in there.");
            }
          },
          {
            input: "look end table",
            result: function() {
              if (skeleKey.owned === false) {
                print("The round end table seems to be made of a dark, polished hardwood. You find an empty oil lantern with busted glass, and a key. You pick up the key for a moment and hold the torch up to it. The notches seem ground down to almost nothing. Try taking it.");
              } else {
                print("There's an indent in the wood the shape of the key. As if the key had been slowly burning it's way through the table. The key seems cool to the touch.");
              }
            }
          },
          {
            input: "look bookshelves",
            result: function() {
              print("You browse the tomes along the walls, your torch barely putting forth enough light to make out the titles on the spines. Most are in a language that seems foreign to you. The letters glow a faint blue.");
            }
          },
          {
            input: "look door leading west",
            result: function() {
              if (gameData.rooms[2].lockedDoor.locked === true) {
                print("You approach the door and try to open it. Locked. Glancing through the keyhole you see only darkness.");
              } else {
                print("You look through the keyhole. You see only darkness.");
              }
            }
          },
          {
            input: "take key",
            result: function() {
              if (skeleKey.owned == false) {
                print("You gently pick the key up off the table. The rusted key leaving flakes of dark green copper on the end table. Looking closer you see the that the notches are worn down to almost nothing. You wonder for a moment what use this key might be. (Try using the key on something.)");
                player.inventory.push("skeleton key");
                updateInvDisplay("key");
                skeleKey.owned = true;
                pickUpNew.play();
              } else(print("You've already taken the key."));
            }
          },
          {
            input: "use key on door leading west",
            result: function() {
              gameData.rooms[2].lockedDoor.locked = false;
              print("The key turns easily in the lock. The clicking sound of the lock gives off an unnatural echo in the room.");
              unlockDoor.play();
            }
          },
          {
            input: "open door leading west",
            result: function() {
              if (gameData.rooms[2].lockedDoor.locked === true) {
                print("You approach the door and wiggle the handle. Locked.");
              } else {
                currentRoom = gameData.rooms[3];
                combat(player, hallwayWithered);
                print(gameData.rooms[3].description);
                moveThroughDoor.play();
              }

            }
          }
        ]
      },
      {
        name: "small hallway", //3
        look: ['barrel, dead enemy, small archway, door leading west'],
        description: "You are in a small hallway. Your torch seems to emit even less light here. The smell of rotting flesh tingles your nose and makes your stomach turn over. There's a small barrel in the corner of the otherwise dangerous but unimpressive room.",
        figuresSpoken: false,
        withered: true,
        commands: [{
            input: "look barrel",
            result: function() {
              if (smallHallwayBarrel.opened == false) {
                print("A large wooden barrel sits idly in the corner. The top seems slightly ajar. You wonder if you should try opening it.");
              } else {
                print("There is nothing left here but cobwebs and dust.");
              }
            }
          },
          {
            input: "open barrel",
            result: function() {
              if(smallHallwayBarrel.opened === false){
              player.healthPotNum = player.healthPotNum = 1;
              print("You find a small vial tucked away beneath some grain. You lift it out of the barrel and hold it up to your torch. You watch the glistening red liquid swirl around in the vial momentarily before placing it in your bags.");
              print("Health potion added to inventory. You may use it during combat for 25 health points!");
              refreshPlayerStats();
              smallHallwayBarrel.opened = true;
            } else  {print("There is nothing left here but cobwebs and dust.");}
            }
          },
          {
            input: "look dead enemy",
            result: function() {
              print("You look over your defeated foe. Your heart is still beating and sweat is now dripping down your face. You are out of breath and every noise now seems that much more dangerous.");
            }
          },
          {
            input: "look small archway",
            result: function() {
              print("You peek into the archway. Inside is an alter. The alter is the figure of a young girl holding out a bowl. The bowl seems filled with blood.");
            }
          },
          {
            input: "look door leading west",
            result: function() {
              if (gameData.rooms[3].figuresSpoken === false) {
                print("You peek through the keyhole. You can hear voices on the other side. Shadowy figures are pacing and speaking in muffled tones. Try using listen.");
              } else {
                print("You hold your ear up to the door but hear nothing. Looking through the keyhole you can make out red carpet, and marble columns.");
              }
            }
          },
          {
            input: "listen",
            result: function() {
              if (gameData.rooms[3].figuresSpoken === false) {
                print("The blood will flow Cassius. I am certain. Umbril has spoken to me and given me his sacred charge. The boy in the cellar is subdued and will remain so until you're ready.' Another figure seems to mock the first but it is unintelligable. The first speaks up again: 'Do you dare threaten me Cassius? I won't stand idly by and let our people rot into that figure in the hallway. The blood must flow Cassius, and I will see to it alone if I must.' With that, the figures are gone.");
                gameData.rooms[3].figuresSpoken = true;
              } else {
                print("You listen hard but hear nothing.");
              }
            }
          },
          {
            input: "open door leading west",
            result: function() {
              if (gameData.rooms[3].figuresSpoken === true) {
                moveThroughDoor.play();
                currentRoom = gameData.rooms[4];
                print(gameData.rooms[4].description);
              } else {
                print("You can hear some figures speaking outside. Try 'listen' ");
              }
            }
          },
        ]
      },
      {
        name: "Grand Hall", //4
        look: ["throne", "column", "doors leading outside", "red aisle runner", "alter", "dead crow", "door leading west", 'stairs leading north', 'small door', 'door leading north'],
        description: "You slowly peek open the door. On the other side looks to be a throne room. It's much brighter here compared to the other rooms. You quickly extinguish your torch and hide behind one of the many columns that line the room. The ceilings here are tall and even minute sounds echo profoundly. The throne at the end of the room is large, and made of materials you've yet seen. Outside the window, a murder of crows caws ominously, desparate for food. Suddenly, something seems to slam against the large, oak doors that make up the entrance to the throne room. You hide in fear but after some time a crow slams into the window hard enough to break a small hole in the glass, and falls dead to the throne room floor. The slamming on the door continues, picking up speed as more and more birds charge into the door. Soon the orchestra of birds is so loud it consumes you. You glance around hesitantly, waiting for the figures to return. After some time you become sure enough to get a better look around the room.",
        commands: [{
            input: "look throne",
            result: function() {
              print("Whoever sat here had considerable power. The fabric and metals seem to echo far away lands. On one of the arm rests is a small scroll.");
              gameData.rooms[4].look.push("scroll");
            }
          },
          {
            input: "use key on door leading north",
            result: function(){
              if(butlersKey.owned == true && butlersDoor.locked == true){
                  unlockDoor.play();
                  print("The key glides smoothly through the lock. The door is open.");
                  butlersDoor.locked = false;
              } else if(butlersKey.owned == true && butlersDoor.locked == false){
                  print("The door is already unlocked.");
              } else {
                  print("You do not have the correct key.");
              }
            }
          },
          {
            input: "open door leading north",
            result: function(){
              if(butlersDoor.locked == false){
                moveThroughDoor.play();
                currentRoom = gameData.rooms[8];
                print(gameData.rooms[8].description);
              }
            }
          },
          {
            input: "look scroll",
            result: function() {
              print("The scroll looks to be the oldest thing you ever seen. Upon opening you see something scrawled in ancient text. You'll need to find a way to decipher this.");
            }
          },
          {
            input: "take scroll",
            result: function() {
              if (throneScroll.owned == false) {
                print("You place the scroll delicately in your bag.");
                pickUpNew.play();
                updateInvDisplay("scroll");
                player.inventory.push("strange scroll");
                throneScroll.owned = true;
              } else(print("You've already taken the scroll."));
            }
          },
          {
            input: "look column",
            result: function() {
              print("Tall marble columns line either side of the red carpet. Looking closer you see the columns look to have had large sections taken out of them. Some small, as if a stray blade sliced the marble. Others seem large, like an explosion had slammed into it.");
            }
          },
          {
            input: "look doors leading outside",
            result: function() {
              print("Birds continue to slam their heads into the door. It sounds as if a hailstorm is raging all around you. The sounds drown out any small noises. Feeling like something might be behind you, you turn around, but there is nothing.");
            }
          },
          {
            input: "look red aisle runner",
            result: function() {
              print("A beautiful red carpet runs central to the room leading down to the throne. The carpet is pockmarked with feathers and blood.");
            }
          },
          {
            input: "look alter",
            result: function() {
              print("A large alter similar to one you'd seen in the hallway. It looks to be a statue of a young angelic girl draped in cloth, and holding out a large basin. Her eyes are covered by the cloth, with only the curling hair falling out. You reach your head into the basin and see that even this one, as large as it is, is filled with blood.");
            }
          },
          {
            input: "look door leading west",
            result: function() {
              print("You peek through the keyhole and see a strange creature lumbering around a large room. In the center of the room looks to be a staircase leading down. The creature is tall, but hunched over, a large, glowing pack strapped to its back. Its arms stretch down to the floor and with every step the shackles on its wrist grind against the stone floor. Its mouth is agape and a blue fluid drips out slowly. Its clothes are tattered rags and whatever hair this creature may have once had has fallen out. It begins to move towards you, its glowing bright blue eyes seem fixated on the key hole. It lets out a long, low howl and tries to pick up its pace. You recoil in fear and hear the large thud of the creature slamming into the doorway.");
              shardKeeper.introSound.play();
              print("Are you sure you want to enter? Use: open door leading west");
            }
          },
          {
            input: "look stairs leading north",
            result: function() {
              print("A grand marble staircase extends upwards from behind the throne. The granite walls are speckled with torches giving way to darkness as the stairs furl upwards inevitablly meeting in the middle, somewhere above.");
            }
          },
          {
            input: "look dead crow",
            result: function() {
              print("You approach the crow slowly. It's head is still arcing slowly from side to side, it's eyes slowly transforming into a bright blue hue. Its feathers are ragged and worn. Its chest, bald from over pruning. The claws, worn down to stumps. What happened to this bird?");
            }
          },
          {
            input: "look small door",
            result: function() {
              print("While looking through the alcoves that line the walls you come across a small, rectangular door with no lock. You crack the door open and peer inside. It seems to be another small library, similar to the first that you found.");
            }
          },
          {
            input: "open small door",
            result: function() {
              moveThroughDoor.play();
              currentRoom = gameData.rooms[5];
              gameData.rooms[5].description();
            }
          },
          {
            input: "climb stairs leading north",
            result: function() {
              moveThroughStairs.play();
              currentRoom = gameData.rooms[6];
              gameData.rooms[6].description();
              console.log(Dialogue.dialogues);
            }
          },
          {
            input: "open door leading west",
            result: function() {
              moveThroughDoor.play();
              currentRoom = gameData.rooms[7];
              gameData.rooms[7].description();
            }
          },
          {
            input: "speak",
            result: function() {
              if (playerArmor == cultistRobe) {
                conversation("Unknown Brother", "player");
              }
            }
          },
        ] //end of commands
      },
      {
        name: "Thaddius' Shrine", //5
        look: ["pedestal", "bookshelves", "note", "wall writing", "corpse", "sky light", "smouldering scroll", "back to the grand hall"],
        description: function() {
          if (shrine_withered.is_alive == true) {
            print("You find yourself in a small library, the walls lined with shelves. In the center of the room you see a bright light shining down upon a wooden pedestal. There seems to be no other lights or windows in the room other than the skylight. In the far corner of the room one of the bookshelves had been toppled over leaving a mess of books and loose pages. A corpse lays in a crumpled heap over top the shelf, papers below still drinking the blood oozing out. Above the corpse stands a withered, breathing heavily. Its chest growing and shrinking as it shovles in the air. The withered turns its head to see you, glowing blue eyes and grey emaciated jaw dripping with blood. In the stillness before battle, while both combatants process each other, you watch a single drop fall from its face to join the pool below. Your hand moves naturally to the sword on your belt. You draw your blade as it charges.");
          } else {
            print("You find yourself in a small library, the walls lined with shelves. In the center of the room you see a bright light shining down upon a wooden pedestal. There seems to be no other lights or windows in the room other than the skylight. In the far corner of the room one of the bookshelves had been toppled over leaving a mess of books and loose pages. A corpse lays in a crumpled heap over top the shelf, papers below still drinking the blood oozing out.");
          }
        },
        commands: [{
          input: "look pedestal",
          result: function() {
            if (cipher.owned === true) {
              print("The pedestal seems to be made out of living wood. A vine curls along the stand ending in two small leaves basking in the moonlight streaming in from above. On the pedestal sits a dark book bound in a rough, black skin. A strange rune lays in the center of the book, with an unreadable text swirling below it. You reach over and open the book. On the first page you find a key to the strange text laid out in scrawled handwriting by some dutiful notetaker. It seems to be a cipher. The rest of the book is in the old writing you found in the scroll. ");
            } else {
              print("The pedestal seems to be made out of living wood. A vine curls along the stand ending in two small leaves basking in the moonlight streaming in from above. On the pedestal sits a dark book bound in a rough, black skin. A strange rune lays in the center of the book, with a strange text swirling below it. You reach over and open the book. On the first page you find a key to the strange text laid out in scrawled handwriting by some dutiful notetaker. It seems to be a cipher. You wonder what use this book might be.");
            }
          }
          },
          {
            input: "fight",
            result: function() {
              if (shrine_withered.is_alive == true) {
                combat(player, shrine_withered);
                shrine_withered.is_alive = false;
              } else {
                print("There is nothing to fight.");
              }
            }
          },
          {
            input: "take cipher",
            result: function() {
              if (cipher.owned == false) {
                cipher.owned = true;
                player.inventory.push("cipher");
                updateInvDisplay("Cipher");
                pickUpNew.play();
                print("You gently pick up the book. The text begins to glow a faint blue but subsides. You feel a strange courage welling up within you.");
              } else{
                print("You've already taken the cipher");
              }
            }
          },
          {
            input: "take robe",
            result: function() {
              if (cultistRobe.owned == false) {
                cultistRobe.owned = true;
                player.inventory.push("Cultist Disguise");
                pickUpNew.play();
                updateInvDisplay("Cultist Robes - Armor");
                print("You struggle to pull the robes off of the dead cultist. Luckly the robe's color is already one similar to the color of blood. No one should notice, you hope. Equip with 'equip cultist disguise'.");
              } else{print("You've already taken the cultists robes.");}
            }
          },
          {
            input: "look bookshelves",
            result: function() {
              if (cipher.owned === true) {
                print("These books somehow seem older than the other books you've seen thus far. Most are bound in an unfamiliar black leather that warms your hands when you hold them. None of the books seem to have titles on the spine, or on the front. After flipping through a few you find most to only have the first few pages written in, and the rest are blank. You decipher an excerpt from one: 'The demonic influence radiates from the shards. Nothing can contain them. If we are to protect this world from the cults that spring up around where these evil seeds are sown, we must destroy them. Only Rain knows how we'll break this curse.' You close the book.");
              } else {
                print("These books somehow seem older than the other books you've seen thus far. Most are bound in an unfamiliar black leather that warms your hands when you hold them. None of the books seem to have titles on the spine, or on the front. After flipping through a few you find most to only have the first few pages written in, and the rest are blank. You need some sort of cipher.");
              }
            }
          },
          {
            input: "look note",
            result: function() {
              print("You find a small note laying on one of the bookshelves. It reads: 'Cassius, I know you tried to follow in the ways of Umbril but ultimately your heritage betrays you. You are the true keeper of the shard and I do not dispute that. You must see the error of your ways. Should we destroy it, we may well have nothing left to fight for. I have sat next to the shard for many nights praying to Umbril for guidance and to lose that would be devistating.'");
            }
          },
          {
            input: "look wall writing",
            result: function() {
              print("The writing on the wall is written in blood. Small drops that have yet to dry are running down to the floor. It reads: 'All is lost without th...' It doesn't seem like the writer had time to finish.");
            }
          },
          {
            input: "look corpse",
            result: function() {
              print("After examining the body you find that the corpse still seems fresh. Its eyes has yet to turn the blueish hue you'd seen in the birds eyes. Its hands are curled violently as if he'd been struggling to hold onto something during his demise. He is dressed in grey and red robes with multiple puncture marks in the chest, and back. It seems like whoever this was, he was assassinated. You wonder for a moment if the robe would be any use to you in case you run into any cultists that are living.");
            }
          },
          {
            input: "look smouldering scroll",
            result: function(){
              print("Something should be written here.");
            }
          },
          {
            input: "take smouldering scroll",
            result: function(){
              fireBall.playerHas = true;
              print("There should be something better written here but the gist is that you can now sling fireballs. Whoopee!");
            }
          },
          {
            input: "look sky light",
            result: function() {
              print("Light streams in from a small dome in the ceiling. Standing in the light calms you. You stand for a moment, soaking in the light before realizing that the light is a different color than the light coming from the windows in other rooms. Whatever is making this light, it's inside the building.");
            }
          },
          {
            input: "back to the grand hall",
            result: function() {
              moveThroughDoor.play();
              currentRoom = gameData.rooms[4];
              if (player.armorName == "Cultist Disguise") {
                Dialogue.load("Unknown Brother", "dialogue_files/brother_1.txt");
                //var myDialogue = Object.assign({grandHallCultist}, Dialogue);
                print("You see a robed figure standing ominously still in the room. His hand slowly moving up and down the pockmarked column. He is silent. (Try using speak.)");
              } else if (player.armorName != "Cultist Disguise") {
                print("You see a robed figure standing ominously still in the room. His hand slowly moving up and down the pockmarked column. You draw away slowly and close the door quietly, as not to rouse suspicion.");
              }
            }
          },
        ]
      },
      {
        name: "Ornate Chambers", //6
        look: ["bed", "dresser", "vase", "frantic cultist", "painting", "silver serving tray", "small antechamber", "end table", "back to the grand hall"],
        description: function() {
          if (player.armorName == "Cultist Disguise") {
            Dialogue.load("Frantic Cultist", "dialogue_files/frantic_cultist.txt");
            //myDialogue = Object.assign({F_Cultist}, Dialogue);
            print("You climb the stairs slowly, relighting your torch off of one of the wall sconces. The torch flares to life. As you round the curved stair case you notice a large, dark, oak door guarding the top. Peering through the keyhole you see a frantic cultist searching the room. You enter slowly, not wanting to disturb him.");
            print("The cultist turns to you as you close the door.");
            print("'What does he want now? That damn creature pounding on the door there and now you?', the cultist moans.", "manaColor");
            print(" As he finishes his sentence a loud scream erupts from behind a small antechamber door.");
            print("You are unsure of how to respond. Use speak to talk to the cultist.");
          } else {
            print("You climb the stairs slowly, relighting your torch off of one of the wall sconces. The torch flares to life. As you round the curved stair case you notice a large, dark, oak door guarding the top. Peering through the keyhole you see a frantic cultist searching the room. Not wanting a fight, you descent the stairs wishing you had a disguise.");
            currentRoom = gameData.rooms[5];
          }
        },
        commands: [{
            input: "look bed",
            result: function() {
              print("You look over the largest bed you've ever seen. A tall, pearl white canopy extends upwards towards the ceilng, capped with golden finials. Golden drapes glisten gently in the torch light. You pull the drapes back gently to find the bedding tousled into a messy lump. Whoever slept here didn't have the time to make the bed. Looking underneath you see a small chest with a skull emblazened on it.");
              gameData.rooms[6].look.push("small chest");
            }
          },
          {
            input: "look silver serving tray" || "look serving tray" || "look tray",
            result: function(){
              print("There should be something better written here but the gist is that there's a brass key on the tray.");
              }
          },
          {
            input: "take key",
            result: function(){
              print("You grab the key.");
              butlersKey.owned = true;
              updateInvDisplay("butlers key");
            }
          },
          {
            input: "look frantic cultist",
            result: function() {
              print("You look over at the cultist as he paces he room. At seemingly random intervals he pulls open a drawer and mutters to himself inaudiably. He seems to be searching for something. He's staying far from the door to the small antechamber on the right side of the room. Periodically, scratches and screams erupt from the door before being replaced be a slow, agonizing moan into nothing. The cultist looks over to you.");
              print("'You gonna help? Or what?'", "manaColor");
            }
          },
          {
            input: "look vase",
            result: function() {
              print("Dead roses fold over the edges of the vase, each black rose dropping gnarled petals upon the dresser. The vase itself is decorated with a scene that encircles the bulb of the hydria. You turn the vase delecately, trying to examine the entire scene, while petals rain down.");
              print("A man stands over a vast field, mountains standing tall in the background. The field is full of men with spears. Next, the man stands over a large purple pool that rests atop a mountain. He is inside a decorated throne room, not unlike the one in this castle, but the back wall is black with two red eyes dominating the darkness. Lastly the man is in bed, surrounded by loved ones. He's holding his stomach in pain.");
            }
          },
          {
            input: "look dresser",
            result: function() {
              if (theOriginOfRain.owned == false) {
                print("Old oaken dresser. The corners are dull from years of wear. A beautiful vase dipicting a scene rests atop it. You open the top drawer to find a bundle of stained clothing. But, by the looks of them they were once beautiful, and made from a good cloth. You sift through the clothing for a short time and come across a book not unlike the cipher you found in the library. Bound in a black leather, the book has no title on the spine, or in the front. As you hold it closer to examine it, brilliant letters begin to form: ");
                print("The Origin of Rain", "yellow");
                pickUpNew.play();
                player.inventory.push("The origin of Rain");
                theOriginOfRain.owned = true;
                updateInvDisplay("The Origin of Rain");
              } else(print("Old oaken dresser. The corners are dull from years of wear. A beautiful vase dipicting a scene rests atop it."));
            }
          },
          {
            input: "look painting",
            result: function() {
              print("A simple painting of a rainy field. There are boars giving birth to a human child. Human women surround them, rejoicing. What could that mean?");
            }
          },
          {
            input: "back to the grand hall",
            result: function() {
              moveThroughDoor.play();
              currentRoom = gameData.rooms[4];
              print("You climb down the stairs slowly. As you round the final stairs you find the grand hall to be empty. The onslaught of the crows pounding against the main gates continues.");
            }
          },
          {
            input: "look small antechamber",
            result: function() {
              print("Something inside is growling and scratching at the door. It seems in pain. Periodically it screeches and pounds against the door, the frame doesn't look like it can hold on much longer.");
            }
          },
          {
            input: "look end table",
            result: function() {
              print("A dusty end table filled with half burnt candles. No one cared to clean up after themselves. Inbetween two melted candles you notice a ripped piece of parchment. You look back at the cultist who seems distracted his distraught search. You open it carefully: ");
              print("When he finally returns, we will be acosted by the crows. Do not let them in. When we weather his storm we will be blessed by him. When we are the sole survivors we will fall into his graces and be made whole in his eyes. Do not lose faith. We've lost many, but those who remain are strong enough to survive his embrace", ".blue-text");
            }
          },
          {
            input: "speak",
            result: function() {
              conversation("Frantic Cultist", "player_1");
            }
          },
          {
            input: "open small antechamber",
            result: function() {
              combat(player, antechamber_withered);
              print("The cultist looks at you with admiration.");
              print("I didn't think you'd be able to do that! Those things are way more difficult to fight than highly flammable birds.", "manaColor");
            }
          },
          {
            input: "look small chest",
            result: function() {
              if (serum.owned == false) {
                print("You open the small chest carefully. The inside is lined with a fine purple velvet and in the center lays a small vial filled with a viscous blue liquid. As you slide it into your bag the cultist takes notice.");
                print("That's what you came up here for? What now? Another one for the torture eh? What a shame.", 'manaColor');
                player.inventory.push("serum");
                serum.owned = true;
              } else(print("The chest is empty."));
            }
          }
          //end commands
        ]
      },
      {
        name: "Trial of the ShardKeeper", //7
        shardKeeperDead: false,
        description: function() {
          print("You enter the room quietly as the Shardkeeper turns to face his back to the door. You're in a small hall leading west. There's a small spiral staircase embedded into the wall on the far side of the room. What was once just a corridor is now a staging area for tending to wounded cultists, and arming those who have yet to fight. The left side of the hall is covered in barrels, half are opened with their contents spewn upon the floor. The right side of the room is lined with weapon, and armor racks. All seem broken, and in disrepair after the battle. The shardkeeper begins to turn to face you. If you do not have the cipher, and the disguise, you should turn back. What do you do?");
          print("Hide among the barrels.");
          if (playerArmor == cultistRobe) {
            print("Disguise: Try to walk past.");
          }
          print("Fight the shardkeeper.");
          print("Turn back");
        },
        commands: [
          {
            input: "fight the shardkeeper",
            result: function() {
              combat(player, weakenedShardKeeper);
              shardKeeperDead = true;
              print("The shardkeeper lies dead before you. Blue continuing to gush out of open wounds. His breathing is slow, and eventually stops. You carefully slip down the stairs into the next room.");
              currentRoom = gameData.rooms[8];
              print(currentRoom.description);
            }
          },
          //stealth options
          {
            input: "hide among the barrels",
            result: function() {
              print("Just before the shardkeeper turns around you dart behind one of the barrels. It looks as if it were once filled with bandages, now long bloodied, and thrown out. You peek your head over to see the shardkeeper coming through the hall. His mouth is dripping with a vile blue substance, his skin is gray, and stretched. His wrists grind against the stone with every step. As he gets closer you notice a small, shining purple gem imbedded into his forehead.");
              print("What do you do?");
              print("Fight the shardkeeper.");
              print("Move to the next barrel.");
              print("Try to dislodge the gem.");
            }
          },
          {
            input: "move to the next barrel",
            result: function() {
              print("You wait for the shardkeeper to pass and try to move quietly over a small crate. As you lift your foot to step over the shardkeeper stops, and you freeze. You notice footsteps coming up the staircase. After some time two figures in deep red robes appear from beneath. They're chatting.");
              print("Listen to the mens conversation.");
              if (serum.owned == true) {
                print("Throw the serum.");
              }
            }
          },
          {
            input: "throw the serum",
            result: function() {
              if (serum.owned == true) {
                print("You brace yourself for a moment before pulling the serum out of your bag slowly. The viscous blue liquid bubbles angrily. You hold your breath, and hurl the vial at the men. The shardkeeper lets out an frenzied howl and charges the men. They're only able to let out screams as the monster tears into them. You spring out from the boxes as the keeper is preoccupied and make your way briskly down the stairs.");
                currentRoom = gameData.rooms[8];
                print(currentRoom.description);
              } else(print("Invalid response."));
            }
          },
          {
            input: "listen",
            result: function() {
              print("The men are speaking in hushed tones. Over the heavy breathing of the keeper you can only make out part of the conversation.");
              print("He wants to pull back.", "yellow");
              print("Coward.", "blue");
              print("No, no, deeper into the castle. The walls are not holding as well as he'd thought, or, any of us thought, really.", "yellow");
              print("We've been waiting for this for centuries. How is it possible that we'd fail?", "blue");
              print("We're only men. All we can do is prepare the best we can, and wait.", "yellow");
              print("The men stand by the Keeper for moment before being sniffed, and ushered past. The exit into the grand hall. What do you do? : ");
              print("Fight the shardkeeper");
              print("Try to dislodge the gem");
              print("Sneak further into the room");
            }
          },
          {
            input: "Sneak further into the room",
            result: function() {
              print("You move your way slowly the rest of the way across the chamber. Once the keeper has moved far enough away from you, you slip into the darkness of the staircase.");
              currentRoom = gameData.rooms[8];
              print(currentRoom.description);
            }
          },
          //hostile options
          {
            input: "try to dislodge the gem",
            result: function() {
              print("You leap at the shardkeeper as his back is turned. Grabbing him by the shoudlers you lift yourself up and wrap your fingers around the gem. Pulling hard the gem begins to dislodge. The shardkeepers screams, clawing at your arms trying to pull you off. Finally, the gem becomes dislodged and the shardkeeper crumbes beneath you. You fall hard to the ground but the shardkeeper does not move. You look at the vibrant purple gem for a small while before stuffing it into your bags, and hurrying down the stairs.");
              currentRoom = gameData.rooms[8];
              print(currentRoom.description);
            }
          },
          {
            input: "turn back", //broken? WHY?
            result: function() {
              currentRoom = gameData.rooms[4];
              print("As you move to exit the Shardkeeper notices you. It lets out shrill scream and bounds towards you, each long leg stomping against the cold stone. Its mouth stretches down to his chest, a wide, gaping blue hole that seemed filled with the blue liquid. As it gets halfway across the hall you manage to get the door open, and slip through. Just as you get through, the shardkeeper reaches you, slamming its body against the door. It slams shut with a a shattering echo that plays across the grand hall. Sweat is pouring down your face. You're safe, for now.");
            }
          },
          {
            input: "try to walk past",
            result: function() {
              print("You stand up from your kneeling position and straighten your collar. You breath deeply and mentally prepare yourself. You stride towards the Shardkeeper with all the confidence you can muster. The Shardkeeper stops in its tracks and slowly turns to meet your gaze. You hold your breath. It sniffs you for a moment. Nostils flaring. What do you do?");
              print("Stand still");
              print("Keep walking");
            }
          },
          {
            input: "stand still",
            result: function() {
              print("The keeper sniffs you for a moment. Ever hair on your body stands stands on end as he places his hand on your shoulder. The liquid drips from his mouth and lands on your robe, burning small holes. Finally, he pushes you along. You look back only once as you decend down the stairs.");
              currentRoom = gameData.rooms[8];
              print(currentRoom.description);
            }
          },
          {
            input: "keep walking",
            result: function() {
              print("You decide to continue walking and give the keeper less time to notice you. As you pass him you gently rub shoulders. He stops, almost frozen. He turns his head quickly and screams before leaping upon you.");
              combat(player, weakenedShardKeeper);
              shardKeeperDead = true;
              print("The shardkeeper lies dead before you. Blue continuing to gush out of open wounds. His breathing is slow, and eventually stops. You carefully slip down the stairs into the next room.");
              currentRoom = gameData.rooms[8];
              print(currentRoom.description);
            }
          }
        ] // end commands
      },
      {
        name: "Royal Dressing Room", //room 8
        look: ["cloak", "wardrobe", "royal hunting garb", "dresser","cheval mirror","ornate rug","ottoman","mannequin"],
        description: "The royal dressing room. This is temporary text. If you see this text you are play testing my game. I'm very sorry you had to do this. Your sacrifice will not be forgotten. Also, hi kt!!!! Love you!!!!",
        commands: [
          {
            input: "look cloak",
            result: "Some shit."
          },
          {
            input: "look wardrobe",
            result: "Some shit."
          },
          {
            input: "look royal hunting garb",
            result: "Some shit"
          },
          {
            input: "look dresser",
            result: "Some shit"
          },
          {
            input: "look cheval mirror",
            result: "Some shit"
          },
          {
            input: "look ornate rug",
            result: "Some shit"
          },
          {
            input: "look ottoman",
            result: "Some shit"
          },
          {
            input: "mannequin",
            result: "Some shit"
          }
          ]
        } //end of room 8 commands
      ]
  }; //end of gameData

  //places the player in the starting room.
  currentRoom = gameData.rooms[0];

  function attachListeners() {
    //  Event listeners
    document.getElementById('useWeapon').addEventListener("click", useWeapon, false);
    document.getElementById('useFireball').addEventListener("click", useFireball, false);
    document.getElementById('useHealthPot').addEventListener("click", useHealthPot, false);
    document.getElementById('backToGame').addEventListener("click", backToGame, false);
    document.getElementById('startGame').addEventListener("click", startGame, false);
  }

  //prints out input to screen
  function print(input, color) {
    $("<p class='text-center " + color + "'>" + input + "</p>").insertBefore("#placeholder");
    //reset textbox
    $("#commandline").val("");
  }

  function dialogueButton(input, speaker){
    var name = document.createElement("BUTTON");   // Create a <button> element
    name.innerHTML = input; //Gives the button text
    name.classList.add("dialogue_button"); //Gives the button the dialogue_button CSS style
    $(name).insertBefore("#placeholder"); //Places the button in the text stream
    name.addEventListener("click", function(){
      conversation(speaker, "player_1");
      name.disabled = true;
      name.classList.add("disabled_button");
    }
  )}

  attachListeners();


  $("#commandline").keypress(function(e) {
    if (e.keyCode === 13) {
      var roomCmd = currentRoom.commands;
      var input = $("#commandline").val().toLowerCase();
      //for combat testing. To be removed.
      if (input == "fight") {
        combat(player, withered);
      }

      //prints out current room
      if (input == "room") {
        print(currentRoom.name);
        console.log(currentRoom.name);
      }

      //prints out user inventory
      if (input == "inventory") {
        if (player.inventory < 1) {
          print("You have nothing.");
        } else {
          print("You rifle through your bags finding: ");
          print(player.inventory);
        }
      }

      //use commands that can be taken place in any room.
      if (input == "use cipher on scroll" && cipher.owned === true && throneScroll.owned === true) {
        print("You open up the cipher, and begin work on the scroll. After some time you work out the message. It reads: 'Thaddius on the ways of man: We must follow in the footsteps of Rain and follow his three rules, which are as follows. One: Do not succumb to the powers of idols. This serves only to cause war. Two: Do not war against another man. This serves only to empower Umbril and his creatures. Three: Do not give into the influences Umbril. This serves only to end mankind.' ");
        return;
      }

      //prints out look items in room
      if (input.match(/look$/)) {
        $("<p class='text-center blue-text'>" + "You glance around the room finding:" + "</p>").insertBefore("#placeholder").fadeIn(1000);
        $("<p class='text-center blue-text'>" + currentRoom.look + "</p>").insertBefore("#placeholder").fadeIn(1000);
      }

      //formats the command
      var input_words = input.split(/\s+/); // ["open", "old", "door"]
      var command = input_words[0]; // "open"
      var noun = input_words.slice(1).join(" "); // "old door"

      //prints out look descriptions
      if (input.match(/look\s+/) || /open\s+/ || /take\s+/ || /use\s+/) {
        for (var i = 0; i < roomCmd.length; i++) {
          if (input === roomCmd[i].input) {
            roomCmd[i].result();
          }
        }
      }

      //checking what weapon is equipped
      if (input == "equipped") {
        print("Weapon: You have " + "<span class='blue-text'>" + player.weaponName + "</span>" + " equipped." + " It deals up do " + "<span class='red-text'>" + player.weaponStats + "</span>" + " damage. And has a damage type of " + "<span class='red-text'>" + player.weaponDamageType + "</span>" + ".");
        print("Armor: " + "<span class='blue-text'>" + player.armorDescription + "</span>" + " You take " + "<span class='red-text'>" + player.armorStats + "</span>" + " less damage.");
        print("Shield: " + "<span class='blue-text'>" + player.shieldDescription + "</span>" + " You take " + "<span class='red-text'>" + player.shieldStats + "</span>" + " less damage.");
      }

      //equipping weapons

      //old sword
      if (input == "equip old sword" && oldSword.owned === true && player.strength >= oldSword.reqStrength) {
        print("You fasten the old sheath to your belt and gently place the rusted blade inside.");
        player = Object.assign(player, oldSword);
      } else if (input == "equip old sword" && oldSword.owned === false) {
        print("You do not own the weapon 'old sword'");
      }


      //steel mace
      if (input == "equip steel mace" && steelMace.owned === true) {
        print("You hold the mace tightly, ready to attack whatever growls in the dark.");
        player = Object.assign(player, steeMace);
      } else if (input == "equip steel mace" && steelMace.owned === false) {
        print("You do not own the weapon 'steel mace'");
      }

      //equipping armor

      //cultist disguise
      if (input == "equip cultist disguise" && cultistRobe.owned === true) {
        print("You gently put on the disguise. Don't want to rip any extra holes into it.");
        player = Object.assign(player, cultistRobe);
      } else if (input == "equip cultist disguise" && cultistRobe.owned === false) {
        print("You do not own 'cultist disguise' ");
      }

      //equipping shields

      //makeshift shield

      if (input == "equip makeshift shield" && makeshiftShield.owned === true) {
        print("You grip the makeshift shield firmly in your left hand.");
        player = Object.assign(player, makeshiftShield);
      } else if (input == "equip makeshift shield" && makeshiftShield.owned === false) {
        print("You do not own 'makeshift shield'");
      }

      //player help
      if (input === "help") {
        $("<p class='text-center blue-text'>" + "Commands to consider: look, open, take, use, climb, consider, equip, equipped, inventory, use * on *, and room." + "</p>").insertBefore("#placeholder").fadeIn(1000);
      }

      //use Commands..maybe


      //consider commands
      if (input == "consider old sword" && oldSword.owned === true) {
        print(oldSword.condition);
      } else if (input == "consider torch" && torch.owned === true) {
        print(torch.condition);
      } else if (input == "consider skeleton key" && skeleKey.owned === true) {
        print(skeleKey.condition);
      } else if (input == "consider potion" && healthPot.owned === true) {
        print(healthPot.condition);
      } else if (input == "consider scroll" && throneScroll.owned === true) {
        print(throneScroll.condition);
      } else if (input == "consider cipher" && cipher.owned === true) {
        print(cipher.condition);
      } else if (input === " consider robe" && cultistRobe.owned === true) {
        print(cultistRobe.condition);
      } else if (input === "consider scrawled writings" && scrawledWritings.owned === true) {
        print(scrawledWritings.condition);
      } else if (input == "consider serum" && serum.owned === true){
        print(serum.condition);
      }

      //reset textbox
      $("#commandline").val("");
    }
  });
  //STATS Here
  //LEVEL UP
  var toLevelUp = [200, 1000, 2000, 5000, 8000, 12000];
  var xpPoints = 5;

  function levelUpCheck(xp) {
    if (toLevelUp[0] <= xp) {
      player.level = player.level + 1;
      player.pointsToSpend = player.pointsToSpend + xpPoints;
      print("You've hit level " + player.level + "!", "yellow");
      toLevelUp.shift();
    }
  }

  //COMBAT HERE
  //player damage before being rounded down
  var playerDamage;
  //player damage after being rounded down
  var playerRealDamage;
  //stores random number deciding what move the enemy is using
  var enemyMove;
  //enemy damage
  var enemyDamage;
  //enemy player is currently fighting
  var enemy;
  //checks to see if the enemy has already attacked. Player goes first.
  var hasAttacked = true;
  //prints out combat to combat div
  function combatPrint(input, color) {
    $(".combatOutput")
      .append("<p class='text-center'" + color + ">" + input + "</p>");
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
      combatPrint("You gain " + enemy.xp + "XP!");
      player.xp = player.xp + enemy.xp;
      levelUpCheck(player.xp);
      refreshPlayerStats();
      player.gold = player.gold + enemy.goldReward;
      refreshPlayerGold();
      $("#backToGame").fadeIn(1000);
      battleVictory.play();
      enemy.death.play();
      enemy.loot();
      return true;
    }
    return false;
  }

  //returns the player to the main game
  function backToGame() {
    $('#console').fadeIn(1500);
    $(".combatMenu").fadeOut(0);
    $(".combat").fadeOut(0);
    $(".combatOutput").html("");
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
    document.getElementById(who).style.height = howMuch  + "px";
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
    if (gameOverCheck() === false) {
      enemyMove = calcEnemyMove(enemy);
      enemyDamage = calcDamage(enemy.moves[enemyMove][1], 1);
      var enemyRealDamage = Math.floor(enemyDamage) - player.armorStats;
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
      refreshPlayerStats();
      enemy.sounds.play();
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
      playerDamage = calcDamage(player.weaponStats, 1);
      addedStatDamage = Math.floor(player.strength / 3);
      playerRealDamage = Math.floor(playerDamage + addedStatDamage);
      enemy.health = enemy.health - playerRealDamage;
      combatPrint(
        "You attack " +
        enemy.name +
        " with your " +
        player.weaponName +
        " for " +
        playerRealDamage
      );
      calcHealthBars("enemyHealth", enemy.health);
      player.weaponSound.play();
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
      player.mana >= 25 &&
      fireBall.playerHas == true
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
      combatPrint("You do not have enough mana or do not have the spell.");
    }
  }

  function useHealthPot() {
    if (hasAttacked === false) {
      return combatPrint("You are still recovering from your attack.");
    }
    if (player.healthPotNum > 0) {
      player.health = player.health + healthPot.stats;
      player.healthPotNum = player.healthPotNum - 1;
      refreshPlayerStats();
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
    $('#console').fadeOut(0);
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

  //BEGIN CONVERSATION

  function conversation(actor, player) {
    $(".backbutton").fadeIn(1500);
    $('#console').fadeOut(1500);
    $(".conversationMenu").fadeIn(1500);
    $(".conversation").fadeIn(1500);
    //conversation with actor
    $("body").addClass("forrest-bg");
    //handles click events for player response buttons
    $(".conversationMenu").on("click", ".convoButton", function() {
      //prints out actor response to player
      printActorResponse(actor, player, this.id);
      console.log("Actor " + actor + " " + player + this.id);
      //removes player response buttons
      deleteButtons();
      //prints out player repsonse buttons
      conversationOptions(actor, player);
    });
    //prints out greeting
    printActorResponse(actor, player);
    conversationOptions(actor, player);
  }

  function printActorResponse(actor, player, response) {
    combatPrint(Dialogue.interact(actor, player, response).text);
  }

  function conversationOptions(actor, player) {
    var responses = Dialogue.interact(actor, player).responses;

    for (var i = 0; i < responses.length; i++) {
      console.log(responses[i].text);
      $(".conversationMenu").append("<button class='convoButton' id='" + responses[i].id + "'>" + responses[i].text + "</button>");
      $(".conversationMenu").append("<br>");
    }
  }

  function deleteButtons() {
    $(".conversationMenu").html(" ");
  }

  //removes player from the conversation
  $("#goodbye").click(function() {
    $('#console').fadeIn(1500);
    $(".conversationMenu").fadeOut(1500);
    $(".conversation").fadeOut(1500);
    $(".combatOutput").html(" ");
    $(".conversationMenu").off("click");
    //Dialogue.dialogues = {};
    console.log(Dialogue.dialogues);
    $("body").removeClass("forrest-bg");
    $(".backbutton").fadeOut(1500);
  });

  //END CONVERSATION
});
