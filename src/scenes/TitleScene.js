import Phaser from 'phaser';
import config from '../config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.add.image(400, 300, 'bg2').setDisplaySize(800, 600);
    this.add.image(this.game.config.width * 0.5, 100, 'logo2');
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 100, 'blueButton1', 'blueButton2', 'Play', 'Intro');
    this.optionsButton = new Button(this, config.width / 2, config.height / 2, 'blueButton1', 'blueButton2', 'Options', 'Options');
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 100, 'blueButton1', 'blueButton2', 'Credits', 'Credits');
    this.leaderBoardButton = new Button(this, config.width / 2, config.height / 2 + 200, 'blueButton1', 'blueButton2', 'Leaders', 'Leaderboard');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', {
        volume: 0.5,
        loop: true,
      });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}