import Phaser from 'phaser';
import Entity from '../Entities';
import EnemyMissile from '../../helpers/enemyMissile';

export default class Boss extends Entity {
  constructor(scene) {
    super(scene, 400, 80, 'boss', 'Boss');
    this.scene = scene;
    this.play('boss');
    this.lifes = 15;

    this.body.collideWorldBounds = true;

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback() {
        this.body.velocity.x = Phaser.Math.Between(-200, 200);
        const missile = new EnemyMissile(
          this.scene,
          this.x,
          this.y,
          'missile',
        );
        const missile2 = new EnemyMissile(
          this.scene,
          this.x + 25,
          this.y + 25,
          'missile',
        );
        const missile3 = new EnemyMissile(
          this.scene,
          this.x - 25,
          this.y - 25,
          'missile',
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
        getScene().scene.start('DialogueFinal1');
      },
      callbackScope: this,
      loop: false,
    });
  }
}