// author: james x '25
// this is the illustrator .jsx script to read data.json and map it onto roster names.

// include statement is NECESSARY for reading JSON files
// @include 'json2.js'

// initializing document and assigning names to default groups
var Doc = app.activeDocument;
var NoNumberPlayer = Doc.groupItems[0];
var Player = Doc.groupItems[1];
var NoNumberCaptain = Doc.groupItems[2];
var Captain = Doc.groupItems[3];
var ManagerGroup = Doc.groupItems[4];
var Manager = Doc.groupItems[5];
var Border = Doc.groupItems[6];

// function to parse a JSON file
function readJSONFile(file_input) {
    if (!file_input.exists) {
        alert("Error: File not found - " + file.fsName + " - please manually choose data.json");
        var file = File.openDialog("Select the JSON file");
    }
    else {
        var file = file_input
    }
    file.open("r");
    var data = file.read();
    file.close();
    data = JSON.parse(data);
    return data;
}

// function to create and modify a player object group from the template
function create_player(player, numbered, i) {
    // different templates accessed whether the roster has player numbers
    if (numbered) {
        var duplicated = Player.duplicate();
    }
    else {
        var duplicated = NoNumberPlayer.duplicate();
    }
    // illustrator glitch bypass in which duplicated objects aren't initially recognized
    duplicated.layer.visible = false;
    duplicated.layer.visible = true;
    if (numbered) {
        duplicated.textFrames[0].contents = player["number"];
        duplicated.textFrames[1].contents = player["name"] + " \u2019" + player["year"];
        duplicated.textFrames[2].contents = player["hometown"];
    }
    else {
        duplicated.textFrames[0].contents = player["name"] + " \u2019" + player["year"];
        duplicated.textFrames[1].contents = player["hometown"];
    }
    // arrange players
    duplicated.translate(((i % 5) + 1) * 120, (Math.floor(i / 5)) * -50);
}

// function to create and modify a captain object group from the template
function create_captain(player, numbered, i) {
    // different templates accessed whether the roster has player numbers
    if (numbered) {
        var duplicated = Captain.duplicate();
    }
    else {
        var duplicated = NoNumberCaptain.duplicate();
    }
    // illustrator glitch bypass in which duplicated objects aren't initially recognized
    duplicated.layer.visible = false;
    duplicated.layer.visible = true;
    if (numbered) {
        duplicated.textFrames[1].contents = player["number"];
        duplicated.textFrames[2].contents = player["name"] + " \u2019" + player["year"];
        duplicated.textFrames[3].contents = player["hometown"];
    }
    else {
        duplicated.textFrames[1].contents = player["name"] + " \u2019" + player["year"];
        duplicated.textFrames[2].contents = player["hometown"];
    }
    // arrange captains
    duplicated.translate(((i % 5) + 1) * 140, (Math.floor(i / 5)) * -50);
}

// function to create and modify a manager object group from the template
function create_manager(manager, i) {
    // for managers, the first template object is replaced, unlike players and managers
    // this is for easier arrangement of groups
    if (i == 0) {
        Manager.textFrames[0].contents = manager["name"] + " \u2019" + manager["year"];
        Manager.textFrames[1].contents = manager["hometown"];
        return;
    }
    var duplicated = Manager.duplicate();
    // illustrator glitch bypass in which duplicated objects aren't initially recognized
    duplicated.layer.visible = false;
    duplicated.layer.visible = true;
    duplicated.textFrames[0].contents = manager["name"] + " \u2019" + manager["year"];
    duplicated.textFrames[1].contents = manager["hometown"];
    // arrange managers
    duplicated.translate((i % 5) * 120, (Math.floor(i / 5)) * -50);
}


// open data.json
var scriptFile = File($.fileName);
var scriptFolder = scriptFile.parent;
var file = File(scriptFolder + "/data.json");

// read data.json
var athletes = readJSONFile(file);
var roster_type = athletes["roster_type"]

// loop through player list, call create_player for each
for (var i = 0; i < athletes["players"].length; i++) {
    var player = athletes["players"][i];
    create_player(player, roster_type != 3, i);
}

// loop through captain list, call create_captain for each
for (var i = 0; i < athletes["captains"].length; i++) {
    var player = athletes["captains"][i];
    create_captain(player, roster_type != 3, i);
}

// loop through manager list, call create_manager for each
for (var i = 0; i < athletes["managers"].length; i++) {
    var manager = athletes["managers"][i];
    create_manager(manager, i);
}

alert("Scripting complete! Excess template names on the left column must be deleted, and captains' names must be recentered. Remember to add the sport name, a background graphic, arrange all players, and check in with copy! :>");