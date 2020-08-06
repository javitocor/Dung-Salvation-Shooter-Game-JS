import Entity from '../Objects/Entities';

export default class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'laserEnemy');
    this.body.velocity.y = 200;
  }
}