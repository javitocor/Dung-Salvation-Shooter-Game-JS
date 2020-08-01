import Phaser from 'phaser';
import Entity from '../Entities';
import EnemyMissile from '../../helpers/enemyMissile';

export default class Boss3 extends Entity {
  constructor(scene) {
    super(scene, 400, 80, "boss3", "Boss3");
    this.scene = scene;
    this.play("boss3");
    this.lifes = 15;
    
    this.body.collideWorldBounds = true;
    
    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: function() {
        this.body.velocity.x = Phaser.Math.Between(-200, 200);
        let missile = new EnemyMissile(
          this.scene,
          this.x + 10,
          this.y + 10,
          'missile3'
        );
        let missile2 = new EnemyMissile(
          this.scene,
          this.x + 20,
          this.y + 20,
          'missile3'
        );
        let missile3 = new EnemyMissile(
          this.scene,
          this.x - 10,
          this.y - 10,
          'missile3'
        );
        let missile4 = new EnemyMissile(
          this.scene,
          this.x - 20,
          this.y - 20,
          'missile3'
        );
        missile.setScale(this.scaleX);
        this.scene.enemyMissiles.add(missile);
        this.scene.sfx.missile.play(); 
        missile2.setScale(this.scaleX);
        this.scene.enemyMissiles.add(missile2);
        this.scene.sfx.missile.play();
        missile3.setScale(this.scaleX);
        this.scene.enemyMissiles.add(missile3);
        missile4.setScale(this.scaleX);
        this.scene.enemyMissiles.add(missile4);
        this.scene.sfx.missile.play();
      },
      callbackScope: this,
      loop: true
    });
  }
  
  onDestroy() {
    console.log(this.scene);
    const getScene = () => { return this.scene.start('DialogueFinal3');}
    this.scene.time.addEvent({ 
        delay: 1000,
        callback: () => {   
          getScene();
        },
        callbackScope: this,
        loop: false
    });
}
}