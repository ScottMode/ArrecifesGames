"use strict";

var menuBackground = null;

//TEXT
var easyButton = null;
var easyButton_txt = null;
var mediumButton = null;
var mediumButton_txt = null;
var hardButton = null;
var hardButton_txt = null;

var clickButton = null;
var clickButton_txt = null;
var hand = null;

var fish = null;
var crab = null;
var squid = null;

BasicGame.MainMenu = function (game) {
    
};

BasicGame.MainMenu.prototype = {
    
    create: function () {
        
        menuBackground = this.add.image(this.world.centerX, this.world.centerY, 'MainMenuBackground');
        menuBackground.anchor.setTo(0.5);
        
        //Difficulty buttons + text
        var easyButton = thisGame.add.button(thisGame.world.centerX - 500, 550, 'Papel2', setEasy, this);
        easyButton.anchor.setTo(0.5);
        easyButton.scale.setTo(0.2);
        easyButton.input.useHandCursor = true;
        //e text
        
        //Difficulty buttons + text
        var mediumButton = thisGame.add.button(thisGame.world.centerX, 720, 'Papel2', setMedium, this);
        mediumButton.anchor.setTo(0.5);
        mediumButton.scale.setTo(0.2);
        mediumButton.input.useHandCursor = true;
        
        //Difficulty buttons + text
        var hardButton = thisGame.add.button(thisGame.world.centerX + 500, 550, 'Papel2', setHard, this);
        hardButton.anchor.setTo(0.5);
        hardButton.scale.setTo(0.2);
        hardButton.input.useHandCursor = true;
        
        
        fish = this.add.image(easyButton.x, easyButton.y, 'Pezrojo');
        fish.anchor.setTo(0.5);
        fish.scale.setTo(0.15);
        crab = this.add.image(mediumButton.x, mediumButton.y, 'Cangre2');
        crab.anchor.setTo(0.5);
        crab.scale.setTo(0.15);
        squid = this.add.image(hardButton.x, hardButton.y, 'Calamar2');
        squid.anchor.setTo(0.5);
        squid.scale.setTo(0.08);
        
        //Hand
        var clickButton = thisGame.add.button(thisGame.world.centerX, this.world.centerY + 350, 'Papel4', startGame, this);
        clickButton.anchor.setTo(0.5);
        clickButton.scale.setTo(0.5);
        clickButton.input.useHandCursor = true;
        clickButton.angle -= 90;
        
        hand = this.add.image(this.world.centerX, this.world.centerY  + 400, 'Mano');
        hand.anchor.setTo(0.5);
        hand.scale.setTo(0.2);
        
        
        /*title_txt = this.add.text(this.world.centerX, this.world.centerY - 100, title);
        title_txt.anchor.setTo(0.5);
        title_txt.fill = '#FFFFFF';
        title_txt.font = 'Revalia';
        title_txt.fontSize = 50;
        title_txt.align = 'center';*/
    },
    
    update: function () {
        
        //use to find button positions
        console.log("x: " + thisGame.input.mousePointer.x + ", y: " + thisGame.input.mousePointer.y);
        
    }
};

function setEasy()
{
    PLAYER_DATA.DIFFICULTY = 1;
    
}

function setMedium()
{
    PLAYER_DATA.DIFFICULTY = 2;
}

function setHard()
{
    PLAYER_DATA.DIFFICULTY = 3;
}

function startGame()
{
    thisGame.state.start('GameA');
}
