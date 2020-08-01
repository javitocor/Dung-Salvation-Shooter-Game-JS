import Phaser from 'phaser';
import Button from '../Objects/Button';
import config from '../config/config';
import ScrollingBackground from '../scrolling';

export default class EndGameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "EndGame"
    });
  }

  create() {
    this.background = this.add.image(400, 300, 'starfield').setDisplaySize(800, 600);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.skipText = this.add.bitmapText(10, 10, 'arcade', 'Press SPACE\nto skip', 8);
    this.text = this.add.bitmapText(100, 100, 'arcade', 'CONGRATULATIONS!!!', 36);
    this.titleButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Score', 'InputName');

    this.image = this.add.image(450, 525, 'tintin');
    this.image2 = this.add.image(250, 525, 'princess');

    /*this.tweens.add({
        targets: this.image,
        y: 50,
        duration: 3000,
        ease: 'Power2',
        yoyo: true,
        delay: 500,
        repeat: 100
    });

    this.tweens.add({
        targets: this.image2,
        y: 50,
        duration: 3000,
        ease: 'Power2',
        yoyo: true,
        delay: 500,
        repeat: 100
    });*/

  }

  update() {
    if (this.keySpace.isDown) {
      this.scene.start('InputName');
    }
  }
}