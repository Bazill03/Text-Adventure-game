    //prints out input to screen
    //Find a way to import this instead
    function print(input, color) {
        $("<p class='text-center " + color + "'>" + input + "</p>").insertBefore("#placeholder");
        //reset textbox
        $("#commandline").val("");
        $("html, body").animate({
            scrollTop: $(document).height()
        }, 200);
    }

    var huntDownTheNecromancer = {
        questTitle: "Hunt Down The Necromancer",
        completed: false,
        objectivesText: [
            "Kill 5 Skeletons",
            "Kill the Necromancer"
        ],
        objectives: {
            "skeletonMob": 5,
            "necromancerMob": 1,
        },
        progress: {
            "skeletonMob": 0,
            "necromancerMob": 0,
        }
    }

    var garbageQuest = {
        questTitle: "Test Quest",
        completed: false,
        objectiveNumber: 2,
        reward: function() {
            console.log("Reward function was run.");
            print("You got 200 xp!");
            player.xp = player.xp + 200;
        },
        objectivesText: [
            "Kill 1 Rat",
            "Kill 1 Skeleton"
        ],
        objectives: [
            ["ratMob", 1],
            ["skeletonMob", 1]
        ],
        progress: [
            ["ratMob", 0],
            ["skeletonMob", 0]
        ]
    }