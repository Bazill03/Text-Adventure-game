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
            "Kill Skeletons",
            "Kill the Necromancer"
        ],
        objectivesText: [
            ["Kill Skeleton(s)", 0],
            ["Kill Necromancer", 0]
        ],
        objectives: [
            ["skeletonMob", 5],
            ["necromancerMob", 1]
        ]
    }

    //Delete this at some point
    var garbageQuest = {
        questTitle: "Test Quest",
        completed: false,
        objectiveNumber: 2,
        reward: function() {
            print("You got 200 xp!");
            player.xp = player.xp + 200;
        },
        objectivesText: [
            ["Kill Rat(s)", 0],
            ["Kill Skeleton(s)", 0],
            ["Enter the Portal", 1]
        ],
        objectives: [
            ["ratMob", 15],
            ["skeletonMob", 1]
        ]
    }