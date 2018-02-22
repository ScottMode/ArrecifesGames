"use strict";

BasicGame.MainMenu = function (game) {
    
};

BasicGame.MainMenu.prototype = {
    
    create: function () {
        
        var title_txt = this.game.add.text(this.world.centerX, this.world.centerY - 100, "Spelling Bee", {font:"60px Arial", fill:"#FFFFFF"});
        title_txt.anchor.setTo(0.5);
        title_txt.fill = '#000000';
        title_txt.fontSize = 50;
        title_txt.align = 'center';
        
        
        
        var cardButton = this.add.button(this.world.centerX, this.world.centerY + 100, 'Button', goToCards, this);
        var cardButton_txt = this.game.add.text(this.world.centerX, this.world.centerY + 100, "Calling Cards", {font:"40px Arial", fill:"#FFFFFF"});
        setButton(cardButton, cardButton_txt, 40, null);
        
        var boardButton = this.add.button(this.world.centerX, this.world.centerY + 250, 'Button', goToBoards, this);
        var boardButton_txt = this.game.add.text(this.world.centerX, this.world.centerY + 250, "Game Boards", {font:"40px Arial", fill:"#FFFFFF"});
        setButton(boardButton, boardButton_txt, 40, null);
        
    },
    
    update: function () {
        
    }
};

function goToBoards() {
    thisGame.state.start('Board');
}

function goToCards() {
    
}