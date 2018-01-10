"use strict";
//Controls
var player = null;
var fireRate = 0;
var up, down, left, right;

//Groups
var enemies = null;
var fires = null;

//Logic
var enemyTimer = 0;

BasicGame.Game = function (game) {

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

BasicGame.Game.prototype = {

	create: function () {
        
        menuBackground = this.add.image(this.world.centerX, this.world.centerY, 'background');
        menuBackground.anchor.setTo(0.5);
        
        //Fires
        fires = this.add.group();
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
        level_txt.align = 'left';
	},

	update: function () {
        //Update hud
        level_txt.setText("Level " + PLAYER_DATA.LEVEL);
        
        //Move player
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        if (right.isDown){
            player.body.velocity.x = PLAYER_DATA.SPEED;
        }
        else if (left.isDown){
            player.body.velocity.x = -PLAYER_DATA.SPEED;
        }
        if (up.isDown){
            player.body.velocity.y = -PLAYER_DATA.SPEED;
        }
        else if (down.isDown){
            player.body.velocity.y = PLAYER_DATA.SPEED;
        }
        
        //Aim player
        player.rotation = this.physics.arcade.angleToPointer(player) + 90;
        if (this.input.activePointer.isDown){
            spawnFire();
        }
        
        //Animate player
        if (player.body.velocity.x != 0 || player.body.velocity.y != 0){
            player.animations.play('move');
        }
        else{
            player.animations.play('idle');
        }
        
        //Animate enemies
        for (var i = enemies.length - 1; i>= 0; i--){
            if (enemies.getAt(i).body.velocity.x != 0 || enemies.getAt(i).body.velocity.y != 0){
                enemies.getAt(i).animations.play('move', 3, true);
            }
            else{
                enemies.getAt(i).animations.play('idle');
            }
            
            //rotate to player
            enemies.getAt(i).rotation = this.physics.arcade.angleBetween(enemies.getAt(i), player) + 90;
        }
        
        //Behaviours
        enemyTimer += (thisGame.time.now - enemyTimer);
        if (enemyTimer % 5000 < 2000){
            for (var i = enemies.length - 1; i >= 0; i--){
                this.physics.arcade.moveToObject(enemies.getAt(i), player, ENEMY_DATA.SPEED);
            }
        }
        else{
            if (enemyTimer % 1000 < 50){
                for (var k = enemies.length - 1; k >= 0; k--){
                    enemies.getAt(k).body.velocity.x = this.rnd.integerInRange(-ENEMY_DATA.SPEED, ENEMY_DATA.SPEED);
                    enemies.getAt(k).body.velocity.y = this.rnd.integerInRange(-ENEMY_DATA.SPEED, ENEMY_DATA.SPEED);
                }
            }
        }
        
        //Collisions
        this.physics.arcade.overlap(fires, enemies, fireHitsEnemy, null, this);
        this.physics.arcade.collide(enemies, player, enemyHitsPlayer, null, this);
	}

};

function fireHitsEnemy(fire, enemy)
{
    enemy.body.health--;
    fire.kill();
    if (enemy.body.health <= 0){
        //kill enemy
        enemy.kill();
        gm.enemyDieSound.play();
        ENEMY_DATA.ALIVE_COUNT--;
        
        //Spawn more if needed
        checkEnemiesStatus();
    }
}

function enemyHitsPlayer(enemy, player){
    PLAYER_DATA.DIES++;
    goToState('MainMenu');
}

function checkEnemiesStatus()
{
    //Up the level
    if (ENEMY_DATA.ALIVE_COUNT < 3){
        PLAYER_DATA.LEVEL++;
        PLAYER_DATA.FIRE_RATE = 250 - (PLAYER_DATA.LEVEL * 10);
        if (PLAYER_DATA.FIRE_RATE < 0){
            PLAYER_DATA.FIRE_RATE = 20;
        }
        PLAYER_DATA.SPEED = 50 + (PLAYER_DATA.LEVEL * 5);
        spawnEnemies();
    }
}

//Spawn all the enemies
function spawnEnemies()
{
    ENEMY_DATA.MAX_ENEMIES++;
    ENEMY_DATA.MAX_HEALTH++;
    for (var x = 1; x <= ENEMY_DATA.MAX_ENEMIES; x++){
        var tempEnemy;
        if (x < 5){
            //First row
            tempEnemy = enemies.create(x * (thisGame.world.width / (ENEMY_DATA.MAX_ENEMIES + 1)), 100, 'enemyMove');
            tempEnemy.body.velocity.y = 5;
        }
        else{
            //Second row
            tempEnemy = enemies.create(x * (thisGame.world.width / (ENEMY_DATA.MAX_ENEMIES + 1)), 200, 'enemyMove');
        }
        
        tempEnemy.body.collideWorldBounds = true;
        tempEnemy.anchor.setTo(0.5, 0.5);
        tempEnemy.animations.add('idle', [0], 1, true);
        tempEnemy.animations.add('move', [0, 1, 2, 3], 30, true);
        tempEnemy.play('idle');
        tempEnemy.body.health = ENEMY_DATA.MAX_HEALTH;
    }
    
    ENEMY_DATA.ALIVE_COUNT += ENEMY_DATA.MAX_ENEMIES;
}

function spawnFire()
{
    if (thisGame.time.now > fireRate && fires.countDead() > 0){
        gm.fireSound.play();
        fireRate = thisGame.time.now + PLAYER_DATA.FIRE_RATE;
        var fire = fires.getFirstDead();
        fire.reset(player.x, player.y);
        thisGame.physics.arcade.moveToPointer(fire, 400);
    }
}
