import Phaser from 'phaser';
import Button from '../Objects/Button';
import ScrollingBackground from '../scrolling';

export default class EndGameScene extends Phaser.Scene {
  constructor() {
    super({ key: "EndGame" });
  }

  create() {
    this.background = this.add.image(400, 300, 'starfield').setDisplaySize(800, 600);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.skipText = this.add.bitmapText(10, 10,'arcade', 'Press SPACE\nto skip', 8);
    this.text = this.add.bitmapText(200, 100,'arcade', 'CONGRATULATIONS!!!', 36);
    this.titleButton = new Button(this, config.width/2, config.height/2 , 'blueButton1', 'blueButton2', 'Menu', 'Title');
    
    this.image = this.add.image(400, 525, '');
    this.image2 = this.add.image(200, 525, '');

    this.tweens.add({
        targets: image,
        y: 100,
        duration: 1000,
        ease: 'Power2',
        yoyo: true,
        delay: 500,
        repeat: 100
    });

    this.tweens.add({
        targets: image2,
        y: 100,
        duration: 1000,
        ease: 'Power2',
        yoyo: true,
        delay: 500,
        repeat: 100
    });
     
  }

  update() {
    if (this.keySpace.isDown) {
      this.scene.start('InputName');
    }
  }
}