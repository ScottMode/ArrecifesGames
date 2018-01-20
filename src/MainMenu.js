"use strict";

var menuBackground = null;

//TEXT
var easyButton = null;
var mediumButton = null;
var hardButton = null;

var clickButton = null;
var clickButton_txt = null;
var hand = null;

var backgroundSquid;
var backgroundCrab;

BasicGame.MainMenu = function (game) {
    
};

BasicGame.MainMenu.prototype = {
    
    create: function () {
        
        menuBackground = this.add.image(this.world.centerX, this.world.centerY, 'MainMenuBackground');
        menuBackground.anchor.setTo(0.5);
        
        backgroundSquid = this.add.image(0, this.world.centerY - 250, 'Calamar');
        backgroundSquid.anchor.setTo(0.5);
        backgroundSquid.scale.setTo(0.9);
        backgroundSquid.angle -= 25;
        
        backgroundCrab = this.add.image(this.world.width, this.world.centerY, 'Cangre3');
        backgroundCrab.anchor.setTo(0.5);
        
        //Difficulty buttons + text
        easyButton = thisGame.add.button(thisGame.world.centerX - 450, 580, 'Easy', setEasy, this);
        easyButton.anchor.setTo(0.5);
        //easyButton.scale.setTo(0.2);
        easyButton.input.useHandCursor = true;
        
        
        //Difficulty buttons + text
        mediumButton = thisGame.add.button(thisGame.world.centerX, 750, 'MediumUnderline', setMedium, this);
        mediumButton.anchor.setTo(0.5);
        //mediumButton.scale.setTo(0.2);
        mediumButton.input.useHandCursor = true;
        //mediumButton.angle += 5;
        
        
        //Difficulty buttons + text
        hardButton = thisGame.add.button(thisGame.world.centerX + 450, 580, 'Hard', setHard, this);
        hardButton.anchor.setTo(0.5);
        //hardButton.scale.setTo(-0.2, 0.2);
        hardButton.input.useHandCursor = true;
        
        //Hand
        var clickButton = thisGame.add.button(thisGame.world.centerX, this.world.centerY + 380, 'Papel4', startGame, this);
        clickButton.anchor.setTo(0.5);
        clickButton.scale.setTo(0.4);
        clickButton.input.useHandCursor = true;
        clickButton.angle -= 80;
        clickButton_txt = this.game.add.text(clickButton.x, clickButton.y, "INICIAR", {font:"55px ZombieChecklist", fill:"#000000"});
        clickButton_txt.anchor.setTo(0.5);
        clickButton_txt.align = 'center';
        
        hand = this.add.image(this.world.centerX, this.world.centerY  + 450, 'Mano');
        hand.anchor.setTo(0.5);
        hand.scale.setTo(0.15);
    },
    
    update: function () {
        
    }
};

function setEasy()
{
    PLAYER_DATA.DIFFICULTY = 0;
    easyButton.loadTexture('EasyUnderline');
    mediumButton.loadTexture('Medium');
    hardButton.loadTexture('Hard');
}

function setMedium()
{
    PLAYER_DATA.DIFFICULTY = 1;
    mediumButton.loadTexture('MediumUnderline');
    hardButton.loadTexture('Hard');
    easyButton.loadTexture('Easy');
}

function setHard()
{
    PLAYER_DATA.DIFFICULTY = 2;
    hardButton.loadTexture('HardUnderline');
    mediumButton.loadTexture('Medium');
    easyButton.loadTexture('Easy');
}

function startGame()
{
    createRandomGameList();
}
