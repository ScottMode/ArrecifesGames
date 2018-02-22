"use strict";

//Gameplay logic
var placedO = false;

//UI
var board = null;
var nextButton = null;
var nextButton_txt = null;

BasicGame.Board = function (game) {

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

BasicGame.Board.prototype = {

	create: function () {
        
        //Init
        placedO = false;
        
        //Init board
        currentBoard = getRandomInt(0, 29);
        board = this.add.image(this.world.centerX, this.world.centerY, 'Board' + currentBoard);
        board.anchor.setTo(0.5);
        board.scale.setTo(0.75);
        
        //UI
        nextButton = this.add.button(this.world.centerX, this.world.centerY + 400, 'Button', nextBoard, this);
        nextButton_txt = this.game.add.text(this.world.centerX, this.world.centerY + 400, "New Board", {font:"40px Arial", fill:"#FFFFFF"});
        setButton(nextButton, nextButton_txt, 35, null);
	},

	update: function () {
        if (this.input.activePointer.isDown && this.input.activePointer.y < this.world.centerY + 300 && !placedO) {
            placedO = true;
            createO();
        }
        if (this.input.activePointer.isUp) {
            placedO = false;
        }
	}

};

function createO() {
    var o = thisGame.add.sprite(thisGame.input.activePointer.x, thisGame.input.activePointer.y, 'O');
    o.anchor.setTo(0.5);
    o.scale.setTo(0.5);
}

function nextBoard() {
    currentBoard = getRandomInt(0, 29);
    board.loadTexture('Board' + currentBoard);
}