"use strict";

//Gameplay logic
var gameState = "play";
var gameTimer = 0;
var playerTaps = 0;

//Player
var divingBoard;
var player;
var playerSunscreen;

//UI
var scoreTab;
var scoreTab_txt;
var timerTab;
var timeTab_txt;
var timerBar;

BasicGame.GameA = function (game) {

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

BasicGame.GameA.prototype = {

	create: function () {
        
        //Init
        playerTaps = 0;
        
        //Setting
        var levelBackground = this.add.image(this.world.centerX, this.world.centerY, 'GameABackground');
        levelBackground.anchor.setTo(0.5);
        
        //Pool and diving board
        var pool = this.add.image(this.world.centerX, this.world.centerY + 300, 'Pool');
        pool.anchor.setTo(0.5);
        pool.scale.setTo(0.5, 0.5);
        var tape = this.add.image(this.world.centerX, this.world.centerY + 130, 'Maskin1');
        tape.anchor.setTo(0.5);
        tape.scale.setTo(0.3);
        divingBoard = this.add.image(this.world.centerX, this.world.centerY, 'Textura6');
        divingBoard.anchor.setTo(0.5, 0);
        divingBoard.scale.setTo(0.1, 0.05);
        
        //Time bar
        
        
        //Player
        player = this.add.image(this.world.centerX, divingBoard.y, 'Player');
        player.anchor.setTo(0.5, 0.85);
        player.scale.setTo(0.25);
        
        playerSunscreen = this.add.image(this.world.centerX, divingBoard.y, 'PlayerSunscreen');
        playerSunscreen.anchor.setTo(0.5, 0.85);
        playerSunscreen.scale.setTo(0.25);
        playerSunscreen.inputEnabled = true;
        playerSunscreen.events.onInputDown.add(tappedPlayer, this);
        //playerSunscreen.input.useHandCursor = true;
        
        //UI
        scoreTab = this.add.image(this.world.width - 140, 50, 'Papel4');
        scoreTab.anchor.setTo(0.5);
        scoreTab.scale.setTo(0.3, 0.5);
        scoreTab.angle -= 85;
        scoreTab_txt = this.game.add.text(scoreTab.x - 50, scoreTab.y, "Score ", {font:"30px ZombieChecklist", fill:"#000000"});
        scoreTab_txt.anchor.setTo(0.5);
        scoreTab_txt.align = 'left';
        
        //Fires
        /*fires = this.add.group();
        fires.enableBody = true;
        fires.physicsBodyType = Phaser.Physics.ARCADE;
        fires.createMultiple(50, 'fire');
        fires.setAll('checkWorldBounds', true);
        fires.setAll('outOfBoundsKill', true);
        
        //Create player
        this.physics.startSystem(Phaser.Physics.ARCADE);
        player = this.add.sprite(this.world.centerX, this.world.centerY + 100, 'playerMove');
        player.anchor.set(0.5);
        this.physics.enable(player, Phaser.Physics.ARCADE);
        player.animations.add('idle', [0], 1, true);
        player.animations.add('move', [0,1,2,3,4,5,6,7], 20, true);
        player.body.collideWorldBounds = true;
        
        //Enemies
        enemies = this.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;
        spawnEnemies();
        
        
        //Create cursor keys
        up = this.input.keyboard.addKey(Phaser.Keyboard.W);
        down = this.input.keyboard.addKey(Phaser.Keyboard.S);
        left = this.input.keyboard.addKey(Phaser.Keyboard.A);
        right = this.input.keyboard.addKey(Phaser.Keyboard.D);
        
        //HUD
        var levelText = "Level " + PLAYER_DATA.LEVEL;
        level_txt = this.add.text(20, 20, levelText);
        level_txt.anchor.setTo(0, 0);
        level_txt.fill = '#FFFFFF';
        level_txt.font = 'Revalia';
        level_txt.fontSize = 30;
        level_txt.align = 'left';*/
	},

	update: function () {
        
	}

};

function tappedPlayer() {
    if (gameState == "play") {
        playerTaps++;
        playerSunscreen.alpha = 1 - (playerTaps / GAME_A.TAPS_NEEDED[PLAYER_DATA.DIFFICULTY]);
    }
}