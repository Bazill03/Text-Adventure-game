//Holds game rooms. 


//To be removed.
var testingRoom = {
    lookArray: ['hello', 'im', 'testing', 'torch'],
    torch: {
        look: function() {
            print("Hello");
        },
        take: function() {
            print("You took a torch!");
        }
    },
    olddoor: {
        look: function() {
            print("A door!");
        }
    },
    look: {
        underneath: {
            olddoor: function() {
                print("You looked underneath a door.");
            },
            torch: function() {
                print("You looked underneath a torch");
            }
        }
    }
}

var tavern = {
    look: ['bartop', 'Sawyer', 'Bartender', "stool"],
    bartop: {
        look: function() {
            print("An old mahogany bartop, supposedly crafted by one of Sawyers great grandfathers many years ago. Its coloring is uneven from decades of slammed drinks and constant washing.");
        }
    },
    sawyer: {
        look: function() {
            print("Your best friend. Goofy, curly blonde hair that's only washed when he swims in the local pond and a devilish grin that tells you he's up to no good.");
        }
    },
    bartender: {
        look: function() {
            print("A timid old man, who doesn't want any trouble. He's been a staple in your villiage for decades.");
        }
    },
    stool: {
        look: function() {
            print("A fairly unremarkable stool, but for some reason it's always available for you when you visit the tavern.");
        }
    },
    bar: {
        leave: function() {
            currentRoom = outsidetavern;
            previousRoom = tavern;
            currentRoom.description();
            moveThroughDoor.play();
        }
    }
}

var outsidetavern = {
    description: function() {
        //loopOneSong(outsideTavern);
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
        name.addEventListener("click", function() {
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
    town: {
        look: function(){
            print("The town you grew up in. A small farming hamlet. Probably no more than 100 people live here. Your father, and your fathers father lived just down the street from where you stand. Your mother passed years ago but you've held your own the best you could.");
        }
    }
}
