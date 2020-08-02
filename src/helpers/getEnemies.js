import Destroyer from '../Objects/enemies/destroyer';
import Fighter from '../Objects/enemies/fighter';
import CarrierShip from '../Objects/enemies/carrier';

const getEnemies = (scene) =>{
  console.log(scene);
  let enemy;
  if (Phaser.Math.Between(0, 10) >= 3) {
    enemy = new Destroyer(
      scene,
      Phaser.Math.Between(0, scene.game.config.width),
      0
    );
  } else if (Phaser.Math.Between(0, 10) >= 5) {
    if (scene.getEnemiesByType("fighter").length < 5) {

      enemy = new Fighter(
        scene,
        Phaser.Math.Between(0, scene.game.config.width),
        0
      );
    }
  } else {
    enemy = new CarrierShip(
      scene,
      Phaser.Math.Between(0, scene.game.config.width),
      0
    );
  }
  return enemy;
}

export default getEnemies;