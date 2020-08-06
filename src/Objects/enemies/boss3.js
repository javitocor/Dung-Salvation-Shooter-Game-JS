import Phaser from 'phaser';
import Entity from '../Entities';
import EnemyMissile from '../../helpers/enemyMissile';

export default class Boss3 extends Entity {
  constructor(scene) {
    super(scene, 400, 80, 'boss3', 'Boss3');
    this.scene = scene;
    this.play('boss3');
    this.lifes = 25;

    this.body.collideWorldBounds = true;

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback() {
        this.body.velocity.x = Phaser.Math.Between(-200, 200);
        const missile = new EnemyMissile(
          this.scene,
          this.x + 10,
          this.y + 10,
          'missile3',
        );
        const missile2 = new EnemyMissile(
          this.scene,
          this.x + 20,
          this.y + 20,
          'missile3',
        );
        const missile3 = new EnemyMissile(
          this.scene,
          this.x - 10,
          this.y - 10,
          'missile3',
        );
        const missile4 = new EnemyMissile(
          this.scene,
          this.x - 20,
          this.y - 20,
          'missile3',
        );
        missile.setScale(this.scaleX);
        this.scene.enemyMissiles.add(missile);
        this.scene.sfx.missiles.play();
        missile2.setScale(this.scaleX);
        this.scene.enemyMissiles.add(missile2);
        this.scene.sfx.missiles.play();
        missile3.setScale(this.scaleX);
        this.scene.enemyMissiles.add(missile3);
        this.scene.sfx.missiles.play();
        missile4.setScale(this.scaleX);
        this.scene.enemyMissiles.add(missile4);
        this.scene.sfx.missiles.play();
      },
      callbackScope: this,
      loop: true,
    });
  }

  onDestroy() {
    const a = this.scene;

    function getScene() {
      return a;
    }
    this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        getScene().scene.start('DialogueFinal3');
      },
      callbackScope: this,
      loop: false,
    });
  }
}