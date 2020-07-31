import ScrollingBackground from '../scrolling';
import Phaser from 'phaser';
import config from '../config/config';
import Button from '../Objects/Button';

export default class EndGameScene extends Phaser.Scene {
  constructor() {
    super({ key: "EndGame" });
  }

  preload(){
  }
  create() {
    this.cameras.main.setBackgroundColor('#000111');
    
     
  }
}