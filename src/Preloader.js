"use strict";

BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {
        
        var loading_txt = this.game.add.text(this.world.centerX, this.world.centerY, "Loading...", {font:"40px Arial", fill:"#000000"});
        loading_txt.anchor.setTo(0.5);
        loading_txt.fontSize = 50;
        loading_txt.align = 'center';
        
        
        //Boards
        for (var i = 0; i < 30; i++) {
            this.load.image('Board' + i, 'assets/Boards/NWSB1-' + i + '.png');
        }
        
        //Cards
        
        //Misc
        this.load.image('O', 'assets/o.png');
        this.load.image('Button', 'assets/button.png');

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
