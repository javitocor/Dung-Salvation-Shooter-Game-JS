import Phaser from 'phaser';
import Entity from '../Entities';
import EnemyMissile from '../../helpers/enemyMissile';

export default class Boss extends Entity {
  constructor(scene) {
    super(scene, 400, 80, "boss", "Boss");
    this.scene = scene;
    this.play("boss");
    this.lifes = 15;
    
    this.body.collideWorldBounds = true;
    
    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: function() {
        this.body.velocity.x = Phaser.Math.Between(-200, 200);
        var missile = new EnemyMissile(
          this.scene,
          this.x,
          this.y
        );
        var missile2 = new EnemyMissile(
          this.scene,
          this.x + 25,
          this.y + 25
        );
        var missile3 = new EnemyMissile(
          this.scene,
          this.x - 25,
          this.y - 25
        );
        missile.setScale(this.scaleX);
        this.scene.enemyMissiles.add(missile);
        missile2.setScale(this.scaleX);
        this.scene.enemyMissiles.add(missile2);
        missile3.setScale(this.scaleX);
        this.scene.enemyMissiles.add(missile3);
      },
      callbackScope: this,
      loop: true
    });
  }
  
  onDestroy() {
    console.log(this.scene);
    this.scene.time.addEvent({ 
        delay: 1000,
        callback: () => {   
          console.log(this.scene);   
          this.scene.start('EndGame');
        },
        callbackScope: this,
        loop: false
    });
}
}