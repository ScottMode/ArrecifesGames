"use strict";

var stateTarget = '';


var PLAYER_DATA = {
    SCORE: 0,
    ROUND_SCORE: 0,
    CURRENT_GAME: "GameA",
    DIFFICULTY: 1 //0-2
};

var GAME_A = {
    TAPS_NEEDED: [20, 20, 20],
    MAX_TIME: [20, 15, 10],
    TAP_AWARD: [100, 100, 100]
};

function goToNextGame() {
    
    PLAYER_DATA.ROUND_SCORE = 0;
    
    switch (Math.floor(Math.random() * 0)) {
            case 0:
            PLAYER_DATA.CURRENT_GAME = "GameA";
            thisGame.state.start("GameA", true);
            break;
    }
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