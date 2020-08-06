import Phaser from 'phaser';
import EnemyLaser from '../../helpers/enemyLaser';
import Entity from '../Entities';

export default class Destroyer extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'destroyer', 'Destroyer');
    this.play('destroyer');

    this.body.velocity.y = Phaser.Math.Between(50, 100);

    this.shootTimer = this.scene.time.addEvent({
      delay: 1200,
      callback() {
        const laser = new EnemyLaser(
          this.scene,
          this.x - 2,
          this.y - 2,
        );
        const laser2 = new EnemyLaser(
          this.scene,
          this.x + 2,
          this.y + 2,
        );
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
        laser2.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser2);
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