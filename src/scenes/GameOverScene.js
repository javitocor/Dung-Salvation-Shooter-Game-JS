import ScrollingBackground from '../scrolling';
import Phaser from 'phaser';
import config from '../config/config';
import Button from '../Objects/Button';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameOver" });
  }

  preload(){
  }
  create() {
    this.cameras.main.setBackgroundColor('#000111');
    this.add.image(400, 300, 'bg2');   
    this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.title.setOrigin(0.5);


    this.restartButton = new Button(this, config.width/2, config.height/2 - 100, 'blueButton1', 'blueButton2', 'Play Again', 'Game');
    this.titleButton = new Button(this, config.width/2, config.height/2 , 'blueButton1', 'blueButton2', 'Menu', 'Title');
     
  }
}