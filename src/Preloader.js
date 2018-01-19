"use strict";

BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {
        
        /*loading_txt = this.add.text(this.world.centerX, this.world.centerY, 'Loading...');
        loading_txt.anchor.setTo(0.5);
        loading_txt.fill = '#FFFFFF';
        loading_txt.font = 'Zombie';
        loading_txt.fontSize = 50;
        loading_txt.align = 'center';*/
        
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
        
        //Game A
        this.load.image('GameABackground', 'assets/GameA/Links/background.png');
        this.load.image('Pool', 'assets/GameA/Links/alberca.png');
        this.load.image('Player', 'assets/GameA/Links/player.png');
        this.load.image('PlayerSunscreen', 'assets/GameA/Links/playerSunscreen.png');
        this.load.image('Maskin1', 'assets/GameA/Links/maskin1.png');
        this.load.image('Textura6', 'assets/GameA/Links/textura6.png');
        this.load.image('TimeBar', 'assets/GameA/Links/timeBar.png');
        this.load.image('SunFace', 'assets/GameA/Links/sunFace.png');
        
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
