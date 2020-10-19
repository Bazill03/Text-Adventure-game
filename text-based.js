var combatants = [];
var turnOrder = [];
var agiRoll;
var turnCounter;
var playerTurn;
var firstEnemy; //stores first enemy object
var secondEnemy; //stores second enemy object
var toAttack;
var groupName;
var isGameOver = false; //bool allows me to see if gameOverCheck function has been run, or where it has broken.
var doubleFight = true;

var fieldrat = new rat("Field Rat", 12, 0, 0.1,
  function () {
    combatPrint("You recieved 0 gold and 50xp!");
  }, 5, "The large rat looks up to you from the corner of the room. Its teeth are barred.", 5);

$(document).ready(function () {
  //move this elsewhere later.
  var makeStrong = document.createElement("STRONG");

  var input = $("#commandline").val().toLowerCase();
  $("#console").fadeIn(1500);

  //Audio start
  allAudio = [tavernSounds, outsideTavern, witheredAttackSound, witheredIntroSound, witheredDeathSound, ratDeathSound, ratAttackSound, shardKeeperIntroSound, shardKeeperAttackSounds, wings, walkingThroughGrassAudio, donkeyBraying, clipClop, echoingScreams, jumpScare, swordAttackSound, claymoreAttackSound, maceAttackSound, fireBallSounds, healthPotSound, punchSound, woodenWeaponSound, battleMusic, battleVictory, song1, song2, pickUpNew, unlockDoor, moveThroughDoor, moveThroughStairs];

  //intro sounds
  witheredIntroSound.play();
  setTimeout(function () {
    shardKeeper.introSound.play();
  }, 2000);
  steelMace.sound.play();


  var currentSong = song1;
  //Audio
  setTimeout(function () {
    song1.play();
  }, 2000);

  function loopOneSong(song) {
    currentSong.pause();
    currentSong = song;
    currentSong.play();
    currentSong.addEventListener("ended", function () {
      currentSong.play();
    });
  }

  function loopTwoSongs(song1, song2) {
    currentSong.pause();
    currentSong = song1;
    currentSong.play();
    currentSong.addEventListener("ended", function () {
      currentSong = song2;
      currentSong.play();
    })
  }

  function audioControl(playormute) {
    for (var i = 0; i < allAudio.length; i++) {
      allAudio[i].muted = playormute;
    }
  }

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

  function refreshPlayerEffecttingStats() {
    player.health = Math.floor(player.strength / 2) + 98;
    player.mana = Math.floor(player.intelligence * 1.5) + 93;
  }

  function refreshPlayerGold() {
    //players gold count
    $("#playerGoldDisplay").html('');
    $("#playerGoldDisplay").append(player.gold);
  }

  function updateInvDisplay(item) {
    $("#playerInventoryDisplay").append(item);
    $("#playerInventoryDisplay").append(document.createElement("br"));
  }

  refreshPlayerEffecttingStats();
  refreshPlayerStats(); //intitializes players stat display.

  
  //QUEST HERE
  currentQuests = [];

  function questAdd(quest){
    currentQuests.push(quest);
  }

  function displayQuests() {
    var questBarDOM = document.getElementById("questBar");
    for(var i = 0; i < currentQuests.length; i++){
        Object.keys(currentQuests[i]).forEach(function(key,index){
          console.log(key);
          if(key == "questTitle"){
            //displays Quest Titles
            var questTitleDOM = document.createElement("h4");
            questTitleDOM.innerText = currentQuests[i].questTitle;
            questTitleDOM.classList.add("questTitleClass");
            questBarDOM.append(questTitleDOM);
        }

          
          //displays quest objectives
          var questObjectiveDOM = document.createElement("p");
          questObjectiveDOM.classList.add("questObjectiveClass");
          questObjectiveDOM.innerText = key;
          questBarDOM.append(questObjectiveDOM);

          

        });
      }
    }
  
  questAdd(huntDownTheNecromancer);
  displayQuests();


  function startGame() {
    loopOneSong(tavernSounds);
    document.getElementById('startGame').disabled = true;
    document.getElementById('startGame').classList.add("disabled_button");
    print("----- The Beginning -----", "goldColor");
    print("You find yourself in a bustling tavern. Surrounded by loved ones and acquaintances. Before you, on the beaten mahogany bar top, a dark ale's froth is just dying down.");
    print("Next to you is your best friend, Sawyer. A bumbling but kind man, warm from alcohol and good times. He's been rambling about the benefits of fish oil for what seems like ages. This is your second drink of the night and you're growing antsy.");
    print("You turn to Sawyer, interrupting his presentation of his ever clearing complexion.");
    print("'Tell me Sawyer, before I die, will this conversation end?'", "agiColor");
    print("Sawyer looks at you dejectedly. Then nods towards your drink.");
    print("Maybe you could use a bit more of that in ya? Make ya a bit more agreeable for the night?", "manaColor");
    print("You quietly agree and take a solemn drink.");
    print("So, maybe you're up to somethin' fun tonight? Maybe somethin' a little dangerous?", "agiColor");
    Dialogue.load("Sawyer", "dialogue_files/sawyer1.txt");
    var name = document.createElement("BUTTON"); // Create a <button> element
    name.innerHTML = "Speak"; //Gives the button text
    name.classList.add("dialogue_button"); //Gives the button the dialogue_button CSS style
    $(name).insertBefore("#placeholder"); //Places the button in the text stream
    name.addEventListener("click", function () {
      conversation("Sawyer", "player_1");
      name.disabled = true;
      name.classList.add("disabled_button");
      print("----- A Strange Man Approaches -----", "goldColor");
      print("As you and Sawyer are planning, a strange man approaches. Drooped eyes and crooked nose dominate his face. Ragged cloth and patinated brass piercings draw your mind into the imagineings of a life lived very roughly.");
      print("The man drops heavily onto the stool next to you and Sawyer as you stand transfixed.");
      print("The man glances at you for a moment, ice blue eyes shimmering errily in the low light of the tavern before turning to the bartender and ordering a lager in a gruff, low voice.");
      print("The three of you sit silent for some time as the tender drafts the lager.");
      print("After some time, Sawyer leans in close, as if to whisper into your ear but the heavyset man intervenes.");
      print("Either of you lads got fortitude?", "healthColor");
      print("'Fortitude?', Sawyer stammers out. 'Sure, my pal and I have plenty of fortitude. My pals here tougher than a bear!'", "manaColor");
      print("Sawyer slaps you roughly in the back.");
      print("'Good, thas just what I needed ya for. Come with me', the man replied before downing his drink in an impressive display and beginning to stand.", "healthColor");
      print("We got a long night ahead of us. Take a good look around before ya leave. Don't want you missin' anything.", "healthColor");
      print("Saywer rolls his eyes at the intensity of the mans words.");
      print("'Alright old man, we're comin.'", "manaColor");
      print("This is a good time to try out the look command. Try typing 'look' into the text box. You may also type something like 'look bartop' to get a description. Whenever you're ready to leave type 'leave bar'", "intColor");
    })

  }

  var gameData = {
    //room objects
    rooms: [{
        name: "tavern", //0
        look: ['bartop', 'Sawyer', 'Bartender', "stool"],
        commands: [{
            input: 'look bartop',
            result: function () {
              print("An old mahogany bartop, supposedly crafted by one of Sawyers great grandfathers many years ago. Its coloring is uneven from decades of slammed drinks and constant washing.");
            }
          },
          {
            input: "look sawyer",
            result: function () {
              print("Your best friend. Goofy, curly blonde hair that's only washed when he swims in the local pond and a devilish grin that tells you he's up to no good.");
            }
          },
          {
            input: "look bartender",
            result: function () {
              print("A timid old man, who doesn't want any trouble. He's been a staple in your villiage for decades.");
            }
          },
          {
            input: "leave bar",
            result: function () {
              currentRoom = gameData.rooms[1];
              previousRoom = gameData.rooms[0];
              currentRoom.description();
              moveThroughDoor.play();
            }
          },
          {
            input: "look stool",
            result: function () {
              print("A fairly unremarkable stool, but for some reason it's always available for you when you visit the tavern.");
            }
          }
        ]
      },
      {
        name: 'outside the tavern', //1
        look: ['exit to woods', 'tavern', 'cart', 'town'],
        description: function () {
          loopOneSong(outsideTavern);
          print("----- Outside The Tavern -----", "goldColor");
          print("As you exit, the gruff man turns to face you, silhouetted against the backdrop of the sun setting behind rolling hills.");
          print("'So, ya boys ready?' the man says. His shoulders tense up as he scans the quiet street.", "healthColor");
          print("Yeah, we are. Might need something to fight with though.", "manaColor");
          print("The man nods, then motions over to a small donkey led cart.");
          print("Take yer pick.", "healthColor");
          print("Saywer excitedly leaps over to the cart, swinging back the cloth tarp to reveal a few old, rusted weapons. Then frowns.");
          print("These are what you call weapons?", "manaColor");
          print("The man nods.");
          print("Tis better than yer hands int' it?", "healthColor");
          print("'Hardly!' Sawyer exclaims, pounding his fists together. 'But yeah, I suppose you're right. Hey, Jack, get over here and grab something.'", "intColor");
          print("You look over the gruff man for a moment. Perhaps you should speak to him.");
          Dialogue.load("Aethelu", "dialogue_files/aethelu1.txt");
          var name = document.createElement("BUTTON"); // Create a <button> element
          name.innerHTML = "Speak"; //Gives the button text
          name.classList.add("dialogue_button"); //Gives the button the dialogue_button CSS style
          $(name).insertBefore("#placeholder"); //Places the button in the text stream
          name.addEventListener("click", function () {
            conversation("Aethelu", "player_1");
            name.disabled = true;
            name.classList.add("disabled_button");
            print("----- Time to grab a weapon -----", "goldColor");
            print("You look over at Sawyer. He's holding an old iron hammer. It looks too heavy for him to wield correctly, but he seems happy nonetheless.");
            print("Look at this thing Jack! Wow, got a heft to her.", "intColor");
            print("You smile at Sawyer, then look into the cart. One weapon remains, an old wooden club.");
            print("Really? Not even any iron for me?", "agiColor");
            print("Sayer and Aethelu frown and apologize in unison, then share an awkward glance.");
            print("You sigh.");
            print("You got the wood club! Not the best weapon, but it's better than fists.");
            woodenMallet.owned = true;
            player.inventory.push("wooden mallet");
            updateInvDisplay("wooden mallet");
            print("This is a good time to try equipping. There are 2 major commands for equipping. 'equip weapon name' and 'equipped'. Try typing 'equip wooden mallet' then, 'equipped'", "intColor");
            print("Alright, ya boys ready?", "healthColor");
            print("From here on destinations will be included in your look command. Try that now.");
          })
        },
        commands: [{
            input: 'exit to woods',
            result: function () {
              currentRoom = gameData.rooms[2];
              player.travelHistory.push(currentRoom);
              currentRoom.description();
              walkingThroughGrassAudio.play();
              donkeyBraying.play();
              clipClop.play();
            }
          },
          {
            input: 'look town',
            result: function () {
              print("The town you grew up in. A small farming hamlet. Probably no more than 100 people live here. Your father, and your fathers father lived just down the street from where you stand. Your mother passed years ago but you've held your own the best you could.");
            }
          },
          {
            input: 'look exit to woods',
            result: function () {
              print("You look off to the west, into the forboding forrest. In your younger years you'd galavant the wilderness, finding all sorts of mischeif. Lately though, the forrest has grown darker. You feel a pit in your stomach.");
            }
          },
          {
            input: 'look cart',
            result: function () {
              print("A small ramshackle cart. Looks to be on its 5th or 6th owner. Inside are the bare basics for human survival. It is drawn by an old donkey whose eyes are glassed over with a thick film. Patches of fur are missing, but based on the way Aethelu pets him, he's well loved.")
            }
          },
          {
            input: 'look tavern',
            result: function () {
              print("Your second home. You and Sawyer spend every extra penny there. It's an old, stone building with two stories. The second serving as a small inn for traders and travellers that come through.");
            }
          },
        ]

      }, //end of outside the tavern
      {
        name: 'woods', //2
        look: ['path', 'tree line', 'strange light', 'towards the strange light'],
        description: function () {
          print("----- Into The Woods -----", "goldColor");
          print("Your party makes it's way out of the town, and into the woods. Behind you, the loyal donkey follows. The silence of the night broken only by the clip clopping of the mule. Eventually, you speak up.");
          print("What exactly are we looking for out here?", "agiColor");
          print("Not sure. I just know that I'll know it when I see it. When I saw you two, I knew you were who I was looking for. The same thing will happen again.", "healthColor");
          print("Right, you found us because you suddenly knew you needed to take some men to the woods.", "agiColor");
          print("Aethelu nods.");
          print("And you're not insane?", "manaColor");
          print("Never felt more sane in my life. It was like a fog I'd been hiding behind my entire life was suddenly lifted. Haven't felt the same since.", "healthColor");
          print("'Yeah, he's insane.' Sayer says, quietly.", "manaColor");
          print("A thought tickles the back of your mind. Not enough to form a full thought, not even words. But for some reason, you begin to trust Aethelu.");
          print("Aethelu stops the group, then points at a large rat, gnawing at some grass.");
          print("'Kill it.'", "healthColor");
          print("'Excuse me?' Sawyer says. 'Why would we do that?'", "manaColor");
          print("'Just want to make sure you know how to use that weapon I gave you. Just kill the rat.'", "healthColor");
          print("You and Sawyer shrug. May as well.");
          print("Now you will learn the very basics of the combat system. You don't have any spells yet so all you can use is your weapon. Click to begin combat. You wont always be able to start combat at your leasure, so try to always be ready!", "intColor");
          var name = document.createElement("BUTTON"); // Create a <button> element
          name.innerHTML = "Fight Rat"; //Gives the button text
          name.classList.add("dialogue_button"); //Gives the button the dialogue_button CSS style
          $(name).insertBefore("#placeholder"); //Places the button in the text stream
          name.addEventListener("click", function () {
            combat(player, fieldrat);
            name.disabled = true;
            name.classList.add("disabled_button");
            print("----- The distance Beckons -----", "goldColor");
            print("For the final blow, you strike the rat directly in the head. The head flattens into the bloody mush on the dark earth. You frown.");
            print("That seemed gratuitous.", "agiColor");
            print("Aethelu smiles. 'That wasn't half bad. I mean, you were only fighting a rat but still, not half bad.'", "healthColor");
            print("Sawyer, who'd spend the fight leaning on his hammer stood unimpressed.");
            print("I coulda got him in a single blow me thinks.", "manaColor");
            print("You and Aethelu both chuckle.");
            print("I'm sure you coulda Sawyer, I have no doubts.", "agiColor");
            print("Sawyer then begins to mimic fighting a great beast, swinging his mace wildly through the air, shrieking and grunting as he goes.");
            print("The party shares a hearty laugh.");
            print("Half way through his performance, Sawyer stops, dumbfounded. His eyes drawn somewhere to the east.");
            print("Whadaya reckon that could be?", "manaColor");
            print("You and Aethelu turn. Faintly, between a few trees, a pale blue light flickers and burns.");
            print("'Strange, never seen anything like that before.' You say your mind becoming numb.", "agiColor");
            print("In one swift movement Aethelu slaps you both to the ground.");
            print("Don't look at it. We need to move closer. Keep your gaze away, lest you become one of them.", "healthColor");
            print("You look up at Aethelu, dazed.");
            print("'Seriously?' You say, rubbing the back of your head.", "agiColor");
            print("Seriously. Now, get up.", "healthColor");
            print("You and Sawyer both stand being careful not to look into the blue light.");
            print("It turns you into something else. I don't really understand how I know that or why, but we're going to find out.", "healthColor");
            print("Whenever you don't know what to do. Always try to use your 'look' command.", "intColor");
          })
        },
        commands: [{
            input: 'look path',
            result: function () {
              print("Dark, loamy earth that serves as life source for your farm.");
            }
          },
          {
            input: 'look tree line',
            result: function () {
              print("The forrest strethches out before you. A formidible wall of wood and underbrush. During the day it's quite beautiful but now, as the sun begins to fade, it looks to harbor horrible secrets.");
            }
          },
          {
            input: 'look strange light',
            result: function () {
              print("A strange, pale blue light that glows in the distance. It flickers and burns with an intensity greater than any campfire you've made. As you stare your eyes begin to grow unfocused. Your mind slows to a halt. Your muscles feel tight, and tired, as if you'd finished a long days work. The longer you stare the more intense these feelings become until drool begins to drip out of your mouth. You're soon brought to the ground again by a slap from Aethelu. He warns you not to try it again.");
            }
          },
          {
            input: 'towards the strange light',
            result: function () {
              currentRoom = gameData.rooms[3];
              currentRoom.description();
              walkingThroughGrassAudio.play();
            }
          },
        ]

      }, //end of woods
      {
        name: 'close to the flame', //3
        look: ['the woods are too dark, you can\'t see a thing'],
        description: function () {
          print("----- Don't Look Too Closely, Lest You Lose Yourself -----", "goldColor");
          print("Leaving the mule behind, you and your party draw closer to the light. Unease begins to set in.");
          print("Jack, I don't know about this any more. Maybe we should head back to the tavern, I'm sure those ladies are right where we left 'em!", "manaColor");
          print("'Then go.', Aethelu spits. 'If you are weak, we don't need you.'", "healthColor");
          print("You shrug at Sawyer. The tickle in the back of your mind has gotten worse. A thought, just at the tip of your tongue lingers just out of reach. In the intervening silence since the group last spoke, you've concentrated on that one feeling. What could it be? And, if you're honest with yourself, you can't see yourself turning back. Not until you know what this is.");
          print("Soon the group is close enough to the light to begin to hear chanting and harmonius humming. Someone, farther into the woods is ranting. Spitting words of prophecy and hatred.");
          print("The group hunkers behind a small, grooved piece of the field eyes avoiding the tempting gaze of the light.");
          print("Sawyer begins to whisper but is quickly silenced by Aethelu.");
          print("Through the woods, a voice becomes clear:");
          print("Brothers! Brothers! Calm yourselves! Tonight is the night!", "chrColor");
          print("A racous cheer envelops the night air and a chill runs down your spine.");
          print("Tonight we storm the castle! Tonight we writhe in the embracing light of Umbril!", "chrColor");
          print("The crowd cheers once more before being quieted by the speaker.");
          print("I've spent many, many years with the grand shard. Many nights I've laid next to it and it has given me very little! For years I received nothing but trickle of the word of Umbril! But last night, last night it told me! It told me that the end is nigh!", "chrColor");
          print("The group looks at each other, puzzled.");
          print("'What is the hell is Umbril?' you say, as quietly as possible.", "agiColor");
          print("I do not know. But it cannot be good. Let's try to get a little closer.", "healthColor");
          var name = document.createElement("BUTTON"); // Create a <button> element
          name.innerHTML = "Move Closer"; //Gives the button text
          name.classList.add("dialogue_button"); //Gives the button the dialogue_button CSS style
          $(name).insertBefore("#placeholder"); //Places the button in the text stream
          name.addEventListener("click", function () {
            name.disabled = true;
            name.classList.add("disabled_button");
            print("As the group begins to move closer to the speech you see a shadow dart down to the ground. You silently signal to Aethelu what you saw.");
            print("Aethelu nods, then motions the group in the direction of the shadow.");
            print("Before long the shadow stands once more. Two glowing blue eyes peeking through the underbrush. It begins to emit a low growl. First quiet, but over a few seconds grows in size until it sweeps across the field.");
            print("As the scream reaches its apex, the speech stops. Soon the only sound you can hear is the screaming. It consumes you. You drop your weapon and hold your hands to your ears but it is fruitless. The sound bounces around your skull. You look around in bewilderment, hoping for someone to help you only to find Sawyer and Aethelu in the same position you are. Your chest begins to burn with pain and your legs turn to rubber, your vision starts to fade. It isn't too long before a shadow with pale blue eyes stands over you. In his hand, a pale blue crystal glowing faintly in the dark. You open your mouth to scream but nothing comes out, only the howling remains. The shadow gently puts a finger to your mouth, as if to quiet you. Then, he takes the crystal, and places it against your face. As soon as it touches you your skin lights up in pain. You begin to writhe in torment. Your entire existance flashes before your eyes. Then, there is only darkness.");
            setTimeout(function () {
              echoingScreams.play();
            }, 9000);
            echoingScreams.addEventListener("ended", function () {
              echoingScreams.play();
            });
            var continueButton = document.createElement("BUTTON"); // Create a <button> element
            continueButton.innerHTML = "Continue"; //Gives the button text
            continueButton.classList.add("dialogue_button"); //Gives the button the dialogue_button CSS style
            $(continueButton).insertBefore("#placeholder"); //Places the button in the text stream
            continueButton.addEventListener("click", function () {
              continueButton.disabled = true;
              continueButton.classList.add("disabled_button");
              echoingScreams.pause();
              currentRoom = gameData.rooms[4]
              currentRoom.description();
              Object.assign(player, fists);
              loopTwoSongs(song1, song2);
            })
          })

        },
        commands: [{
          input: 'look nothing',
          result: function () {
            print("You focus your eyes as hard as you can but can't discern anything.");
          }
        }, ]

      }, //end of strange room
      {
        name: 'strange room', //4
        look: ['old door, torch'],
        description: function () {
          print("You awake in a cold sweat. The room is tight, and dark. Thick stone everywhere you look suffocates you. Screams and manical laughter subdued by the thick walls dances all around you. Fear electrocutes you and a wild panic takes over your mind. You scream with the chorus and try to run through the darkness. It doesn\'t take long for you to slam into a wall, and fall to the floor. You sit for a moment, dazed and terrified. You tell yourself to calm down, you\'ll find your way out of this. That\'s when you notice the dark shape of a torch laying on the ground.");
          print("To take an item type 'take [item name]'", "intColor");
        },
        commands: [{
            input: 'look old door',
            result: function () {
              print("A large oak door lays before you. The screams still echoing around you, you lean closer trying to hear what may be on the other side. Ear glued to the door, your hand reaches down to grasp the latch. The door opens freely. Try typing 'open old door' to find out whats on the other side.");
            }
          },
          {
            input: 'look torch',
            result: function () {
              print("The torch lays lifeless on the ground.");
            }
          },
          {
            input: 'take torch',
            result: function () {
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
            result: function () {
              currentRoom = gameData.rooms[5];
              player.travelHistory.push(currentRoom);
              currentRoom.description();
              moveThroughDoor.play();
            }
          },
        ]

      }, //end of strange room
      {
        name: 'Library', //5
        look: ["shining object", "bookshelves", "window", "door leading south", "back to starting room"],
        description: function () {
          if (torch.owned === false) {
            print("You arrive in the western corridor. Books line the walls top to bottom, the tomes old and rotten with age. The unmistakeable scent of old books makes the room feel humid and dense. The room is dimly lit by moonlight streaming in from arched windows between the bookcases. Birds flying outside cause shadows to play throughout the room making you feel threatened and small. Every skittering shadow makes you recoil in fear, too afraid to even breathe. You vaguely remember a torch in the north room. A strange man approaches you.");
            print("'Go back, get the torch.' the robed figure croaks.", "manaColor");
          } else {
            print("You arrive in the western corridor. Books line the walls top to bottom, the tomes old and rotten with age. The unmistakeable scent of old books makes the room feel humid and dense. The room is dimly lit by moonlight streaming in from arched windows between the bookcases. Birds flying outside cause shadows to play throughout the room, making you feel threatened, but prepared. With the light of your torch, you are able to make out a shining object laying on a table in the center of the room. You hesitantly move closer. Try your 'look' command.");
            print("'I see you've made it out alive. Hope that torch comes in handy.'", "manaColor");
            print("The robed figure slowly gestures over to a sword laying on a table.");
            print("'You might need that.'", "manaColor");
            Dialogue.load('strange_follower', 'dialogue_files/strange_follower.txt');
            var continueButton = document.createElement("BUTTON"); // Create a <button> element
            continueButton.innerHTML = "Speak"; //Gives the button text
            continueButton.classList.add("dialogue_button"); //Gives the button the dialogue_button CSS style
            $(continueButton).insertBefore("#placeholder"); //Places the button in the text stream
            continueButton.addEventListener("click", function () {
              continueButton.disabled = true;
              continueButton.classList.add("disabled_button");
              conversation("strange_follower", "player");
              print("The robed figure exits the room.");

            })

          }
        },
        commands: [{
            input: 'back to starting room',
            result: function () {
              currentRoom = gameData.rooms[0];
              print("You return to the starting room.");
              print(gameData.rooms[0].description);
              moveThroughDoor.play();
            }
          },
          {
            input: 'look window',
            result: function () {
              print("You poke your head out the window. Crows soar around your head, desperate for a meal. You find yourself fighting them off, unable to get a good look outside.");
            }
          },
          {
            input: 'look shining object',
            result: function () {
              print("You approach the table carefully. You see an old, rusted sword, chipped from years of battle. Any defense at all would help stave off the fear. Try 'take sword'.");
            }
          },
          {
            input: 'look bookshelves',
            result: function () {
              print("You browse the tomes along the walls. The leatherbound books seem to be so old that you no longer recongnize the language.");
            }
          },
          {
            input: "look door leading south",
            result: function () {
              print("You walk past the rows of books to a southern door. You put your ears up to it but hear nothing but the distant screams you've heard all along. Try 'open door leading south'.");
            }
          },
          {
            input: "look empty table",
            result: function () {
              print("You look over the empty table. There seems to be nothing else of value.");
            }
          },
          {
            input: "open door leading south",
            result: function () {
              if (torch.owned === true) {
                currentRoom = gameData.rooms[6];
                currentRoom.description();
                moveThroughDoor.play();
              }
            }
          },
          {
            input: "take sword",
            result: function () {
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
        name: "Assassistants Office", //6
        look: ["end table", "chair", "bookshelves", "messy desk", "door leading west"],
        description: function () {
          print("You open the door and find yourself in a quiet room outfitted with chairs, a small end table, and even more bookshelves. The room seems to be unnaturally dark. Your torch doesn't throw as much light here.");
        },
        lockedDoor: {
          locked: true
        },
        commands: [{
            input: "look chair",
            result: function () {
              print("A large velvet chair sits before you. The deep red hue of the chair reminds you of blood. You consider sitting in it for a moment but a dark force makes you consider otherwise");
            }
          },
          {
            input: "look messy desk",
            result: function () {
              print("You look over the large desk. Stacks of old parchment dominate either end of the desk. The center is strangely clean with only one piece of paper folded neatly in half. It reads: To whomever finds this, these are my final words. 'use look' ");
              gameData.rooms[6].look.push("old note");
            }
          },
          {
            input: "look old note",
            result: function () {
              print("I can feel myself changing. Fifty years I gave this Kingdom, and fifty years I toiled over the Kings wishes. I gave him advice when he was unsure. I gave him stability in his times of distress. I did his day-to-days. I gave Generals marching orders. I was important. Now these cultists have come. The coup succeeded. They brought their wretched gems and crystals and lay close to them at night. I am not near them, but I can feel them. They whisper to me. In my dreams I see a dark cloud gathering over the hills. Soon the cloud erupts into a million blue eyed ravens who tear into me. Over and over I have suffered these nightmares. I am weak now. Too weak to go on. My skin has shrivled and my mind races with canabalistic thoughts. I feel I do not have much longer before I become deranged. Whoever finds this, I pray the Goddess of Light watches over you.");
              print("You set the note down, unsure of what to make of it. You can hear a growling behind the door at the far end of the room. Something is in there.");
            }
          },
          {
            input: "look end table",
            result: function () {
              if (skeleKey.owned === false) {
                print("The round end table seems to be made of a dark, polished hardwood. You find an empty oil lantern with busted glass, and a key. You pick up the key for a moment and hold the torch up to it. The notches seem ground down to almost nothing. Try taking it.");
              } else {
                print("There's an indent in the wood the shape of the key. As if the key had been slowly burning it's way through the table. The key seems cool to the touch.");
              }
            }
          },
          {
            input: "look bookshelves",
            result: function () {
              print("You browse the tomes along the walls, your torch barely putting forth enough light to make out the titles on the spines. Most are in a language that seems foreign to you. The letters glow a faint blue.");
            }
          },
          {
            input: "look door leading west",
            result: function () {
              if (gameData.rooms[6].lockedDoor.locked === true) {
                print("You approach the door and try to open it. Locked. Glancing through the keyhole you see only darkness.");
              } else {
                print("You look through the keyhole. You see only darkness.");
              }
            }
          },
          {
            input: "take key",
            result: function () {
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
            result: function () {
              gameData.rooms[6].lockedDoor.locked = false;
              print("The key turns easily in the lock. The clicking sound of the lock gives off an unnatural echo in the room.");
              unlockDoor.play()
            }
          },
          {
            input: "open door leading west",
            result: function () {
              if (gameData.rooms[6].lockedDoor.locked === true) {
                print("You approach the door and wiggle the handle. Locked.");
              } else {
                currentRoom = gameData.rooms[7];
                var hallwayWithered = new withered("withered", 25, 5, .12, function () {
                  combatPrint("You stand over the shattered body of the withered. His mangled hand slow unfurles revealing some gold!.");
                  combatPrint("You receive 5 gold!", "yellow");
                  combatPrint("Beneath the withereds body you find an old pot lid. You pull it from underneath the mangled corpse.");
                  combatPrint("Try to equip your new shield with 'equip makeshift shield'");
                }, 50, "A withered shambles forward, barring its menacing teeth. It leaps forwards, attacking first.");
                combat(player, hallwayWithered);
                currentRoom.description();
                moveThroughDoor.play();
              }

            }
          }
        ]
      },
      {
        name: "small hallway", //7
        look: ['barrel, dead enemy, small archway, door leading west'],
        description: function () {
          print("----- Small Hallway -----", "goldColor");
          print("You are in a small hallway. Your torch seems to emit even less light here. The smell of rotting flesh tingles your nose and makes your stomach turn over. There's a small barrel in the corner of the otherwise dangerous but unimpressive room.")
        },
        figuresSpoken: false,
        withered: true,
        commands: [{
            input: "look barrel",
            result: function () {
              if (smallHallwayBarrel.opened == false) {
                print("A large wooden barrel sits idly in the corner. The top seems slightly ajar. You wonder if you should try opening it.");
              } else {
                print("There is nothing left here but cobwebs and dust.");
              }
            }
          },
          {
            input: "open barrel",
            result: function () {
              if (smallHallwayBarrel.opened === false) {
                player.healthPotNum = player.healthPotNum = 1;
                print("You find a small vial tucked away beneath some grain. You lift it out of the barrel and hold it up to your torch. You watch the glistening red liquid swirl around in the vial momentarily before placing it in your bags.");
                print("Health potion added to inventory. You may use it during combat for 25 health points!");
                refreshPlayerStats();
                smallHallwayBarrel.opened = true;
              } else {
                print("There is nothing left here but cobwebs and dust.");
              }
            }
          },
          {
            input: "look dead enemy",
            result: function () {
              print("You look over your defeated foe. Your heart is still beating and sweat is now dripping down your face. You are out of breath and every noise now seems that much more dangerous.");
            }
          },
          {
            input: "look small archway",
            result: function () {
              print("You peek into the archway. Inside is an alter. The alter is the figure of a young girl holding out a bowl. The bowl seems filled with blood.");
            }
          },
          {
            input: "look door leading west",
            result: function () {
              if (gameData.rooms[7].figuresSpoken === false) {
                print("You peek through the keyhole. You can hear voices on the other side. Shadowy figures are pacing and speaking in muffled tones. Try using listen.");
              } else {
                print("You hold your ear up to the door but hear nothing. Looking through the keyhole you can make out red carpet, and marble columns.");
              }
            }
          },
          {
            input: "listen",
            result: function () {
              if (gameData.rooms[7].figuresSpoken === false) {
                print("You hear footsteps. Then, muffled voices.");
                print("Ah, Cassius.", "intColor");
                print("Hmm, oh, yes. Thought I'd come up here for a spell and see the birds.", "chrColor");
                print("I can't blame you. They're a beautiful sight. We do need your help downstairs however, the men are wounded and -", "intColor");
                print("You know, I butchered my own father in the massacre. Killed him with an axe to the head. Yet, I feel nothing. I know this is the end of the world. But shouldn't I feel something? Anything?", "chrColor");
                print("The two figures are silent for a moment.");
                print("These are the blessings the shards provide Cassius. The tools you need to perform your role in the second coming. Come now, we need your help.", "intColor");
                print("There are footsteps, then silence.");
                gameData.rooms[7].figuresSpoken = true;
              } else {
                print("You listen hard but hear nothing.");
              }
            }
          },
          {
            input: "open door leading west",
            result: function () {
              if (gameData.rooms[7].figuresSpoken === true) {
                moveThroughDoor.play();
                currentRoom = gameData.rooms[8];
                print(gameData.rooms[8].description);
              } else {
                print("You can hear some figures speaking outside. Try 'listen' ");
              }
            }
          },
        ]
      },
      {
        name: "Grand Hall", //8
        look: ["throne", "column", "doors leading outside", "red aisle runner", "alter", "dead crow", 'stairs leading north', 'small door', 'door leading north', 'door leading east'],
        description: "You slowly peek open the door. On the other side looks to be a throne room. It's much brighter here compared to the other rooms. You quickly extinguish your torch and hide behind one of the many columns that line the room. The ceilings here are tall and even minute sounds echo profoundly. The throne at the end of the room is large, and made of materials you've yet seen. Outside the window, a murder of crows caws ominously, desparate for food. Suddenly, something seems to slam against the large, oak doors that make up the entrance to the throne room. You hide in fear but after some time a crow slams into the window hard enough to break a small hole in the glass, and falls dead to the throne room floor. The slamming on the door continues, picking up speed as more and more birds charge into the door. Soon the orchestra of birds is so loud it consumes you. You glance around hesitantly, waiting for the figures to return. After some time you become sure enough to get a better look around the room.",
        butlersDoor: {
          locked: true
        },
        commands: [{
            input: "look throne",
            result: function () {
              print("Whoever sat here had considerable power. The fabric and metals seem to echo far away lands. On one of the arm rests is a small scroll. Behind the throne, a great red cloth, embroidered in golden tassels. You fling aside the drapes and peer behind them to find a door.");
              gameData.rooms[4].look.push("scroll");
            }
          },
	  {
	   input: 'look door leading east',
	   result: function(){
		print("You glace upon the door leading east. It's a small, three quarters wide door made of unstained maple. The iron door latch is cold to the touch. Next to the door is a large wooden club.");
		gameData.rooms[4].look.push("bludgeon");
	   }
	  },
	{
		input: 'look bludgeon',
		result: function(){
			print("A large wooden club rests against the door frame. Several nails have been punched through the recieving end giving the weapon a menacing look.");
		}
	},
		{
		input: 'take bludgeon',
		result: function(){
              if (bludgeon.owned == false) {
                bludgeon.owned = true;
                player.inventory.push("bludgeon");
                updateInvDisplay("bludgeon");
                pickUpNew.play();
		            print("You hold the bludgeon firmly in your hand, then place it in your inventory.");
		            print("You got the bludgeon! It deals only blunt damage. Useful against enemies that can't be killed with a sword!","goldColor");
              } else {
                print("You've already taken the bludgeon");
              }
		}
		},
          {
            input: "use key on door leading north",
            result: function () {
              if (butlersKey.owned == true && butlersDoor.locked == true) {
                unlockDoor.play();
                print("The key glides smoothly through the lock. The door is open.");
                butlersDoor.locked = false;
              } else if (butlersKey.owned == true && butlersDoor.locked == false) {
                print("The door is already unlocked.");
              } else {
                print("You do not have the correct key.");
              }
            }
          },
          {
            input: "open door leading north",
            result: function () {
              if (butlersDoor.locked == false) {
                moveThroughDoor.play();
                currentRoom = gameData.rooms[12];
                gameData.rooms[12].description();
              } else(print("You jiggle the latch but the door won't budge. Must be a key around here somewhere."));
            }
          },
          {
            input: "look door leading north",
            result: {
              function () {
                print("In an alcove behind the throne you find a slender oaken door with golden hinges. You jiggle the handle, but the door won't butdge.");
              }
            }
          },
          {
            input: "look scroll",
            result: function () {
              print("The scroll looks to be the oldest thing you ever seen. Upon opening you see something scrawled in ancient text. You'll need to find a way to decipher this.");
            }
          },
          {
            input: "take scroll",
            result: function () {
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
            result: function () {
              print("Tall marble columns line either side of the red carpet. Looking closer you see the columns look to have had large sections taken out of them. Some small, as if a stray blade sliced the marble. Others seem large, like an explosion had slammed into it.");
            }
          },
          {
            input: "look doors leading outside",
            result: function () {
              print("Birds continue to slam their heads into the door. It sounds as if a hailstorm is raging all around you. The sounds drown out any small noises. Feeling like something might be behind you, you turn around, but there is nothing.");
            }
          },
          {
            input: "look red aisle runner",
            result: function () {
              print("A beautiful red carpet runs central to the room leading down to the throne. The carpet is pockmarked with feathers and blood.");
            }
          },
          {
            input: "look alter",
            result: function () {
              print("A large alter similar to one you'd seen in the hallway. It looks to be a statue of a young angelic girl draped in cloth, and holding out a large basin. Her eyes are covered by the cloth, with only the curling hair falling out. You reach your head into the basin and see that even this one, as large as it is, is filled with blood.");
            }
          },
          {
            input: "look door leading west",
            result: function () {
              print("You peek through the keyhole and see a strange creature lumbering around a large room. In the center of the room looks to be a staircase leading down. The creature is tall, but hunched over, a large, glowing pack strapped to its back. Its arms stretch down to the floor and with every step the shackles on its wrist grind against the stone floor. Its mouth is agape and a blue fluid drips out slowly. Its clothes are tattered rags and whatever hair this creature may have once had has fallen out. It begins to move towards you, its glowing bright blue eyes seem fixated on the key hole. It lets out a long, low howl and tries to pick up its pace. You recoil in fear and hear the large thud of the creature slamming into the doorway.");
              shardKeeper.introSound.play();
              print("Are you sure you want to enter? Use: open door leading west");
            }
          },
          {
            input: "look stairs leading north",
            result: function () {
              print("A grand marble staircase extends upwards from behind the throne. The granite walls are speckled with torches giving way to darkness as the stairs furl upwards inevitablly meeting in the middle, somewhere above.");
            }
          },
          {
            input: "look dead crow",
            result: function () {
              print("You approach the crow slowly. It's head is still arcing slowly from side to side, it's eyes slowly transforming into a bright blue hue. Its feathers are ragged and worn. Its chest, bald from over pruning. The claws, worn down to stumps. What happened to this bird?");
            }
          },
          {
            input: "look small door",
            result: function () {
              print("While looking through the alcoves that line the walls you come across a small, rectangular door with no lock. You crack the door open and peer inside. It seems to be another small library, similar to the first that you found.");
            }
          },
          {
            input: "open small door",
            result: function () {
              moveThroughDoor.play();
              currentRoom = gameData.rooms[9];
              gameData.rooms[9].description();
            }
          },
          {
            input: "climb stairs leading north",
            result: function () {
              moveThroughStairs.play();
              currentRoom = gameData.rooms[10];
              gameData.rooms[10].description();
              console.log(Dialogue.dialogues);
            }
          },
        ] //end of commands
      },
      {
        name: "Thaddius' Shrine", //9
        look: ["pedestal", "bookshelves", "note", "wall writing", "corpse", "sky light", "smouldering scroll", "back to the grand hall"],
        description: function () {
          if (shrine_withered.is_alive == true) {
            print("You find yourself in a small library, the walls lined with shelves. In the center of the room you see a bright light shining down upon a wooden pedestal. There seems to be no other lights or windows in the room other than the skylight. In the far corner of the room one of the bookshelves had been toppled over leaving a mess of books and loose pages. A corpse lays in a crumpled heap over top the shelf, papers below still drinking the blood oozing out. Above the corpse stands a withered, breathing heavily. Its chest growing and shrinking as it shovles in the air. The withered turns its head to see you, glowing blue eyes and grey emaciated jaw dripping with blood. In the stillness before battle, while both combatants process each other, you watch a single drop of blood fall from its face to join the pool below. Your hand moves naturally to the sword on your belt. You draw your blade as it charges.");
          } else {
            print("You find yourself in a small library, the walls lined with shelves. In the center of the room you see a bright light shining down upon a wooden pedestal. There seems to be no other lights or windows in the room other than the skylight. In the far corner of the room one of the bookshelves had been toppled over leaving a mess of books and loose pages. A corpse lays in a crumpled heap over top the shelf, papers below still drinking the blood oozing out.");
          }
          setTimeout(function () {
            if (shrine_withered.is_alive == true) {
              combat(player, shrine_withered);
              shrine_withered.is_alive = false;
            }
          }, 22000);
        },
        commands: [{
            input: "look pedestal",
            result: function () {
              if (cipher.owned === true) {
                print("The pedestal seems to be made out of living wood. A vine curls along the stand ending in two small leaves basking in the moonlight streaming in from above. On the pedestal sits a dark book bound in a rough, black skin. A strange rune lays in the center of the book, with an unreadable text swirling below it. You reach over and open the book. On the first page you find a key to the strange text laid out in scrawled handwriting by some dutiful notetaker. It seems to be a cipher. The rest of the book is in the old writing you found in the scroll. ");
              } else {
                print("The pedestal seems to be made out of living wood. A vine curls along the stand ending in two small leaves basking in the moonlight streaming in from above. On the pedestal sits a dark book bound in a rough, black skin. A strange rune lays in the center of the book, with a strange text swirling below it. You reach over and open the book. On the first page you find a key to the strange text laid out in scrawled handwriting by some dutiful notetaker. It seems to be a cipher. You wonder what use this book might be.");
              }
            }
          },
          {
            input: "take cipher",
            result: function () {
              if (cipher.owned == false) {
                cipher.owned = true;
                player.inventory.push("cipher");
                updateInvDisplay("Cipher");
                pickUpNew.play();
                print("You gently pick up the book. The text begins to glow a faint blue but subsides. You feel a strange courage welling up within you.");
              } else {
                print("You've already taken the cipher");
              }
            }
          },
          {
            input: "take robe",
            result: function () {
              if (cultistRobe.owned == false) {
                cultistRobe.owned = true;
                player.inventory.push("Cultist Disguise");
                pickUpNew.play();
                updateInvDisplay("Cultist Robes - Armor");
                print("You struggle to pull the robes off of the dead cultist. Luckly the robe's color is already one similar to the color of blood. No one should notice, you hope. Equip with 'equip cultist disguise'.");
              } else {
                print("You've already taken the cultists robes.");
              }
            }
          },
          {
            input: "look bookshelves",
            result: function () {
              if (cipher.owned === true) {
                print("These books somehow seem older than the other books you've seen thus far. Most are bound in an unfamiliar black leather that warms your hands when you hold them. None of the books seem to have titles on the spine, or on the front. After flipping through a few you find most to only have the first few pages written in, and the rest are blank. You decipher an excerpt from one: 'The demonic influence radiates from the shards. Nothing can contain them. If we are to protect this world from the cults that spring up around where these evil seeds are sown, we must destroy them. Only Rain knows how we'll break this curse.' You close the book.");
              } else {
                print("These books somehow seem older than the other books you've seen thus far. Most are bound in an unfamiliar black leather that warms your hands when you hold them. None of the books seem to have titles on the spine, or on the front. After flipping through a few you find most to only have the first few pages written in, and the rest are blank. You need some sort of cipher.");
              }
            }
          },
          {
            input: "look note",
            result: function () {
              print("You find a small note laying on one of the bookshelves. It reads: 'Cassius, I know you tried to follow in the ways of Umbril but ultimately your heritage betrays you. You are the true keeper of the shard and I do not dispute that. You must see the error of your ways. Should we destroy it, we may well have nothing left to fight for. I have sat next to the shard for many nights praying to Umbril for guidance and to lose that would be devistating.'");
            }
          },
          {
            input: "look wall writing",
            result: function () {
              print("The writing on the wall is written in blood. Small drops that have yet to dry are running down to the floor. It reads: 'All is lost without th...' It doesn't seem like the writer had time to finish.");
            }
          },
          {
            input: "look corpse",
            result: function () {
              print("After examining the body you find that the corpse still seems fresh. Its eyes has yet to turn the blueish hue you'd seen in the birds eyes. Its hands are curled violently as if he'd been struggling to hold onto something during his demise. He is dressed in grey and red robes with multiple puncture marks in the chest, and back. It seems like whoever this was, he was assassinated. You wonder for a moment if the robe would be any use to you in case you run into any cultists that are living.");
            }
          },
          {
            input: "look smouldering scroll",
            result: function () {
              print("Within the bookshelves you find a small pile of embers but they are cool to the touch. It's a scroll. I'd like to rewrite this, sorry.");
            }
          },
          {
            input: "take smouldering scroll",
            result: function () {
              fireBall.playerHas = true;
              print("There should be something better written here but the gist is that you can now sling fireballs. Whoopee!");
            }
          },
          {
            input: "look sky light",
            result: function () {
              print("Light streams in from a small dome in the ceiling. Standing in the light calms you. You stand for a moment, soaking in the light before realizing that the light is a different color than the light coming from the windows in other rooms. Whatever is making this light, it's inside the building.");
            }
          },
          {
            input: "back to the grand hall",
            result: function () {
              moveThroughDoor.play();
              currentRoom = gameData.rooms[8];
              if (player.armorName == "Cultist Disguise") {
                Dialogue.load("Unknown Brother", "dialogue_files/brother_1.txt");
                print("You see a robed figure standing ominously still in the room. His hand slowly moving up and down the pockmarked column. He is silent.");
                var continueButton = document.createElement("BUTTON"); // Create a <button> element
                continueButton.innerHTML = "Speak"; //Gives the button text
                continueButton.classList.add("dialogue_button"); //Gives the button the dialogue_button CSS style
                $(continueButton).insertBefore("#placeholder"); //Places the button in the text stream
                continueButton.addEventListener("click", function () {
                  continueButton.disabled = true;
                  continueButton.classList.add("disabled_button");
                  conversation("Unknown Brother", "player");
                  print("The robed figure exits the room.");

                })
              } else if (player.armorName != "Cultist Disguise") {
                print("You see a robed figure standing ominously still in the room. His hand slowly moving up and down the pockmarked column. You draw away slowly and close the door quietly, as not to rouse suspicion.");
              }
            }
          },
        ]
      },
      {
        name: "Ornate Chambers", //10
        look: ["bed", "dresser", "vase", "frantic cultist", "painting", "silver serving tray", "small antechamber", "end table", "back to the grand hall"],
        description: function () {
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
            currentRoom = gameData.rooms[8];
          }
        },
        commands: [{
            input: "look bed",
            result: function () {
              print("You look over the largest bed you've ever seen. A tall, pearl white canopy extends upwards towards the ceilng, capped with golden finials. Golden drapes glisten gently in the torch light. You pull the drapes back gently to find the bedding tousled into a messy lump. Whoever slept here didn't have the time to make the bed. Upon the pillow, a silver serving tray, with half a breakfast molding. Looking underneath you see a small chest with a skull emblazened on it.");
              gameData.rooms[10].look.push("small chest");
            }
          },
          {
            input: "look silver serving tray" || "look serving tray" || "look tray",
            result: function () {
              print("What once was a breakfast suited for nobility is now rotten, and molding. Beside it, a yellow parchment, delicately folded in half. You open the letter.");
              print("Sire, please do not alert the Queen to what I am now about to write. While doing my rounds last night I came upon your brother having a conversation with a man who is known about the town to be a shady character. This may be, and probably is nothing but there's nothing going on in this castle that you shouldn't be privy to.", "manaColor");
              print("As you set the letter down you notice a brass key laying on tray. Upon the handle, the royal crest.");
            }
          },
          {
            input: "take key",
            result: function () {
              print("You swiftly pocket the key.");
              butlersKey.owned = true;
              updateInvDisplay("butlers key");
            }
          },
          {
            input: "look frantic cultist",
            result: function () {
              print("You look over at the cultist as he paces he room. At seemingly random intervals he pulls open a drawer and mutters to himself inaudiably. He seems to be searching for something. He's staying far from the door to the small antechamber on the right side of the room. Periodically, scratches and screams erupt from the door before being replaced be a slow, agonizing moan into nothing. The cultist looks over to you.");
              print("'You gonna help? Or what?'", "manaColor");
            }
          },
          {
            input: "look vase",
            result: function () {
              print("Dead roses fold over the edges of the vase, each black rose dropping gnarled petals upon the dresser. The vase itself is decorated with a scene that encircles the bulb of the hydria. You turn the vase delecately, trying to examine the entire scene, while petals rain down.");
              print("A man stands over a vast field, mountains standing tall in the background. The field is full of men with spears. Next, the man stands over a large purple pool that rests atop a mountain. He is inside a decorated throne room, not unlike the one in this castle, but the back wall is black with two red eyes dominating the darkness. Lastly the man is in bed, surrounded by loved ones. He's holding his stomach in pain.");
            }
          },
          {
            input: "look dresser",
            result: function () {
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
            result: function () {
              print("A simple painting of a rainy field. There are boars giving birth to a human child. Human women surround them, rejoicing. What could that mean?");
            }
          },
          {
            input: "back to the grand hall",
            result: function () {
              moveThroughDoor.play();
              currentRoom = gameData.rooms[8];
              print("You climb down the stairs slowly. As you round the final stairs you find the grand hall to be empty. The onslaught of the crows pounding against the main gates continues.");
            }
          },
          {
            input: "look small antechamber",
            result: function () {
              print("Something inside is growling and scratching at the door. It seems in pain. Periodically it screeches and pounds against the door, the frame doesn't look like it can hold on much longer.");
            }
          },
          {
            input: "look end table",
            result: function () {
              print("A dusty end table filled with half burnt candles. No one cared to clean up after themselves. Inbetween two melted candles you notice a ripped piece of parchment. You look back at the cultist who seems distracted his distraught search. You open it carefully: ");
              print("When he finally returns, we will be acosted by the crows. Do not let them in. When we weather his storm we will be blessed by him. When we are the sole survivors we will fall into his graces and be made whole in his eyes. Do not lose faith. We've lost many, but those who remain are strong enough to survive his embrace", ".blue-text");
            }
          },
          {
            input: "speak",
            result: function () {
              conversation("Frantic Cultist", "player_1");
            }
          },
          {
            input: "open small antechamber",
            result: function () {
              combat(player, antechamber_withered);
              print("The cultist looks at you with admiration.");
              print("I didn't think you'd be able to do that! Those things are way more difficult to fight than highly flammable birds.", "manaColor");
            }
          },
          {
            input: "look small chest",
            result: function () {
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
        name: "Trial of the ShardKeeper", //11
        shardKeeperDead: false,
        description: function () {
          print("You enter the room quietly as the Shardkeeper turns to face his back to the door. You're in a small hall leading west. There's a small spiral staircase embedded into the wall on the far side of the room. What was once just a corridor is now a staging area for tending to wounded cultists, and arming those who have yet to fight. The left side of the hall is covered in barrels, half are opened with their contents spewn upon the floor. The right side of the room is lined with weapon, and armor racks. All seem broken, and in disrepair after the battle. The shardkeeper begins to turn to face you. If you do not have the cipher, and the disguise, you should turn back. What do you do?");
          print("Hide among the barrels.");
          if (playerArmor == cultistRobe) {
            print("Disguise: Try to walk past.");
          }
          print("Fight the shardkeeper.");
          print("Turn back");
        },
        commands: [{
            input: "fight the shardkeeper",
            result: function () {
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
            result: function () {
              print("Just before the shardkeeper turns around you dart behind one of the barrels. It looks as if it were once filled with bandages, now long bloodied, and thrown out. You peek your head over to see the shardkeeper coming through the hall. His mouth is dripping with a vile blue substance, his skin is gray, and stretched. His wrists grind against the stone with every step. As he gets closer you notice a small, shining purple gem imbedded into his forehead.");
              print("What do you do?");
              print("Fight the shardkeeper.");
              print("Move to the next barrel.");
              print("Try to dislodge the gem.");
            }
          },
          {
            input: "move to the next barrel",
            result: function () {
              print("You wait for the shardkeeper to pass and try to move quietly over a small crate. As you lift your foot to step over the shardkeeper stops, and you freeze. You notice footsteps coming up the staircase. After some time two figures in deep red robes appear from beneath. They're chatting.");
              print("Listen to the mens conversation.");
              if (serum.owned == true) {
                print("Throw the serum.");
              }
            }
          },
          {
            input: "throw the serum",
            result: function () {
              if (serum.owned == true) {
                print("You brace yourself for a moment before pulling the serum out of your bag slowly. The viscous blue liquid bubbles angrily. You hold your breath, and hurl the vial at the men. The shardkeeper lets out an frenzied howl and charges the men. They're only able to let out screams as the monster tears into them. You spring out from the boxes as the keeper is preoccupied and make your way briskly down the stairs.");
                currentRoom = gameData.rooms[8];
                print(currentRoom.description);
              } else(print("Invalid response."));
            }
          },
          {
            input: "listen",
            result: function () {
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
            result: function () {
              print("You move your way slowly the rest of the way across the chamber. Once the keeper has moved far enough away from you, you slip into the darkness of the staircase.");
              currentRoom = gameData.rooms[8];
              print(currentRoom.description);
            }
          },
          //hostile options
          {
            input: "try to dislodge the gem",
            result: function () {
              print("You leap at the shardkeeper as his back is turned. Grabbing him by the shoudlers you lift yourself up and wrap your fingers around the gem. Pulling hard the gem begins to dislodge. The shardkeepers screams, clawing at your arms trying to pull you off. Finally, the gem becomes dislodged and the shardkeeper crumbes beneath you. You fall hard to the ground but the shardkeeper does not move. You look at the vibrant purple gem for a small while before stuffing it into your bags, and hurrying down the stairs.");
              currentRoom = gameData.rooms[8];
              print(currentRoom.description);
            }
          },
          {
            input: "turn back",
            result: function () {
              currentRoom = gameData.rooms[8];
              print("As you move to exit the Shardkeeper notices you. It lets out shrill scream and bounds towards you, each long leg stomping against the cold stone. Its mouth stretches down to his chest, a wide, gaping blue hole that seemed filled with the blue liquid. As it gets halfway across the hall you manage to get the door open, and slip through. Just as you get through, the shardkeeper reaches you, slamming its body against the door. It slams shut with a a shattering echo that plays across the grand hall. Sweat is pouring down your face. You're safe, for now.");
            }
          },
          {
            input: "try to walk past",
            result: function () {
              print("You stand up from your kneeling position and straighten your collar. You breath deeply and mentally prepare yourself. You stride towards the Shardkeeper with all the confidence you can muster. The Shardkeeper stops in its tracks and slowly turns to meet your gaze. You hold your breath. It sniffs you for a moment. Nostils flaring. What do you do?");
              print("Stand still");
              print("Keep walking");
            }
          },
          {
            input: "stand still",
            result: function () {
              print("The keeper sniffs you for a moment. Ever hair on your body stands stands on end as he places his hand on your shoulder. The liquid drips from his mouth and lands on your robe, burning small holes. Finally, he pushes you along. You look back only once as you decend down the stairs.");
              currentRoom = gameData.rooms[8];
              print(currentRoom.description);
            }
          },
          {
            input: "keep walking",
            result: function () {
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
        name: "Royal Dressing Room", //12
        look: ["cloak", "wardrobe", "hunting garb", "dresser", "cheval mirror", "ornate rug", "back to the grand hall"],
        description: function () {
          print("----- Royal Dressing Room -----", "goldColor");
          print("You enter the room slowly, peeking around the door. In the room, examining a large, marble bust of the king is one of the cultists. In an attempt to be confident you approach the man but as you draw near his arm flings out, and stiff arms you in the chest. He slowly turns to face you, revealing the strange man who spoke to you after you woke.");
          print("Ah, you again. I see you've gotten some robes. Good! This is good progress.", "manaColor");
          print("Dumbfounded, you open your mouth to speak, but are interupted by a group of cultists entering the room.");
          print("You found it yet?", "chrColor");
          print("The man you met looks you in the eye for moment and grins before addressing the cultists.");
          print("Nothing yet Brother, I'll find it in time, always do.");
          print("You better, Ambrosianus needs it by sunrise.", "chrColor");
          print("The man you met before simply nods in affirmation, then continues examing the bust, as if you didn't exist.");
          print("Again, you open your mouth to speak but the man shushes you.");
          print("Much work to do boy, much work.", "manaColor");
        },
        healthPotTaken: false,
        swordTaken: false,
        manaPotTaken: false,
        noteShown: false,
        commands: [{
            input: "look cloak",
            result: function () {
              print("A cloak is hanging by a hook drilled into the cold, white marble of the dressing room. The cloak is made from a leather finer than you've ever felt. It is rimmed in thick wolves fur and carved into the center, the royal crest. It looks warm, and inviting.");
            }
          },
          {
            input: "take cloak",
            result: function () {
              print("As you wrap yourself in the leather cloak, you begin to feel more safe.");
              print("You are now able to brave the cold!", "intColor");
              player.coldDefence = true;
            }
          },
          {
            input: "show note",
            result: function () {
              if (noteUnderRug.deciphered == true) {
                print("You show the note to the old man, who rips it from your hands. He reads it for a moment, then steps aside motioning you to the bust.");
                print("All yours boy. You win this time.", "manaColor");
                currentRoom.noteShown = true;
              } else if (noteUnderRug.owned === true && noteUnderRug.deciphered === false) {
                print("The old man looks at the note for a moment, then gives it back without saying a word.");
              } else {
                print("You have nothing to show him.");
              }
            }
          },
          {
            input: "turn bust east", //find shard
            result: function () {
              if (currentRoom.noteShown == false) {
                print("There is nothing to do.");
              } else {
                print("----- Finding the secret -----", "goldColor");
                print("You step up to the bust of the King, then look over to the old man whose waiting impatiently.");
                print("Go on then.", "manaColor");
                print("You take the king by his marbled cheeks and torque him to the east. There's some resistance but soon it gives and he begins to turn on his own. While he turns, the wall behind him begins to lift with a great rumble, dust and debris cascading to the imaculate floor below.");
                print("Ahhh, very good. Even I couldn't have guess the king would have been intelligent enough to instal a hidden chamber", "manaColor");
                print("The walls accent finishes revealing a pitch black chamber. You light your torch.");
                print("Your torch comes to life revealing a pale blue stone laying dorment atop a stone pedistal. As you reach out your hand to grab it, the old man grips you firmly by the shoulder.");
                print("Ah ah, I'd be careful with that. You're not one of the usual men. I don't know what will happen to you.", "manaColor");
                print("What do you mean? What could happen to me?", "agiColor");
                print("Could be horrible, could give you extreme powers. Most of us disagree.", "manaColor");
                print("Whose us, and why am I special?", "agiColor");
                print("It's not really my place to answer either of those questions. What I do know is that you'll eventually have to grab that stone. When is a more complicated question but eventually, it is certain.", "manaColor");
              }

            }
          },
          {
            input: "take stone", //find umbril, go mad.
            result: function () {
              print("----- We Don't Know What Happens To People Like You -----", "goldColor");
              print("You steel yourself for a moment before reaching out your hand.");
              print("I'll see you on the other side Jack, good luck.", "manaColor");
              print("As your hand grips the stone you feel an electric shock stream up your arm and find rest in your head. You fall hard to the rug begin to hum uncontrollably while your body shifts uncomfortably on the ground.");
              print("You look up to the old man for support, but he has gone and been replaced by a withered who leaps towards you but dissapates into a swarm of crows. They flap about the room, screaming the sounds of those who are tortured.");
              print("You try to scream along with them, but hear and feel nothing. You feel yourself being pulled and soon you are standing. The room is now bright, lit by the fires of the birds erupting into bright blue flames.");
              print("Then there is silence, if only for a moment before being replaced by a hundred voices all whispering in unison.");
              print("Jack", "chrColor");
              print("The whispers hit your ears like so many ants, crawling in and out of your skull taking pieces off with them to some unknown place to be consumed by some unknown magic. ");
              print("As your mind begins to unravel the dressing room begins to stretch and elongate until it is an infinite hallway and in the center, a blue light shines, beckoning you forward.");
              print("Come to me Jack, it is time.", "chrColor");
              print("You struggle to speak. 'Who are you?'", "agiColor");
              print("I am your god Jack", "chrColor");
              print("Suddenly you are shot like an arrow down the room, careening towards the light.");
              print("As you fly the voices assault you, peeling your consciousness back until it finds what it is looking for.");
              var continueButton = document.createElement("BUTTON"); // Create a <button> element
              continueButton.innerHTML = "Relent"; //Gives the button text
              continueButton.classList.add("dialogue_button"); //Gives the button the dialogue_button CSS style
              $(continueButton).insertBefore("#placeholder"); //Places the button in the text stream
              continueButton.addEventListener("click", function () {
                continueButton.disabled = true;
                continueButton.classList.add("disabled_button");
                print("It would be cool if this text appeared slowly onto the screen.", "intColor");
                print("You see your mother.");
                print("She is screaming your name.");
                print("You try to run to her but your legs are stiff, as if you are in a dream.");
                print("She is being dragged away by two men in armor.");
                print("She screams your name again. Tells you to run, but you can't.");
                print("The men began to stomp on her face.");
                print("Her screaming gets louder.");
                print("You try to cover your ears but it does nothing to stop the screams.");
                print("They continue until your mother wont scream any more.");
                var keepGoing = document.createElement("BUTTON"); // Create a <button> element
                keepGoing.innerHTML = "Relent"; //Gives the button text
                keepGoing.classList.add("dialogue_button"); //Gives the button the dialogue_button CSS style
                $(keepGoing).insertBefore("#placeholder"); //Places the button in the text stream
                keepGoing.addEventListener("click", function () {
                  keepGoing.disabled = true;
                  keepGoing.classList.add("disabled_button");
                  print("----- A World You've Never Dreamed -----", "goldColor");
                  print("You're back.");
                  print("Your mind is clear but your eyes show nothing but darkness.");
                  print("Welcome Jack, welcome to my world.", "chrColor");
                })
              })

            }
          },
          {
            input: "look wardrobe", //Find mana potion
            result: function () {
              print("Next to the dresser in the room is a matching wardrobe, the sides etched in impressively delicate copper filigree.");

            }
          },
          {
            input: "back to the grand hall",
            result: function () {
              moveThroughDoor.play();
              currentRoom = gameData.rooms[8];
              print("You are back in the grand hall.");
            }
          },
          {
            input: 'open wardrobe',
            result: function () {
              print("You open the dresser and glance around the bright green silken coats and ties. Out of the corner of your eye you notice a glass vial protruding from one of the pockets. You lift it carefully and examine the contents. A deep navy hued liquid swirls and plays with the ambient light of the room in a way you've never seen. Holding your torch up to the liquid you notice that the light exits the vial with a greater intensity than it entered.");
              print("The old man speaks up.");
              print("Oooh, very nice very nice. You'll want that.", "manaColor");
              print("And what is it?", "agiColor");
              print("A very curious elixer made from a plant that grows father north than you'll ever care to venture. Drink it when you're tired, it'll set you straight. I think you'll find it useful.", "manaColor");
              print("You nod, and pocket the potion.");
              print("You got a mana potion! Use in combat for 25 mana points!", "goldColor");
              player.manaPotNum = player.manaPotNum + 1;
              refreshPlayerStats();
            }
          },
          {
            input: "look hunting garb", //Find sword
            result: function () {
              if (currentRoom.swordTaken == false) {
                print("In the corner of the room, tucked into a small alcove you see a bundle of gear, clearly dropped by hurried hands. Most of the clothing here is simply thin, flamboyantly colored silk, not useful to you. Leaning on the corner of the marbled brick walls you see a hunting sabre, sheathed in an almost black leather.")
                currentRoom.look.push('hunting sabre');
              } else(print("In the corner of the room, tucked into a small alcove you see a bundle of gear, clearly dropped by hurried hands. Most of the clothing here is simply thin, flamboyantly colored silk, not useful to you."));
            }
          },
          {
            input: 'look hunting sabre',
            result: function () {
              print("Leaning on the corner of the marbled brick walls you see a hunting sabre, sheathed in an almost black leather.");
            }
          },
          {
            input: 'take hunting sabre',
            result: function () {
              if (currentRoom.swordTaken == false) {
                print("You gently pick it and feel the weight of the blade in your hands. With great anticipation building in your chest you pull the sword from the sheath to reveal a steel polished to a mirrored surface tapering down to a sharp point. You breathe a sigh of relief.");
                print("You got the royal sabre! Equip with 'equip royal sabre'");
                royalSabre.owned = true;
                currentRoom.swordTaken = true;
              } else(print("There are no more swords to take."));
            }
          },
          {
            input: "look dresser", //Find health potion
            result: function () {
              print("A dresser made from a pale gray wood. The handles, copper and stamped with the royal crest. Atop if you see a a bright green skullcap and matching patterned scarf with gold flourishes.");
            }
          },
          {
            input: 'open dresser',
            result: function () {
              if (currentRoom.healthPotTaken == false) {
                print("You leaf through the dresser for some time. Beneath a pair of pants you see a familiar color, the color of a health potion. You pocket it gratefully.");
                currentRoom.healthPotTaken = true;
                player.healthPotNum = player.healthPotNum + 1;
                refreshPlayerStats();
              } else(print("You dig around some more, but find nothing of value."))
            }
          },
          {
            input: "look cheval mirror", //See yourself
            result: function () {
              print("A tall beautiful mirror that reflects you from your feet to the top of your head. You look into your eyes for the first time since you came here. You look shattered. Broken. Your hands, dirty, your fingernails caked in a blue coagulated blood and grime. You look down to your bare feet which are nearly black with soot and dirt. While examining your feet you notice a piece of parchment sticking out from underneath the rug.");
            }
          },
          {
            input: "look ornate rug",
            result: function () {
              print("A beautiful rug embroidered in bold green tassels. The rug, in imaculate an imaculate crosstitch, seems to depict a scene similar to the one you found in the royal quarters. There's a rainy field and in the center, women praising a newborn child. ");
            }
          },
          {
            input: "look under ornate rug", //use cipher on parchment and show it to the robed helper man who will tell you to move the bust. Moving the bust reveals a hidden door. Inside that door is the shard. As you place your hands around it. You go crazy.
            result: function () {
              print("Under the rug you find a weathered piece of parchment. You open it and try to decipher the odd language. You'll need something to decipher this.");
              print("You got the undeciphered note!", "goldColor");
              noteUnderRug.owned = true;
              player.inventory.push("undeciphered note");
            }
          },
          {
            input: "look bust", //see scratch marks
            result: function () {
              print("A marbled bust of the King standing on a stone pedestal. The old man seems very intrigued by it.");
            }
          }
        ]
      }, //end of room 12 commands
      {
        name: 'cramped hallway', //13
        look: ['door leading east, sconce'],
        description: function () {
          print("You awake in a cold sweat. The room is tight, and dark. Thick stone everywhere you look suffocates you. Screams and manical laughter subdued by the thick walls dances all around you. Fear electrocutes you and a wild panic takes over your mind. You scream with the chorus and try to run through the darkness. It doesn\'t take long for you to slam into a wall, and fall to the floor. You sit for a moment, dazed and terrified. You tell yourself to calm down, you\'ll find your way out of this. That\'s when you notice the dark shape of a torch laying on the ground.");
          print("To take an item type 'take [item name]'", "intColor");
        },
        commands: [{
            input: 'look old door',
            result: function () {
              print("A large oak door lays before you. The screams still echoing around you, you lean closer trying to hear what may be on the other side. Ear glued to the door, your hand reaches down to grasp the latch. The door opens freely. Try typing 'open old door' to find out whats on the other side.");
            }
          },
          {
            input: 'look torch',
            result: function () {
              print("The torch lays lifeless on the ground.");
            }
          },
          {
            input: 'take torch',
            result: function () {
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
            result: function () {
              currentRoom = gameData.rooms[5];
              player.travelHistory.push(currentRoom);
              currentRoom.description();
              moveThroughDoor.play();
            }
          },
        ]

      }, //end of room 13
    ]
  }; //end of gameData

  //places the player in the starting room.
  currentRoom = gameData.rooms[0];

  function attachListeners() {
    //  Event listeners
    document.getElementById('useWeapon').addEventListener("click", useWeapon, false);
    document.getElementById('useFireball').addEventListener("click", function () {
      useDamageSpell(fireBall)
    }, false);
    document.getElementById('useIce').addEventListener("click", function () {
      useDamageSpell(iceShard)
    }, false);
    document.getElementById('useHealthPot').addEventListener("click", useHealthPot, false);
    document.getElementById('backToGame').addEventListener("click", backToGame, false);
    document.getElementById('startGame').addEventListener("click", startGame, false);
    document.getElementById('useStun').addEventListener("click", stunSpell, false);
    document.getElementById('useExplosion').addEventListener("click", useExplosion, false);
  }

  //prints out input to screen
  function print(input, color) {
    $("<p class='text-center " + color + "'>" + input + "</p>").insertBefore("#placeholder");
    //reset textbox
    $("#commandline").val("");
    $("html, body").animate({
      scrollTop: $(document).height()
    }, 200);
  }

  function dialogueButton(input, speaker) {
    var name = document.createElement("BUTTON"); // Create a <button> element
    name.innerHTML = input; //Gives the button text
    name.classList.add("dialogue_button"); //Gives the button the dialogue_button CSS style
    $(name).insertBefore("#placeholder"); //Places the button in the text stream
    name.addEventListener("click", function () {
      conversation(speaker, "player_1");
      name.disabled = true;
      name.classList.add("disabled_button");
    })
  }

  attachListeners();


  $("#commandline").keypress(function (e) {
    if (e.keyCode === 13) {
      var roomCmd = currentRoom.commands;
      var input = $("#commandline").val().toLowerCase();

      //prints out current room
      if (input == "room") {
        print(currentRoom.name);
        console.log(currentRoom.name);
      }

      //prints out user inventory
      if (input == "inventory") {
        enterInventoryMenu();
      }


      //BEGIN SHIT THAT NEEDS TO GO
      //skip to castle
      if (input == "skip") {
        currentRoom = gameData.rooms[12];
      }

      if (input == "give mace") {
        Object.assign(player, steelMace);
      }

      //fight testing to be removed
      if (input == "fight") {
        var testRat1 = new rat("Large Rat 1", 50, 50, 0.1,
          function () {
            combatPrint("You recieved 50 gold and 50xp!");
          }, 50, "The large rat looks up to you from the corner of the room. Its teeth are barred.", 5);
        var testRat2 = new rat("Large Rat 2", 50, 50, 0.1,
          function () {
            combatPrint("You recieved 50 gold and 50xp!");
          }, 50, "The large rat looks up to you from the corner of the room. Its teeth are barred.", 5);
        steelMace.owned = true;
        claymore.owned = true;
        combat(player, testRat1, testRat2, "rats");
      }

      if (input == "single fight") {
        combat(player, fieldrat, null, null);
      }

      if (input == 'god mode') {
        player.agility = 100;
        player.intelligence = 100;
        player.strength = 100;
        Object.assign(player, claymore);
        Object.assign(player, aeleasbulwark);
        Object.assign(player, rainsPlate);
        refreshPlayerStats();
        refreshPlayerEffecttingStats();
      }

      //END SHIT THAT NEEDS TO GO

      //audio commands
      if (input == "stop audio") {
        audioControl(true);
        print("All audio muted");
      }

      if (input == "play audio") {
        audioControl(false);
        print("All audio unmuted");
      }

      //use commands that can be taken place in any room.
      if (input == "use cipher on scroll" && cipher.owned === true && throneScroll.owned === true) {
        print("You open up the cipher, and begin work on the scroll. After some time you work out the message. It reads: 'Thaddius on the ways of man: We must follow in the footsteps of Rain and follow his three rules, which are as follows. One: Do not succumb to the powers of idols. This serves only to cause war. Two: Do not war against another man. This serves only to empower Umbril and his creatures. Three: Do not give into the influences Umbril. This serves only to end mankind.' ", "parchmentColor");
        return;
      }
      if (input == "use cipher on undeciphered note" && cipher.owned === true && noteUnderRug.owned === true && noteUnderRug.deciphered === false) {
        print("You open up the cipher, and begin work on the note. After some time you work out the message. It reads: 'Sire, I've put together that contraption you requested. Should you ever need access to it, you only need to turn your likeness until it faces east. I do hope it serves you well. P.S. - Since I'm already going to go through the trouble of encrypting this message, I feel like this would be a good time to ask for a small raise in my pay? My girl will be coming into school age soon and I'd like to send her somewhere nice.", "parchmentColor");
        print("You consider showing the note to the old man.");
        noteUnderRug.deciphered = true;
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
      if (input == "equip wooden mallet" && woodenMallet.owned === true && player.strength >= woodenMallet.reqStrength) {
        print("You firmly grip the mallet in your hands and sigh. Better than nothing..");
        player = Object.assign(player, woodenMallet);
      } else if (input == "equip wooden mallet" && woodenMalet.owned === false) {
        print("You do not own the weapon 'wooden mallet'");
      }

      //royal sabre
      if (input == "equip royal sabre" && royalSabre.owned === true && player.strength >= royalSabre.reqStrength) {
        print("You bounce the sabre in your hands, feeling its exquisite balance.");
        player = Object.assign(player, royalSabre);
      } else if (input == "equip royal sabre" && royalSabre.owned === false) {
        print("You do not own the weapon 'royal sabre'");
      }

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
      } else if (input == "consider serum" && serum.owned === true) {
        print(serum.condition);
      }

        //To be removed
        if(input == 'levelup'){
          levelUpCheck(200);
          print("Woot");
        }


      //reset textbox
      $("#commandline").val("");
    }
  });
  //STATS Here
  //LEVEL UP
  var toLevelUp = [200, 1000, 2000, 5000, 8000, 12000];
  var xpPoints = 5;

  function levelUpTime(){
    $('#console').fadeOut(50);
    $("#levelUpMenu").fadeIn(100);
    $("#pointsRemaining").html(String(player.pointsToSpend));
  }

  function doneLeveling(){
    $('#console').fadeIn(50);
    $("#levelUpMenu").fadeOut(100);
  }

  function levelUpCheck(xp) {
    if (toLevelUp[0] <= xp) {
      player.level = player.level + 1;
      player.pointsToSpend = player.pointsToSpend + xpPoints;
      print("You've hit level " + player.level + "!", "yellow");
      toLevelUp.shift();
      levelUpTime();
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

  //BEGIN MULTI BATTLE TEST



  function scrollSmoothToBottom(id) {
    var div = document.getElementById(id);
    $('#' + id).animate({
      scrollTop: div.scrollHeight - div.clientHeight
    }, 500);
  }

  function combatPrint(input, color) {
    $("#combatOutput").append("<p class='text-center'" + color + ">" + input + "</p>");
    scrollSmoothToBottom("combat");
  }
  //  Combat section
  //checks if the game is over by comparing health

  function gameOverCheck() {
    if (player.health <= 0) {
      combatPrint("You lose. Refresh to try again.");
      return true;
    }
    if (doubleFight == true) {
      console.log("Double fight end game check was made.");
      if (firstEnemy.health <= 0 && secondEnemy.health <= 0) {
        isGameOver = true; //to be removed
        combatPrint("You've defeated the " + groupName + ".");
        var xpGain = firstEnemy.xp + secondEnemy.xp;
        combatPrint("You gain " + xpGain + "XP!");
        player.xp = player.xp + xpGain;
        levelUpCheck(player.xp);
        refreshPlayerStats();
        player.gold = player.gold + firstEnemy.goldReward + secondEnemy.goldReward;
        refreshPlayerGold();
        $("#backToGame").fadeIn(1000);
        battleVictory.play();
        firstEnemy.death.play();
        firstEnemy.loot();
        secondEnemy.loot();
        return true;
      }
      return false;
    }

    if (doubleFight == false) {
      console.log("Single fight end game check was made.");
      if (firstEnemy.health <= 0) {
        isGameOver = true; //to be removed
        combatPrint("You've defeated the " + firstEnemy.name + ".");
        combatPrint("You gain " + firstEnemy.xp + "XP!");
        player.xp = player.xp + firstEnemy.xp;
        levelUpCheck(player.xp);
        refreshPlayerStats();
        player.gold = player.gold + firstEnemy.goldReward;
        refreshPlayerGold();
        $("#backToGame").fadeIn(1000);
        battleVictory.play();
        firstEnemy.death.play();
        firstEnemy.loot();
        return true;
      }
      return false;
    }
  }

  //returns the player to the main game
  function backToGame() {
    $('#console').fadeIn(50);
    $("#combatWrapper").fadeOut(0);
    $(".combatMenu").fadeOut(0);
    $("#combat").fadeOut(0);
    $("#combatOutput").html("");
    battleMusic.pause();
    battleMusic.currentTime = 0;
    currentSong.play();
    $("option").remove(".toBeDestroyed");
    $("html, body").animate({
      scrollTop: $(document).height()
    }, 1000);
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
    document.getElementById(who).style.height = howMuch + "px";
  }

  //checks enemy object vulnerability and compares it to the current damage type the player is performing.
  function checkForDamageType(damageTypeAttacking, enemyDamageType) {
    var output = {
      isTrue: false,
      vulnerabilityname: 0,
      additionalDamage: 0
    }
    for (var i = 0; i < enemyDamageType.vulnerability.length; i++) {
      if (damageTypeAttacking === enemyDamageType.vulnerability[i][0]) {
        output.vulnerabilityName = enemyDamageType.vulnerability[i][0];
        output.additionalDamage = enemyDamageType.vulnerability[i][1];
        output.isTrue = true;
        return output;
      }
    }
    return output.isTrue = false;
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

  function dodgeCheck(dodgeChance) {
    var randomNumber = Math.random();
    if (dodgeChance <= randomNumber) {
      //console.log(dodgeChance);
      //console.log(randomNumber);
      return false;
    } else {
      return true;
    }
  }

  function nextTurn() {
    console.log("The turn counter is: " + turnCounter);
    checkTheDead(); //Enemy can still attack on the turn that it's died.
    console.log("This is the selected weapon " + document.getElementById("inventory").selectedIndex);
    if (turnCounter >= 0) {
      if (eval(turnOrder[turnCounter][0]).isPlayer === true) {
        playerTurn = true;
        combatPrint("It is your turn.");
      } else if (eval(turnOrder[turnCounter][0]).isPlayer === false) {
        enemyTurn(eval(turnOrder[turnCounter][0]).indentifier);
      }
    } else if (turnCounter == 0 || turnCounter == -1) {
      setTimeout(function () {
        combatPrint("This turn is finished.");
      }, 500);
      setTimeout(function () {
        combatPrint("New turn! Be ready!");
      }, 500);
      turnOrder = [];
      determineTurnRoll();
    } else {
      return false;
    }
  }

  function determineTurnRoll() {
    for (var i = 0; i < combatants.length; i++) {
      var agiRoll = Math.floor(Math.random() * 10 + combatants[i].agility);
      console.log(combatants[i].name + " has a roll of " + agiRoll);
      combatants[i].turnRoll = agiRoll;
      turnOrder.push([combatants[i].indentifier, combatants[i].turnRoll]);
      turnOrder.sort(function (a, b) {
        return a[1] - b[1]
      });
    }
    turnCounter = turnOrder.length - 1;
    nextTurn();
  }

  function enemyTurn(enemy) {
    enemy = eval(enemy);
    console.log(enemy.name + " is attacking.");
    if (enemy.stunned > 0) {
      combatPrint(enemy.name + " is stunned and loses its chance to attack!");
      enemy.stunned = enemy.stunned - 1;
      turnCounter--;
      nextTurn();
      return false;
    }
    if (gameOverCheck() === false) {
      var didPlayerDodge = dodgeCheck(player.agility * 0.01 / 2);
      var didPlayerBlock = dodgeCheck(player.shieldBlockChance * 0.01 / 2);
      if (didPlayerDodge == false && didPlayerBlock == false) {
        enemyMove = calcEnemyMove(enemy);
        enemyDamage = calcDamage(enemy.moves[enemyMove][1], 1);
        var enemyRealDamage = Math.floor(enemyDamage) - player.armorStats;
        if(enemyRealDamage < 0){
          enemyRealDamage = 1;
        }
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
        turnCounter--;
        checkTheDead();
        setTimeout(function () {
          nextTurn();
        }, 1000);
      } else if (didPlayerDodge == true && didPlayerBlock == false) {
        combatPrint(enemy.name + " tries to attack but you dodge out of the way!");
        enemy.sounds.play();
        turnCounter--;
        checkTheDead();
        setTimeout(function () {
          nextTurn();
        }, 1000);
      } else if (didPlayerDodge == false && didPlayerBlock == true) {
        combatPrint(enemy.name + " tries to attack but you block just in time!");
        enemy.sounds.play();
        //insert some blocking sounds here!
        turnCounter--;
        checkTheDead();
        setTimeout(function () {
          nextTurn();
        }, 1000);
      } else {
        combatPrint("You parry your opponent doing some extra damage!");
        combatPrint("You deal an extra " + player.agility / 2 + " damage!");
        combatPrint("Now's your time to strike!");
        //insert some cool parrying sounds here!
        enemy.health = enemy.health - player.agility / 2;
        enemy.sounds.play();
        turnCounter--;
        checkTheDead();
        setTimeout(function () {
          nextTurn();
        }, 1000);
      }
    }
  }


  function whoWillPlayerAttack() {
    if (document.getElementById("attackInterface").selectedIndex == 0) { //maybe use this for inventory!!!????
      combatPrint("You must decide on who to attack!");
    } else if (document.getElementById("attackInterface").selectedIndex == 1) {
      toAttack = firstEnemy;
      return toAttack;
    } else if (document.getElementById("attackInterface").selectedIndex == 2) {
      toAttack = secondEnemy;
      return toAttack;
    }
  }

  function checkTheDead() {
    for (var i = 0; i < combatants.length - 1; i++) {
      if (combatants[i].health <= 0) {
        combatPrint(combatants[i].name + " has died!");
        combatants.splice(i, 1);
        turnCounter--;
      }
    }
    for (var k = 0; k < turnOrder.length - 1; k++) {
      if (turnOrder[k].health <= 0) {
        turnOrder.splice(i, 1);
      }
    }
  }

  function useWeapon() {
    whoWillPlayerAttack();
    var enemy = toAttack;
    if (enemy.health <= 0) {
      combatPrint("You've already killed " + enemy.name);
      return false;
    }
    if (playerTurn === false) {
      return combatPrint("You are still recovering from your attack.");
    }
    if (
      gameOverCheck() === false &&
      playerTurn === true
    ) {
	if(player.weaponDamageType == enemy.immune){
	print("The enemy is immune to your attack!");
        playerTurn = false;
        checkTheDead();
        turnCounter--;
        setTimeout(function () {
          nextTurn();
        }, 1000);
	}
      if (dodgeCheck(enemy.dodgeChance) == false) {
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
        var damageTypeCheck = checkForDamageType(player.weaponDamageType, enemy);
        if (damageTypeCheck.isTrue == true) {
          combatPrint(
            "Your enemy is weak against " + player.weaponDamageType + "! Your " + player.weaponName + " deals an extra " + damageTypeCheck.additionalDamage + " damage!"
          );
          enemy.health = enemy.health - damageTypeCheck.additionalDamage;
        }
        if (document.getElementById("attackInterface").selectedIndex == 1) {
          calcHealthBars("enemyHealth1", enemy.health);
        } else if (document.getElementById("attackInterface").selectedIndex == 2) {
          calcHealthBars("enemyHealth2", enemy.health);
        }
        player.weaponSound.play();
        playerTurn = false;
        turnCounter--;
        checkTheDead();
        nextTurn();
      } else {
        combatPrint(
          "You attack " +
          enemy.name +
          " with your " +
          player.weaponName +
          " but they smoothly dodge the attack!"
        );
        playerTurn = false;
        checkTheDead();
        turnCounter--;
        setTimeout(function () {
          nextTurn();
        }, 1000);
      }
    } else {
      combatPrint("The fight has ended.");
    }
  }

  function stunSpell() {
    whoWillPlayerAttack();
    var enemy = toAttack;
    if (playerTurn === false) {
      return combatPrint("You are still recovering from your attack.");
    }
    if (
      gameOverCheck() === false &&
      playerTurn === true &&
      player.mana >= stun.manaCost &&
      stun.playerHas === true
    ) {
      combatPrint("You send out an electric shock paralyzing the " + enemy.name);
      enemy.stunned = stun.stats;
      player.mana = player.mana - stun.manaCost;
      turnCounter--;
      playerTurn = false;
      stun.sound.play();
      calcHealthBars("playerMana", player.mana);
      setTimeout(function () {
        nextTurn();
      }, 1000);
    } else {
      combatPrint("You don't have enough mana, or don't have that spell.");
    }
  }

  function useExplosion() {
    if (playerTurn === false) {
      return combatPrint("You are still recovering from your attack.");
    }
    if (
      gameOverCheck() === false &&
      playerTurn === true &&
      player.mana >= explosion.manaCost &&
      explosion.playerHas === true
    ) {
      var actualStats = player.intelligence / 2 + explosion.stats;
      combatPrint("You deal " + actualStats + " damage all enemies in a blinding flash!");
      firstEnemy.health = firstEnemy.health - actualStats;
      if(secondEnemy){
      secondEnemy.health = secondEnemy.health - actualStats;
    }
      spellEffeciency = Math.floor(player.intelligence / 5);
      realManaCost = explosion.manaCost - spellEffeciency;
      if (realManaCost <= 0) {
        player.mana = player.mana - 5;
      } else {
        player.mana = player.mana - realManaCost;
      }
      turnCounter--;
      playerTurn = false;
      explosion.sound.play();
      calcHealthBars("playerMana", player.mana);
      setTimeout(function () {
        nextTurn();
      }, 1000);
    } else {
      combatPrint("You don't have enough mana, or don't have that spell.");
    }
  }

  function useDamageSpell(spellName) {
    whoWillPlayerAttack();
    var enemy = toAttack;
    if (enemy.health <= 0) {
      combatPrint("You've already killed " + enemy.name);
      return false;
    }
    if (playerTurn === false) {
      return combatPrint("You are still recovering from your attack.");
    }
    if (
      gameOverCheck() === false &&
      hasAttacked === true &&
      player.mana >= spellName.manaCost &&
      spellName.playerHas == true
    ) {
      playerDamage = calcDamage(spellName.stats, 1);
      addedIntDamage = player.intelligence / 2
      playerRealDamage = Math.floor(playerDamage + addedIntDamage);
      enemy.health = enemy.health - playerRealDamage;
      spellEffeciency = Math.floor(player.intelligence / 5);
      realManaCost = spellName.manaCost - spellEffeciency;
      if (realManaCost <= 0) {
        player.mana = player.mana - 5;
      } else {
        player.mana = player.mana - realManaCost;
      }
      combatPrint(
        spellName.castText + " " + enemy.name + " for " + playerRealDamage
      );
      var damageTypeCheck = checkForDamageType(spellName.damageType, enemy);
      if (damageTypeCheck.additionalDamage > 0) {
        combatPrint(
          "Your enemy is weak against " + spellName.damageType + "! Your " + spellName.name + " deals an extra " + damageTypeCheck.additionalDamage + " damage!"
        );
        enemy.health = enemy.health - damageTypeCheck.additionalDamage;
      }
      if (document.getElementById("attackInterface").selectedIndex == 1) {
        calcHealthBars("enemyHealth1", enemy.health);
      } else if (document.getElementById("attackInterface").selectedIndex == 2) {
        calcHealthBars("enemyHealth2", enemy.health);
      }
      calcHealthBars("playerMana", player.mana);
      spellName.sound.play();
      playerTurn = false;
      turnCounter--;
      setTimeout(function () {
        nextTurn();
      }, 1000);
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

  function createOption(name, value, where) {
    var select = document.getElementById(where);

    var newOption = document.createElement("option");
    var newOptionValue = document.createTextNode(name);

    newOption.appendChild(newOptionValue);
    newOption.value = value;
    newOption.classList.add("toBeDestroyed");
    select.insertBefore(newOption, select.lastChildNode);
  }

  //Might be useful for inventory
  $('#inventory').change(function () {
    val = $("#inventory option:selected").html();
    //console.log(val);
    selectElement = document.querySelector('#inventory');
    output = selectElement.value;
    console.log(output);
    combatPrint("You pull out your " + val);
    Object.assign(player, eval(output));
  });

  //combat function
  function combat(player, enemy1, enemy2, group) {
    if (group) {
      groupName = group;
    }
    $('#console').fadeOut(0);
    $(".combatMenu").fadeIn(50);
    $("#combat").fadeIn(50);
    $("#combatWrapper").fadeIn(50);
    combatants.push(player);
    firstEnemy = enemy1;
    firstEnemy.indentifier = "firstEnemy";
    combatants.push(firstEnemy);

    for (var inv = 0; inv < weaponList.length; inv++) {
      if (weaponList[inv].owned == true) {
        createOption(weaponList[inv].weaponName, weaponList[inv].identifier, "inventory");
      }
    }

    createOption(firstEnemy.name, "firstEnemy", "attackInterface"); //These two lines fill the "select enemy to attack" drop down.
    combatPrint(enemy1.greeting);
    doubleFight = false;
    if (enemy2 != null) {
      secondEnemy = enemy2;
      secondEnemy.indentifier = "secondEnemy";
      combatants.push(secondEnemy);
      combatPrint(enemy2.greeting);
      createOption(secondEnemy.name, "secondEnemy", "attackInterface");
      $("#enemyHealth2").fadeIn(50);
      document.getElementById("enemyHealth2").style.height = enemy2.health + "px";
      setTimeout(secondEnemy.introSound.play(), 1500);
      doubleFight = true;
    }
    currentSong.pause();
    enemy1.introSound.play();
    battleMusic.play();
    $("#enemyHealth1").fadeIn(50);
    document.getElementById("enemyHealth1").style.height = enemy1.health + "px";

    determineTurnRoll();
  }
  //COMBAT END

  //BEGIN CONVERSATION

  function conversation(actor, player) {
    $(".backbutton").fadeIn(50);
    $('#console').fadeOut(50);
    $(".conversationMenu").fadeIn(50);
    $(".conversation").fadeIn(50);
    $(".conversationWrapper").fadeIn(50);
    //conversation with actor
    $("body").addClass("forrest-bg");
    //handles click events for player response buttons
    $(".conversationMenu").on("click", ".convoButton", function () {
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

  function conversationPrint(input, color) {
    $(".conversationOutput").append("<p class='text-center'" + color + ">" + input + "</p>");
  }

  function printActorResponse(actor, player, response) {
    conversationPrint(Dialogue.interact(actor, player, response).text);
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
  $("#goodbye").click(function () {
    $('#console').fadeIn(50);
    $(".conversationMenu").fadeOut(50);
    $(".conversation").fadeOut(50);
    $(".conversationOutput").html(" ");
    $(".conversationMenu").off("click");
    $(".conversationWrapper").fadeOut(50);
    //Dialogue.dialogues = {};
    console.log(Dialogue.dialogues);
    $("body").removeClass("forrest-bg");
    $(".backbutton").fadeOut(50);
    $("html, body").animate({
      scrollTop: $(document).height()
    }, 1000);
  });

  //END CONVERSATION
  //BEGIN INVENTORY MENU
  //Enter inventory menu
  function enterInventoryMenu() {
    $('#console').fadeOut(50);
    $('inventoryMenuWrapper').fadeIn(50);
  }

});

//END DOCUMENT
