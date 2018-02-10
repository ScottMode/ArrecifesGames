"use strict";

//Gameplay logic
var gameState = "play";

//H
var goodButton = null;
var badButton = null;
var centerPaper = null;
var centerImage = null;
var centerText = null;

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


BasicGame.GameH = function (game) {

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

BasicGame.GameH.prototype = {

	create: function () {
        
        //Init
        gameState = "intro";
        gameTimer = GAME_A.MAX_TIME[PLAYER_DATA.DIFFICULTY];
        
        //Preset
        //Setting
        var levelBackground = this.add.image(this.world.centerX, this.world.centerY, 'GameHBackground');
        levelBackground.anchor.setTo(0.5);
        
        //Good/bad buttons
        //Choice buttons
        goodButton = this.add.button(this.world.centerX + 150, this.world.centerY + 400, 'goodButton', this.pickGood, this);
        goodButton.anchor.setTo(0.5);
        goodButton.scale.setTo(0.2);
        goodButton.correct = false;
        
        badButton = this.add.button(this.world.centerX - 150, this.world.centerY + 400, 'badButton', this.pickBad, this);
        badButton.anchor.setTo(0.5);
        badButton.scale.setTo(0.2);
        badButton.correct = false;
        
        
        //Center paper, image, text
        centerPaper = this.add.image(this.world.centerX, this.world.centerY, 'Papel2');
        centerPaper.anchor.setTo(0.5);
        centerPaper.scale.setTo(0.5);
        centerPaper.angle -= 173;
        
        centerImage = this.add.image(this.world.centerX, this.world.centerY, 'Papel2');
        centerImage.anchor.setTo(0.5);
        centerImage.scale.setTo(0.3);
        
        centerText = this.game.add.text(this.world.centerX, this.world.centerY + 200, "text", {font:"55px ZombieChecklist", fill:"#000000"});
        centerText.anchor.setTo(0.5);
        centerText.align = 'center';
        
        this.setButtonChoices();
        
        
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
        instructionsPlayButton.scale.setTo(0.5);
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
    },
    
    pickGood: function (button) {
        if (goodButton.correct) {
            this.addScore(200);
        } else {
            this.addScore(-200);
        }
        
        this.setButtonChoices();
    },
    
    pickBad: function (button) {
        if (badButton.correct) {
            this.addScore(200);
        } else {
            this.addScore(-200);
        }
        
        this.setButtonChoices();
    },
    
    setButtonChoices: function () {
        
        var isGood = !!+(Math.floor(Math.random() * 2));
        
        goodButton.correct = isGood;
        badButton.correct = !isGood;
        
        if (isGood) {
            var newChoice = goodHList[(Math.floor(Math.random() * goodHList.length))];
            
            while (newChoice == centerImage.choice) {
                newChoice = goodHList[(Math.floor(Math.random() * goodHList.length))];
            }
            
            centerImage.choice = newChoice;
        } else {
            var newChoice = badHList[(Math.floor(Math.random() * badHList.length))];
            
            while (newChoice == centerImage.choice) {
                newChoice = badHList[(Math.floor(Math.random() * badHList.length))];
            }
            
            centerImage.choice = newChoice;
        }
        
        centerImage.loadTexture(centerImage.choice);
        centerText.text = centerImage.choice;
    }
};