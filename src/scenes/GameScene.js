/* eslint-disable max-len */
import Phaser from 'phaser';
import Player from '../Objects/Player';
import Destroyer from '../Objects/enemies/destroyer';
import Fighter from '../Objects/enemies/fighter';
import CarrierShip from '../Objects/enemies/carrier';
import getEnemies from '../helpers/getEnemies';
import getBosses from '../helpers/getBosses';
import getScore from '../helpers/getScore';

let life1;
let life2;
let life3;
let score = 0;

export default class GameScene extends Phaser.Scene {
  constructor(scene, key, bossText, boss) {
    super(scene);
    this.key = key;
    this.bossText = bossText;
    this.boss = boss;
  }

  create() {
    this.add.image(400, 300, this.key).setDisplaySize(800, 600);
    life1 = this.add.image(750, 50, 'playerShip').setDisplaySize(50, 50);
    life2 = this.add.image(700, 50, 'playerShip').setDisplaySize(50, 50);
    life3 = this.add.image(650, 50, 'playerShip').setDisplaySize(50, 50);

    score = getScore(this.key);
    const scoreBoard = this.add.bitmapText(10, 10, 'arcade', `Score: ${score}`, 14).setTint(0x08B0F8);

    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 20,
      repeat: 0,
    });

    this.sfx = {
      explosions: [
        this.sound.add('explosion1', {
          volume: 0.7,
        }),
        this.sound.add('explosion2', {
          volume: 0.7,
        }),
      ],
      lasers: this.sound.add('lasers', {
        volume: 0.5,
      }),
      missiles: this.sound.add('missiles', {
        volume: 0.3,
      }),
    };

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'playerShip',
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
      callback() {
        const enemy = getEnemies(this, this.key);
        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 20000,
      callback() {
        this.scene.pause();
        this.scene.launch(this.bossText);
        const boss = getBosses(this, this.boss);
        boss.setScale(2.1);
        if (boss !== undefined) {
          this.enemies.add(boss);
        }
      },
      callbackScope: this,
    });

    this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
      if (enemy) {
        if (enemy.lifes !== undefined) {
          enemy.lifes -= 1;
          playerLaser.destroy();
          if (enemy.lifes === 0 && !enemy.getData('isDead')) {
            enemy.explode(true);
            playerLaser.destroy();
            enemy.onDestroy();
            score += 250;
            window.localStorage.setItem('score', JSON.stringify(score));
            scoreBoard.text = `Score: ${score}`;
          }
        }

        if (enemy.onDestroy !== undefined && enemy.lifes === undefined) {
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

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead') && !enemy.getData('isDead')) {
        enemy.explode(true);
        if (player.lifes > 0) {
          player.lifes -= 1;
        } else {
          player.explode(false);
          player.onDestroy();
        }
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead') && !laser.getData('isDead')) {
        player.lifes -= 1;
        laser.destroy();
        if (player.lifes === 0) {
          player.explode(false);
          player.onDestroy();
        }
      }
    });

    this.physics.add.overlap(this.player, this.enemyMissiles, (player, missile) => {
      if (!player.getData('isDead') && !missile.getData('isDead')) {
        player.lifes -= 1;
        missile.destroy();
        if (player.lifes === 0) {
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
        score += 10;
        playerLaser.explode(false);
        enemyMissile.destroy();
        window.localStorage.setItem('score', JSON.stringify(score));
        scoreBoard.text = `Score: ${score}`;
      }
    });
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
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

    if (!this.player.getData('isDead')) {
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
        this.player.setData('isShooting', true);
      } else {
        this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
        this.player.setData('isShooting', false);
      }
    }

    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (enemy.x < -enemy.displayWidth
        || enemy.x > this.game.config.width + enemy.displayWidth
        || enemy.y < -enemy.displayHeight * 4
        || enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }

    for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }
}