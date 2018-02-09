"use strict";

//Gameplay logic
var gameState = "play";

//UI
var instructionsModal;
var instructionsPlayButton;
var instructionsPlayButton_txt;
var cropRect;
var scoreTab;
var scoreTab_txt;
var timerTab;
var timerTab_txt;
var timerBar;
var barWidth;


BasicGame.GameI = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.GameI.prototype = {

	create: function () {
        
        //Init
        gameState = "intro";
        gameTimer = GAME_A.MAX_TIME[PLAYER_DATA.DIFFICULTY];
        
        //Preset
        //Setting
        var levelBackground = this.add.image(this.world.centerX, this.world.centerY, 'GameIBackground');
        levelBackground.anchor.setTo(0.5);
        //Score
        scoreTab = this.add.image(this.world.width - 140, 50, 'Papel4');
        scoreTab.anchor.setTo(0.5);
        scoreTab.scale.setTo(0.3, 0.5);
        scoreTab.angle -= 85;
        scoreTab_txt = this.game.add.text(scoreTab.x - 90, scoreTab.y + 2, "SCORE " + PLAYER_DATA.ROUND_SCORE, {font:"40px Moon Flower Bold", fill:"#000000"});
        scoreTab_txt.anchor.setTo(0, 0.5);
        scoreTab_txt.align = 'left';
        //Time
        timerTab = this.add.image(100, 50, 'Papel4');
        timerTab.anchor.setTo(0.5);
        timerTab.scale.setTo(0.2, 0.30);
        timerTab.angle -= 85;
        timerTab_txt = this.game.add.text(timerTab.x, timerTab.y + 2, "TIEMPO" , {font:"40px Moon Flower Bold", fill:"#000000"});
        timerTab_txt.anchor.setTo(0.5);
        timerTab_txt.align = 'center';
        timerBar = this.add.image(200, 50, 'TimeBar');
        timerBar.anchor.setTo(0, 0.5);
        timerBar.cropEnabled = true;
        barWidth = timerBar.width;
        cropRect = new Phaser.Rectangle(0, 0, timerBar.width, timerBar.height);
        timerBar.scale.setTo(0.4, 0.5)
        //instructions
        instructionsModal = this.add.image(this.world.centerX, this.world.centerY, PLAYER_DATA.CURRENT_GAME + "Instructions");
        instructionsModal.anchor.setTo(0.5);
        instructionsModal.scale.setTo(0.7);
        //Hand
        instructionsPlayButton = thisGame.add.button(thisGame.world.centerX - 8, this.world.centerY + 380, 'Papel4', this.playGame, this);
        instructionsPlayButton.anchor.setTo(0.5);
        instructionsPlayButton.scale.setTo(0.4);
        instructionsPlayButton.input.useHandCursor = true;
        instructionsPlayButton.angle -= 80;
        instructionsPlayButton_txt = this.game.add.text(instructionsPlayButton.x, instructionsPlayButton.y, "INICIAR", {font:"55px ZombieChecklist", fill:"#000000"});
        instructionsPlayButton_txt.anchor.setTo(0.5);
        instructionsPlayButton_txt.align = 'center';
	},
    
    playGame: function() {
        gameState = "play";
        instructionsModal.visible = false;
        instructionsPlayButton.visible = false;
        instructionsPlayButton_txt.visible = false;
    },

	update: function () {
        
        if (gameState == "play"){
            
            gameTimer -= this.time.elapsed/1000;
            cropRect.width = barWidth * ((gameTimer / GAME_A.MAX_TIME[PLAYER_DATA.DIFFICULTY]));
            timerBar.crop(cropRect);
            timerBar.updateCrop();
            
            if (gameTimer <= 0){
                gameState = "lose";
                gameTimer = 0;
                timerBar.scale.setTo(0, 0);
            }
        }
        else if (gameState == "lose"){
            this.state.start('Outcome', true);
        }
	},
    
    addScore: function (amount) {
        PLAYER_DATA.SCORE += amount;
        PLAYER_DATA.ROUND_SCORE += amount;
        scoreTab_txt.text = "Score " + PLAYER_DATA.ROUND_SCORE;
    }
};