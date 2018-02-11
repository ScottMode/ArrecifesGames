"use strict";

//Gameplay logic
var gameState = "play";

//D
var coral = null;
var scubaMan = null;
var fish = null;

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


BasicGame.GameD = function (game) {

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

BasicGame.GameD.prototype = {

	create: function () {
        
        //Init
        gameState = "intro";
        gameTimer = GAME_A.MAX_TIME[PLAYER_DATA.DIFFICULTY];
        
        //Setting
        var levelBackground = this.add.image(this.world.centerX, this.world.centerY, 'GameDBackground');
        levelBackground.anchor.setTo(0.5);
        levelBackground.scale.setTo(0.6);
        
        
        //Coral
        coral = this.add.physicsGroup();
        for (var i = 1; i < 4; i++) {
            var cor = null;
            
            if (i % 2) {
                cor = coral.create(i * 550, this.world.centerY + 250, 'Coral1');
                cor.scale.setTo(0.4);
                cor.anchor.setTo(0.5);
            }
            else {
                cor = coral.create(i * 550, this.world.centerY + 400, 'Coral2');
                cor.scale.setTo(0.6);
                cor.anchor.setTo(0.5);
            }
        }
        
        fish = this.add.physicsGroup();
        for (var i = 0; i < 9; i++) {
            var f = null;
            
            if (i < 3) {
                f = fish.create(300 + Math.floor(Math.random() * (this.world.width - 300)), this.world.centerY + 100 + Math.floor(Math.random() * 600), 'YellowFish');
                f.scale.setTo(0.2);
                f.anchor.setTo(0.5);
                f.moveSpeed = 1 + Math.floor(Math.random() * 7);
            } else if (i < 6) {
                f = fish.create(300 + Math.floor(Math.random() * (this.world.width - 300)), this.world.centerY + 100 + Math.floor(Math.random() * 600), 'BlueFish');
                f.scale.setTo(0.05);
                f.anchor.setTo(0.5);
                f.moveSpeed = 1 + Math.floor(Math.random() * 7);
            } else {
                f = fish.create(300 + Math.floor(Math.random() * (this.world.width - 300)), this.world.centerY + 100 + Math.floor(Math.random() * 600), 'RedFish');
                f.scale.setTo(0.05);
                f.anchor.setTo(0.5);
                f.moveSpeed = 1 + Math.floor(Math.random() * 7);
            }
        }
        
        //Player
        this.physics.startSystem(Phaser.Physics.ARCADE);
        scubaMan = this.add.sprite(100, this.world.centerY + 300, 'Scubaman');
        scubaMan.anchor.setTo(0.5);
        scubaMan.scale.setTo(0.07);
        this.physics.arcade.enable(scubaMan);
        scubaMan.inputEnabled = true;
        scubaMan.input.enableDrag(true);
        //scubaMan.body.collideWorldBounds = true;
        
        //Fish
        
        //UI
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
        //instructionsModal.scale.setTo(0.7);
        
        //Hand
        instructionsPlayButton = thisGame.add.button(thisGame.world.centerX - 8, this.world.centerY + 380, 'Papel4', this.playGame, this);
        instructionsPlayButton.anchor.setTo(0.5);
        instructionsPlayButton.scale.setTo(0.4);
        instructionsPlayButton.input.useHandCursor = true;
        instructionsPlayButton.angle -= 80;
        instructionsPlayButton_txt = this.game.add.text(instructionsPlayButton.x, instructionsPlayButton.y, "INICIAR", {font:"55px ZombieChecklist", fill:"#000000"});
        instructionsPlayButton_txt.anchor.setTo(0.5);
        instructionsPlayButton_txt.align = 'center';
        
        this.addScore(1000);
	},
    
    playGame: function() {
        gameState = "play";
        instructionsModal.visible = false;
        instructionsPlayButton.visible = false;
        instructionsPlayButton_txt.visible = false;
    },

	update: function () {
        
        if (gameState == "play"){
            
            scubaMan.tint = 0xffffff;
            
            this.physics.arcade.overlap(scubaMan, coral, this.overlapEcosystem, null, this);
            this.physics.arcade.overlap(scubaMan, fish, this.overlapEcosystem, null, this);
            
            gameTimer -= this.time.elapsed/1000;
            cropRect.width = barWidth * ((gameTimer / GAME_A.MAX_TIME[PLAYER_DATA.DIFFICULTY]));
            timerBar.crop(cropRect);
            timerBar.updateCrop();
            
            if (gameTimer <= 0){
                addScore(-500);
                gameState = "lose";
                gameTimer = 0;
                timerBar.scale.setTo(0, 0);
            }
            
            //Move fish
            for (var i = fish.children.length - 1; i >= 0; i--) {
                
                
                fish.children[i].x -= fish.children[i].moveSpeed;
                
                if (fish.children[i].x < -100) {
                    fish.children[i].x = this.world.width;
                }
            }
            
            if (scubaMan.x > this.world.width - 200) {
                gameState = "lose";
            }
        }
        else if (gameState == "lose"){
            this.state.start('Outcome', true);
        }
        
        if (scubaMan.y < this.world.centerY + 100) {
            scubaMan.y = this.world.centerY + 100;
        }
	},
    
    addScore: function (amount) {
        PLAYER_DATA.SCORE += amount;
        PLAYER_DATA.ROUND_SCORE += amount;
        scoreTab_txt.text = "Score " + PLAYER_DATA.ROUND_SCORE;
    },
    
    overlapEcosystem: function (player, object) {
        if (gameState == "play") {
            this.addScore(-1);
            
            scubaMan.tint = Math.floor(Math.random() * 10) * 0xff0000;
        }
    }

};