import Phaser from 'phaser';
import Entity from '../Entities';
import EnemyLaser from '../../helpers/enemyLaser';

export default class CarrierShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'carrier', 'CarrierShip');
    this.play('carrier');

    this.body.velocity.y = Phaser.Math.Between(50, 250);

    this.shootTimer = this.scene.time.addEvent({
      delay: 1500,
      callback() {
        const laser = new EnemyLaser(
          this.scene,
          this.x,
          this.y,
        );
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true,
    });
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}