"use strict";

//Gameplay logic
var gameState = "play";

//G
var playerShip = null;
var hitboxGroup = null;
var startLine = null;
var startLine_txt = null;
var finishLine = null;
var finishLine_txt = null;


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


BasicGame.GameG = function (game) {

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

BasicGame.GameG.prototype = {

	create: function () {
        
        //Init
        gameState = "intro";
        gameTimer = GAME_A.MAX_TIME[PLAYER_DATA.DIFFICULTY];
        
        //Preset
        //Setting
        var levelBackground = this.add.image(this.world.centerX, this.world.centerY, 'GameGBackground');
        levelBackground.anchor.setTo(0.5);
        
        startLine = thisGame.add.image(thisGame.world.centerX + 600, this.world.centerY - 150, 'Papel4');
        startLine.anchor.setTo(0.5);
        startLine.scale.setTo(0.2, 0.3);
        startLine.angle -= 85;
        startLine_txt = this.game.add.text(startLine.x, startLine.y, "inicio", {font:"40px ZombieChecklist", fill:"#000000"});
        startLine_txt.anchor.setTo(0.5);
        startLine_txt.align = 'center';
        
        
        finishLine = thisGame.add.sprite(thisGame.world.centerX + 100, this.world.centerY - 300, 'Papel4');
        finishLine.anchor.setTo(0.5);
        finishLine.scale.setTo(0.2, 0.3);
        finishLine.angle -= 85;
        this.physics.arcade.enable(finishLine);
        finishLine_txt = this.game.add.text(finishLine.x, finishLine.y, "final", {font:"40px ZombieChecklist", fill:"#000000"});
        finishLine_txt.anchor.setTo(0.5);
        finishLine_txt.align = 'center';
        
        //Hitboxes
        hitboxGroup = this.add.physicsGroup();
        for (var i = 1; i < 10; i++) {
            var cor = null;
            var randX = Math.floor(Math.random() * (this.world.centerX + 500));
            var randY = Math.floor(Math.random() * this.world.height);
            
            while (randY < this.world.centerY + 300 && randY > this.world.centerY + 150) {
                randY = Math.floor(Math.random() * this.world.height);
            }
            
            
            cor = hitboxGroup.create(randX, randY, 'Coral1');
            cor.scale.setTo(0.1);
            cor.anchor.setTo(0.5);
        }
        
        var cor1 = hitboxGroup.create(this.world.centerX - 200, this.world.centerY + 150, 'hitbox');
        cor1.scale.setTo(22, 4);
        cor1.anchor.setTo(0.5);
        cor1.visible = false;
        
        var cor2 = hitboxGroup.create(this.world.centerX + 300, this.world.centerY - 300, 'hitbox');
        cor2.scale.setTo(4, 20);
        cor2.anchor.setTo(0.5);
        cor2.visible = false;
        
        
        //Ship
        //Player
        this.physics.startSystem(Phaser.Physics.ARCADE);
        playerShip = this.add.sprite(this.world.centerX + 600, this.world.centerY - 50, 'ship');
        playerShip.anchor.setTo(0.5);
        playerShip.scale.setTo(0.1);
        this.physics.arcade.enable(playerShip);
        playerShip.inputEnabled = true;
        playerShip.input.enableDrag(true);
        
        
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
        instructionsPlayButton = thisGame.add.button(thisGame.world.centerX - 6, this.world.centerY + 370, 'Papel4', this.playGame, this);
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
            
            this.physics.arcade.overlap(playerShip, hitboxGroup, this.hitHitBox, null, this);
            this.physics.arcade.overlap(playerShip, finishLine, this.finishedMaze, null, this);
            
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
        else if (gameState == "lose" || gameState == "win"){
            this.state.start('Outcome', true);
        }
	},
    
    addScore: function (amount) {
        PLAYER_DATA.SCORE += amount;
        PLAYER_DATA.ROUND_SCORE += amount;
        scoreTab_txt.text = "Score " + PLAYER_DATA.ROUND_SCORE;
    },
    
    hitHitBox: function (player, object) {
        if (gameState == "play") {
            gameState = "lose";
        }
    },
    
    finishedMaze: function (player, object) {
        if (gameState == "play") {
            gameState = "win";
            addScore(1000);
        }
    }
};