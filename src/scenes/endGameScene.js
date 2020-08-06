import Phaser from 'phaser';
import Button from '../Objects/Button';
import ScrollingBackground from '../helpers/scrolling';

export default class EndGameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'EndGame',
    });
  }

  create() {
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.skipText = this.add.bitmapText(10, 10, 'arcade', 'Press SPACE\nto skip', 8);
    this.text = this.add.bitmapText(100, 100, 'arcade', 'CONGRATULATIONS!!!', 36);
    const score = window.localStorage.getItem('score');
    this.score = this.add.bitmapText(225, 150, 'arcade', `SCORE: ${score}`, 28);
    this.titleButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Score', 'InputName');

    this.image = this.add.image(550, 300, 'tintin');
    this.text2 = this.add.bitmapText(490, 220, 'arcade', 'Captain Tintin', 9);
    this.image2 = this.add.image(275, 300, 'princess');
    this.text3 = this.add.bitmapText(215, 220, 'arcade', 'Princess Dung', 9);

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const bg = new ScrollingBackground(this, 'starfield', i * 10);
      this.backgrounds.push(bg);
    }
  }

  update() {
    if (this.keySpace.isDown) {
      this.scene.start('InputName');
    }
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }
}
