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
        var easyButton = thisGame.add.button(thisGame.world.centerX - 450, 580, 'Papel2', setEasy, this);
        easyButton.anchor.setTo(0.5);
        easyButton.scale.setTo(0.2);
        easyButton.input.useHandCursor = true;
        //e text
        easyButton_txt = this.game.add.text(easyButton.x, easyButton.y + 30, "fácil", {font:"55px ZombieChecklist", fill:"#000000"});
        easyButton_txt.anchor.setTo(0.5);
        easyButton_txt.align = 'center';
        
        
        //Difficulty buttons + text
        var mediumButton = thisGame.add.button(thisGame.world.centerX, 750, 'Papel2', setMedium, this);
        mediumButton.anchor.setTo(0.5);
        mediumButton.scale.setTo(0.2);
        mediumButton.input.useHandCursor = true;
        mediumButton.angle += 5;
        //text
        mediumButton_txt = this.game.add.text(mediumButton.x, mediumButton.y + 30, "medio", {font:"55px ZombieChecklist", fill:"#000000"});
        mediumButton_txt.anchor.setTo(0.5);
        mediumButton_txt.align = 'center';
        
        //Difficulty buttons + text
        var hardButton = thisGame.add.button(thisGame.world.centerX + 450, 580, 'Papel2', setHard, this);
        hardButton.anchor.setTo(0.5);
        hardButton.scale.setTo(-0.2, 0.2);
        hardButton.input.useHandCursor = true;
        //text
        hardButton_txt = this.game.add.text(hardButton.x, hardButton.y + 30, "difícil", {font:"55px ZombieChecklist", fill:"#000000"});
        hardButton_txt.anchor.setTo(0.5);
        hardButton_txt.align = 'center';
        
        //Fish buttons stuff
        fish = this.add.image(easyButton.x, easyButton.y - 30, 'Pezrojo');
        fish.anchor.setTo(0.5);
        fish.scale.setTo(0.13);
        fish.angle -= 20;
        crab = this.add.image(mediumButton.x, mediumButton.y - 30, 'Cangre2');
        crab.anchor.setTo(0.5);
        crab.scale.setTo(0.13);
        squid = this.add.image(hardButton.x, hardButton.y - 30, 'Calamar2');
        squid.anchor.setTo(0.5);
        squid.scale.setTo(0.08);
        squid.angle += 80;
        
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
    
}

function setMedium()
{
    PLAYER_DATA.DIFFICULTY = 1;
}

function setHard()
{
    PLAYER_DATA.DIFFICULTY = 2;
}

function startGame()
{
    goToNextGame();
}
