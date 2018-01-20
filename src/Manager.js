"use strict";

var stateTarget = '';

var goodChoiceList = ["fruta", "chanclas", "taza", "playera", "sombrero", "pareo", "pulsera"];
var badChoiceList = ["marconchita", "destapador", 'frasco', 'collar', "barcobotella", "huevos", "concha"];


var PLAYER_DATA = {
    SCORE: 0,
    ROUND_SCORE: 0,
    CURRENT_GAME: "GameB",
    DIFFICULTY: 1, //0-2
    GAME_LIST: ["GameA", "GameB", "GameB", "GameC", "GameC"],
    GAME_INDEX: -1
};

var GAME_A = {
    TAPS_NEEDED: [20, 20, 20],
    MAX_TIME: [20, 15, 10],
    TAP_AWARD: [100, 100, 100]
};

function createRandomGameList() {
    
    PLAYER_DATA.GAME_LIST = shuffle(PLAYER_DATA.GAME_LIST);
    
    goToNextGame();
}

function goToNextGame() {
    
    PLAYER_DATA.GAME_INDEX++;
    
    if (PLAYER_DATA.GAME_INDEX < 5) {
        //else do something else
        PLAYER_DATA.CURRENT_GAME = PLAYER_DATA.GAME_LIST[PLAYER_DATA.GAME_INDEX];
    
        PLAYER_DATA.ROUND_SCORE = 0;
        
        console.log(PLAYER_DATA.CURRENT_GAME);
    
        thisGame.state.start(PLAYER_DATA.CURRENT_GAME, true);
    }
}

function shuffle(array) 
{
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function ResetData()
{
    PLAYER_DATA.SCORE = 0;
}

BasicGame.Manager = function (game) {
    
};

BasicGame.Manager.prototype = {
    
    create: function () {
        stateTarget = '';
    },
    
    update: function () {
        
    }
};



//BUTTON CREATION
function setButton(button, text, size, buttonSound)
{
    button.anchor.setTo(0.5, 0.5);
    //button.forceOut = true;
    button.input.useHandCursor = true;
    text.fontSize = size * gm.scaleP;

    text.align = 'center';
    text.updateText();
    text.x = button.x - (text.width / 2);
    text.y = button.y - (text.height / 1.5);
    text.fill = '#ffffff';
    
    button.width = text.width + 50 * gm.scaleP;
	button.height = text.height + 45 * gm.scaleP;
}

//TEXT CREATION
function setText(text, size, color, align)
{
    text.fontSize = size * gm.scaleP;
    text.fill = color;
    text.align = align;
    text.updateText();
    //text.x -= text.width / 2;
    //text.y -= text.height / 2;
}

//SAVE

//LOAD


function muteGame()
{
    if (thisGame.sound.mute)
    {
        thisGame.sound.mute = false;
    }
    else
    {
        thisGame.sound.mute = true;
    }
}

//GO TO
function goToState(state)
{
    thisGame.state.start(state);
    resetState();
}

//SHUTDOWN
function resetState()
{
    
}