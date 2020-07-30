import 'phaser';
import Player from '../Objects/Player';
import ScrollingBackground from '../scrolling';
import Destroyer from '../Objects/enemies/destroyer';
import Fighter from '../Objects/enemies/fighter';
import CarrierShip from '../Objects/enemies/carrier';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.score = 0;
    this.scoreBoard = this.add.bitmapText(10, 10, 'arcade', `Score: ${this.score}`, 14).setTint(0x08B0F8);
    console.log(this.scoreBoard);
    this.anims.create({
      key: "explosion",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0
    });

    this.anims.create({
      key: "playerShip",
      frames: this.anims.generateFrameNumbers("playerShip"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "fighter",
      frames: this.anims.generateFrameNumbers("fighter"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "destroyer",
      frames: this.anims.generateFrameNumbers("destroyer"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "carrier",
      frames: this.anims.generateFrameNumbers("carrier"),
      frameRate: 20,
      repeat: -1
    });

    this.sfx = {
      explosions: [
        this.sound.add("explosion1"),
        this.sound.add("explosion2")
      ],
      laser: this.sound.add("laser")
    };

    this.backgrounds = [];
    for (var i = 0; i < 2; i++) {
      var bg = new ScrollingBackground(this, "bg1", i * 10);
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

    this.physics.add.collider(this.playerLasers, this.enemies, function (playerLaser, enemy) {
      if (enemy) {
        if (enemy instanceof Destroyer) {
          this.score += 100;
        } else if (enemy instanceof Fighter) {
          this.score += 75;
        } else if (enemy instanceof CarrierShip) {
          this.score += 125;
        }
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
          this.score += 25;
        }
        enemy.explode(true);
        playerLaser.destroy();
        this.scoreBoard = this.add.bitmapText(10, 10, 'arcade', `Score: ${this.score}`, 14).setTint(0x08B0F8);
      }
    });

    this.physics.add.overlap(this.player, this.enemies, function (player, enemy) {
      if (!player.getData("isDead") &&
        !enemy.getData("isDead")) {
        player.explode(false);
        player.onDestroy();
        enemy.explode(true);
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, function (player, laser) {
      if (!player.getData("isDead") &&
        !laser.getData("isDead")) {
        player.explode(false);
        player.onDestroy();
        laser.destroy();
      }
    });

    this.physics.add.collider(this.enemyLasers, this.playerLasers, (enemyLaser, playerLaser) => {
      if (playerLaser) {
        this.score += 5;
        this.scoreBoard = this.add.bitmapText(10, 10, 'arcade', `Score: ${this.score}`, 14).setTint(0x08B0F8);
        playerLaser.explode(false, 'sprExplosionLaser');
        enemyLaser.destroy();
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

    this.scoreBoard.text = `Score: ${this.score}`;

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