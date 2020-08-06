import Phaser from 'phaser';
import config from '../config/config';
import Button from '../Objects/Button';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameOver',
    });
  }

  create() {
    this.cameras.main.setBackgroundColor('#000111');
    this.add.image(400, 300, 'bg2').setDisplaySize(800, 600);
    this.title = this.add.bitmapText(this.game.config.width * 0.5, 128, 'arcade', 'GAME OVER', 48);
    this.title.setOrigin(0.5);

    this.restartButton = new Button(this, config.width / 2, config.height / 2 - 100, 'blueButton1', 'blueButton2', 'Play', 'Mission1');
    this.titleButton = new Button(this, config.width / 2, config.height / 2, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
}