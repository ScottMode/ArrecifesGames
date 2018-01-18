"use strict";

var menuBackground = null;

var clickTimer = 6;


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
        scoreTab.scale.setTo(0.4, 0.25);
        scoreTab.anchor.setTo(0.53, 0.5);
        var scoreTab_txt = this.game.add.text(scoreTab.x - 360, scoreTab.y + 10, "Contribuiste con :", {font:"55px ZombieChecklist", fill:"#000000"});
        scoreTab_txt.anchor.setTo(0, 0.5);
        scoreTab_txt.align = 'left';
        
        var roundScore_txt = this.game.add.text(scoreTab.x + 150, scoreTab.y + 10, "" + PLAYER_DATA.ROUND_SCORE, {font:"45px Moon Flower Bold", fill:"#000000"});
        roundScore_txt.anchor.setTo(0, 0.5);
        roundScore_txt.align = 'left';
        
        var globalTab = this.add.image(this.world.centerX, this.world.centerY + 300, 'Maskin2');
        //globalTab.angle += 5;
        globalTab.scale.setTo(0.85, 0.5);
        globalTab.anchor.setTo(0.5, 0.5);
        var globalTab_txt = this.game.add.text(globalTab.x, globalTab.y - 5, "Puntaje global", {font:"45px ZombieChecklist", fill:"#000000"});
        globalTab_txt.anchor.setTo(0.5, 0.5);
        globalTab_txt.align = 'center';
        
        
        //Score
        var scoreTab2 = this.add.image(this.world.centerX, this.world.centerY + 425, 'Papel4');
        scoreTab2.anchor.setTo(0.5);
        scoreTab2.scale.setTo(0.3, 0.5);
        scoreTab2.angle -= 85;
        var scoreTab2_txt = this.game.add.text(scoreTab2.x - 90, scoreTab2.y + 2, "SCORE " + PLAYER_DATA.SCORE, {font:"40px Moon Flower Bold", fill:"#000000"});
        scoreTab2_txt.anchor.setTo(0, 0.5);
        scoreTab2_txt.align = 'left';
        
        clickTimer = 6;
    },
    
    update: function () {
        
        if (clickTimer <= 0) {
            goToNextGame();
        }
        else {
            clickTimer -= this.time.elapsed/1000;
        }
        
    }
};