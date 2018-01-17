"use strict";

var menuBackground = null;



BasicGame.Outcome = function (game) {
    
};

BasicGame.Outcome.prototype = {
    
    create: function () {
        
        menuBackground = this.add.image(this.world.centerX, this.world.centerY, 'MainMenuBackground');
        menuBackground.anchor.setTo(0.5);
        
        
        var crab = this.add.image(this.world.centerX, this.world.centerY - 100, 'Cangre2');
        crab.anchor.setTo(0.5);
        crab.scale.setTo(1.2);
        
        var scoreTab = this.add.image(this.world.centerX, this.world.centerY - 50, 'Maskin');
        scoreTab.angle += 5;
        scoreTab.scale.setTo(0.3, 0.2);
        scoreTab.anchor.setTo(0.53, 0.5);
        
    },
    
    update: function () {
        
    }
};