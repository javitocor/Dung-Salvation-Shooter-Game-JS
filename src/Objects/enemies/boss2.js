import Phaser from 'phaser';
import Entity from '../Entities';
import EnemyMissile from '../../helpers/enemyMissile';

export default class Boss2 extends Entity {
  constructor(scene) {
    super(scene, 400, 80, 'boss2', 'Boss2');
    this.scene = scene;
    this.play('boss2');
    this.lifes = 20;

    this.body.collideWorldBounds = true;

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback() {
        this.body.velocity.x = Phaser.Math.Between(-200, 200);
        const missile = new EnemyMissile(
          this.scene,
          this.x,
          this.y,
          'missile2',
        );
        const missile2 = new EnemyMissile(
          this.scene,
          this.x + 25,
          this.y + 25,
          'missile2',
        );
        const missile3 = new EnemyMissile(
          this.scene,
          this.x - 25,
          this.y - 25,
          'missile2',
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
        getScene().scene.start('DialogueFinal2');
      },
      callbackScope: this,
      loop: false,
    });
  }
}