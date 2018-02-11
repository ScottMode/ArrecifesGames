"use strict";

BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {
        
        var loading_txt = this.game.add.text(this.world.centerX, this.world.centerY, "Loading...", {font:"40px ZombieChecklist", fill:"#FFFFFF"});
        loading_txt.anchor.setTo(0.5);
        loading_txt.fill = '#FFFFFF';
        loading_txt.fontSize = 50;
        loading_txt.align = 'center';
        
        //Main menu assets
        this.load.image('MainMenuBackground', 'assets/MainMenu/Links/logodos.png');
        this.load.image('Papel2', 'assets/MainMenu/Links/papel2.png');
        this.load.image('Papel4', 'assets/MainMenu/Links/papel4.png');
        this.load.image('Mano', 'assets/MainMenu/Links/mano.png');
        this.load.image('Calamar', 'assets/MainMenu/Links/calamar.png');
        this.load.image('Calamar2', 'assets/MainMenu/Links/calamar2.png');
        this.load.image('Cangre2', 'assets/MainMenu/Links/cangre2.png');
        this.load.image('Cangre3', 'assets/MainMenu/Links/cangre3.png');
        this.load.image('Pezrojo', 'assets/MainMenu/Links/pezrojo.png');
        this.load.image('HardUnderline', 'assets/MainMenu/Links/hover-hard.png');
        this.load.image('MediumUnderline', 'assets/MainMenu/Links/hover-medium.png');
        this.load.image('EasyUnderline', 'assets/MainMenu/Links/hover-easy.png');
        this.load.image('Hard', 'assets/MainMenu/Links/button-hard.png');
        this.load.image('Medium', 'assets/MainMenu/Links/button-medium.png');
        this.load.image('Easy', 'assets/MainMenu/Links/button-easy.png');
        
        //Game A
        this.load.image('GameABackground', 'assets/GameA/Links/background.png');
        this.load.image('Pool', 'assets/GameA/Links/alberca.png');
        this.load.image('Player', 'assets/GameA/Links/player.png');
        this.load.image('PlayerSunscreen', 'assets/GameA/Links/playerSunscreen.png');
        this.load.image('Maskin1', 'assets/GameA/Links/maskin1.png');
        this.load.image('Textura6', 'assets/GameA/Links/textura6.png');
        this.load.image('TimeBar', 'assets/GameA/Links/timeBar.png');
        this.load.image('SunFace', 'assets/GameA/Links/sunFace.png');
        this.load.image('GameAInstructions', 'assets/GameA/Links/instructions.png');
        
        //Game B
        this.load.image('GameBBackground', 'assets/GameB/Links/background.jpg');
        this.load.image('RightChoiceButton', 'assets/GameB/Links/rightChoice.png');
        this.load.image('LeftChoiceButton', 'assets/GameB/Links/leftChoice.png');
        this.load.image('GameBInstructions', 'assets/GameB/Links/instructions.png');
        this.load.image('GameCInstructions', 'assets/GameC/Links/instructions.png');
        for (var i = 0; i < badChoiceList.length; i++) {
            this.load.image(badChoiceList[i], 'assets/GameB/Links/' + badChoiceList[i] + '.png');
        }
        for (var i = 0; i < goodChoiceList.length; i++) {
            this.load.image(goodChoiceList[i], 'assets/GameB/Links/' + goodChoiceList[i] + '.png');
        }
        
        //Game C
        this.load.image('ship', 'assets/GameC/Links/velero.png');
        this.load.image('moon', 'assets/GameC/Links/moon.png');
        this.load.image('hotel1', 'assets/GameC/Links/hotel1.png');
        this.load.image('hotel2', 'assets/GameC/Links/hotel2.png');
        this.load.image('hotel3', 'assets/GameC/Links/hotel3.png');
        this.load.image('hotel4', 'assets/GameC/Links/hotel4.png');
        this.load.image('eco0', 'assets/GameC/Links/eco1.png');
        this.load.image('eco1', 'assets/GameC/Links/eco2.png');
        this.load.image('eco2', 'assets/GameC/Links/eco3.png');
        
        //Game D
        this.load.image('GameDBackground', 'assets/GameD/Links/background.jpg');
        this.load.image('GameDInstructions', 'assets/GameD/Links/instructions.png');
        this.load.image('Coral1', 'assets/GameA/Links/monticulo2.png');
        this.load.image('Coral2', 'assets/GameA/Links/monticulo3.png');
        this.load.image('Scubaman', 'assets/GameD/Links/buzo.png');
        this.load.image('YellowFish', 'assets/GameD/Links/pezamarillo.png');
        this.load.image('BlueFish', 'assets/GameD/Links/pezacostado.png');
        this.load.image('RedFish', 'assets/GameD/Links/pezrojo.png')
        
        //Game E
        this.load.image('GameEInstructions', 'assets/GameE/Links/instructions.png');
        this.load.image('GameEBackground', 'assets/GameE/Links/background.jpg')
        for (var i = 0; i < 3; i++) {
            this.load.image(badWasteList[i], 'assets/GameE/Links/' + badWasteList[i] + '.png');
        }
        for (var i = 0; i < goodWasteList.length; i++) {
            this.load.image(goodWasteList[i], 'assets/GameE/Links/' + goodWasteList[i] + '.png');
        }
        
        //Game F
        this.load.image('GameFInstructions', 'assets/GameF/Links/instructions.png');
        this.load.image('cruiseShip', 'assets/GameF/Links/crucero.png');
        this.load.image('goodFish1', 'assets/GameF/Links/peztecni.png');
        this.load.image('goodFish2', 'assets/GameF/Links/duo.png');
        this.load.image('goodFish3', 'assets/GameF/Links/cuarteto.png');
        this.load.image('badFish1', 'assets/GameF/Links/badFish1.png');
        this.load.image('badFish2', 'assets/GameF/Links/badFish2.png');
        
        //Game G
        this.load.image('GameGBackground', 'assets/GameG/Links/background.jpg');
        this.load.image('GameGInstructions', 'assets/GameG/Links/instructions.png');
        this.load.image('hitbox', 'assets/GameG/Links/hitbox.png');
        
        //Game H
        this.load.image('GameHBackground', 'assets/GameH/Links/background.jpg');
        this.load.image('GameHInstructions', 'assets/GameH/Links/instructions.png');
        this.load.image('goodButton', 'assets/GameH/Links/happyButton.png');
        this.load.image('badButton', 'assets/GameH/Links/sadButton.png');
        for (var i = 0; i < goodHList.length; i++) {
            this.load.image(goodHList[i], 'assets/GameH/Links/' + goodHList[i] + '.png');
        }
        for (var i = 0; i < badHList.length; i++) {
            this.load.image(badHList[i], 'assets/GameH/Links/' + badHList[i] + '.png');
        }
        
        //Game I
        this.load.image('GameIInstructions', 'assets/GameI/Links/instructions.png');
        this.load.image('GameIBackground', 'assets/GameI/Links/background.jpg');
        this.load.image('barI', 'assets/GameI/Links/bar.png');
        
        
        //Outcome
        this.load.image('Maskin', 'assets/Outcome/Links/maskin.png');
        this.load.image('Maskin2', 'assets/Outcome/Links/maskin2.png');

		//this.background = this.add.sprite(0, 0, 'preloaderBackground');
		//this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');
		//this.load.setPreloadSprite(this.preloadBar);

		
		//this.load.image('titlepage', 'images/title.jpg');
		//this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
		/*this.load.audio('music', ['assets/music.ogg', 'assets/music.m4a']);
        this.load.audio('fireSound', ['assets/fireSound.wav']);
        this.load.audio('enemyDieSound', ['assets/enemyDie.wav']);
        this.load.spritesheet('button', 'assets/button.png', 579 / 3, 89);
        
        //Load player + enemies
        this.load.spritesheet('playerMove', 'assets/playerMove.png', 64, 64);
        this.load.image('fire', 'assets/fire.png');
        this.load.spritesheet('enemyMove', 'assets/enemyMove.png', 64, 64);
        
        //other images
        this.load.image('background', 'assets/background.jpg');*/
        
        
		//this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
		//	+ lots of other required assets here

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		//this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};
