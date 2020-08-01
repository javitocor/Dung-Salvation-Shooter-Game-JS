import 'phaser';
import Player from '../Objects/Player';
import ScrollingBackground from '../scrolling';
import Destroyer from '../Objects/enemies/destroyer';
import Fighter from '../Objects/enemies/fighter';
import CarrierShip from '../Objects/enemies/carrier';
import Boss from '../Objects/enemies/boss';

let life1;
let life2;
let life3;

export default class GameScene extends Phaser.Scene {
  constructor(scene, key, bossText, boss) {
    super(scene);
    this.key = key;
    this.bossText = bossText;
    this.boss = boss;
  }

  create() {
    life1 = this.add.image(750, 50, 'playerShip').setDisplaySize(50, 50);
    life2 = this.add.image(700, 50, 'playerShip').setDisplaySize(50, 50);
    life3 = this.add.image(650, 50, 'playerShip').setDisplaySize(50, 50);
    let score = 0;
    const scoreBoard = this.add.bitmapText(10, 10, 'arcade', `Score: ${score}`, 14).setTint(0x08B0F8);
    
    this.anims.create({
      key: "explosion",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0
    });

    this.sfx = {
      explosions: [
        this.sound.add("explosion1", { volume: 0.7 }),
        this.sound.add("explosion2", { volume: 0.7 })
      ],
      laser: this.sound.add("laser", { volume: 0.5 }),
      missile: this.sound.add('missile', { volume: 0.2 })
    };
 
    this.backgrounds = [];
    for (var i = 0; i < 2; i++) {
      var bg = new ScrollingBackground(this, this.key, i * 10);
      this.backgrounds.push(bg);
    }

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "playerShip"
    );

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.enemyMissiles = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay: 1000,
      callback: function () {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new Destroyer(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType("fighter").length < 5) {

            enemy = new Fighter(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0
            );
          }
        } else {
          enemy = new CarrierShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true
    });

    this.time.addEvent({
      delay: 15000,
      callback: function () {
        this.scene.pause();
        this.scene.launch(this.bossText);
        const boss = this.boss;
        boss.setScale(2.1);
        if (boss != undefined) {
          this.enemies.add(boss);
        }
      },
      callbackScope: this
    });

    this.physics.add.collider(this.playerLasers, this.enemies, function (playerLaser, enemy) {
      if (enemy) {
        if(enemy.lifes !== undefined){
          enemy.lifes--;
          playerLaser.destroy();
          if(enemy.lifes === 0 && !enemy.getData('isDead')){
            enemy.explode(true);
            playerLaser.destroy();
            enemy.onDestroy();
            score += 250;
            window.localStorage.setItem('score', JSON.stringify(score));
            scoreBoard.text = `Score: ${score}`;
          }
        }
        
        if(enemy.onDestroy !== undefined && enemy.lifes === undefined) {
            enemy.onDestroy();
            if (enemy instanceof Destroyer) {
              score += 125;
            } else if (enemy instanceof Fighter) {
              score += 75;
            } else if (enemy instanceof CarrierShip) {
              score += 100;
            }
            enemy.explode(true);
            playerLaser.destroy();
            window.localStorage.setItem('score', JSON.stringify(score));
            scoreBoard.text = `Score: ${score}`;
          }                
      }
    });

    this.physics.add.overlap(this.player, this.enemies, function (player, enemy) {
      if (!player.getData("isDead") && !enemy.getData("isDead")) {
        enemy.explode(true);
        if(player.lifes > 0) {
          player.lifes--;
        } else {
          player.explode(false);
          player.onDestroy();
        }
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, function (player, laser) {
      if (!player.getData("isDead") && !laser.getData("isDead")) {
          player.lifes--;
          laser.destroy();          
          if(player.lifes === 0){
            player.explode(false);
            player.onDestroy();
          }
      }
    });

    this.physics.add.overlap(this.player, this.enemyMissiles, function (player, missile) {
      if (!player.getData("isDead") && !missile.getData("isDead")) {
          player.lifes--;
          missile.destroy();          
          if(player.lifes === 0){
            player.explode(false);
            player.onDestroy();
          }
      }
    });

    this.physics.add.collider(this.enemyLasers, this.playerLasers, (enemyLaser, playerLaser) => {
      if (playerLaser) {
        score += 5;
        playerLaser.explode(false);
        enemyLaser.destroy();
        window.localStorage.setItem('score', JSON.stringify(score));
        scoreBoard.text = `Score: ${score}`;
      }
    });

    this.physics.add.collider(this.enemyMissiles, this.playerLasers, (enemyMissile, playerLaser) => {
      if (playerLaser) {
        score += 5;
        playerLaser.explode(false);
        enemyMissile.destroy();
        window.localStorage.setItem('score', JSON.stringify(score));
        scoreBoard.text = `Score: ${score}`;
      }
    });
  }

  getEnemiesByType(type) {
    var arr = [];
    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];
      if (enemy.getData("type") == type) {
        arr.push(enemy);
      }
    }
    return arr;
  }

  update() {

    if (this.player.lifes === 2) {
      life3.destroy();
    } else if (this.player.lifes === 1) {
      life2.destroy();
    } else if (this.player.lifes === 0) {
      life1.destroy();
    }

    if (!this.player.getData("isDead")) {
      this.player.update();
      if (this.keyW.isDown) {
        this.player.moveUp();
      } else if (this.keyS.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown) {
        this.player.moveLeft();
      } else if (this.keyD.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData("isShooting", true);
      } else {
        this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
        this.player.setData("isShooting", false);
      }
    }

    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }

    for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
      var laser = this.enemyLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
      var laser = this.playerLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }
};