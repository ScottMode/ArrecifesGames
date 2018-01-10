"use strict";

var menuBackground = null;

//TEXT
var playButton = null;
var playButton_txt = null;
var instructions_txt = null;
var title_txt = null;
var name_txt = null;
var level_txt = null;

BasicGame.MainMenu = function (game) {
    
};

BasicGame.MainMenu.prototype = {
    
    create: function () {
        menuBackground = this.add.image(this.world.centerX, this.world.centerY, 'background');
        menuBackground.anchor.setTo(0.5);

        if (gm.music == null){
            gm.music = this.add.audio('music');
            gm.music.loop = true;
		    gm.music.play();
            
            
            gm.enemyDieSound = this.add.audio('enemyDieSound');
            gm.fireSound = this.add.audio('fireSound');
        }
        
        var title;
        switch (PLAYER_DATA.DIES){
            case 0:
                title = "Don't Die";
                break;
            case 1:
                title = "Don't Die Again";
                break;
            case 2:
                title = "Stop Dying";
                break;
            case 3:
                title = "Ok, You Can Die A Little";
                break;
            case 4:
                title = "Don't Die Too Much";
                break;
            case 5:
                title = "You're Bad Stop Dying";
                break;
            case 6:
                title = "Get A Grip";
                break;
            case 7:
                title = "Last Chance";
                break;
            case 8:
                title = "Told You To Stop Dying";
                break;
        }
        title_txt = this.add.text(this.world.centerX, this.world.centerY - 100, title);
        title_txt.anchor.setTo(0.5);
        title_txt.fill = '#FFFFFF';
        title_txt.font = 'Revalia';
        title_txt.fontSize = 50;
        title_txt.align = 'center';
        
        var levelText = "Level " + PLAYER_DATA.LEVEL;
        level_txt = this.add.text(20, 20, levelText);
        level_txt.anchor.setTo(0, 0);
        level_txt.fill = '#FFFFFF';
        level_txt.font = 'Revalia';
        level_txt.fontSize = 30;
        level_txt.align = 'left';
        
        name_txt = this.add.text(20, this.world.height - 40, "Nelson Scott");
        name_txt.anchor.setTo(0, 0);
        name_txt.fill = '#FFFFFF';
        name_txt.font = 'Revalia';
        name_txt.fontSize = 10;
        name_txt.align = 'left';
        
        if (PLAYER_DATA.DIES < 8){
            playButton = this.add.button(-200 * gm.scaleP, this.world.centerY + 50 * gm.scaleP, 'button', nextMenu, this, 1, 0, 2);
            playButton_txt = this.add.bitmapText(0, 0, 'walter', "Play", 50 * gm.scaleP);
            setButton(playButton, playButton_txt, 50, "nextSound");
            this.add.tween(playButton).to( { x: this.world.centerX }, 1000, Phaser.Easing.Bounce.Out, true);
            this.add.tween(playButton_txt).to( { x: this.world.centerX - (playButton_txt.width / 2) }, 1000, Phaser.Easing.Bounce.Out, true);

            instructions_txt = this.add.text(this.world.centerX, this.world.centerY + 200, "WASD to Move.\nShoot with mouse.\nLevel up to kill all bad guys and win.\nDie a lot but don't die too much.");
            instructions_txt.anchor.setTo(0.5);
            instructions_txt.fill = '#FFFFFF';
            instructions_txt.font = 'Revalia';
            instructions_txt.fontSize = 20;
            instructions_txt.align = 'center';
        }
        else{
            gm.music.stop();
        }
        
        //PLAYER DATA to zero
        ResetData();
    },
    
    update: function () {
        
        
        
    }
};


function nextMenu()
{
    goToState('Game');
}
