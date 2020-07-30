import Entity from '../Entities';

export default class CarrierShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "carrier", "CarrierShip");
    this.play("carrier");

    this.body.velocity.y = Phaser.Math.Between(50, 100);
  }
}