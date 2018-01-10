"use strict";

var stateTarget = '';

var ENEMY_DATA = Object.seal({
    MAX_HEALTH: 2,
    SPEED: 220,
    MAX_ENEMIES: 3,
    ALIVE_COUNT: 0
});
    
var PLAYER_DATA = {
    LEVEL: 1,
    FIRE_RATE: 250,
    SPEED: 50,
    DIES: 0
};

function ResetData()
{
    ENEMY_DATA.MAX_HEALTH = 1;
    ENEMY_DATA.SPEED = 220;
    ENEMY_DATA.MAX_ENEMIES = 3;
    ENEMY_DATA.ALIVE_COUNT = 0;
    
    PLAYER_DATA.FIRE_RATE = 300 - (PLAYER_DATA.LEVEL * 5);
    if (PLAYER_DATA.FIRE_RATE < 0){
        PLAYER_DATA.FIRE_RATE = 20;
    }
    PLAYER_DATA.SPEED = 50 + (PLAYER_DATA.LEVEL * 5);
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