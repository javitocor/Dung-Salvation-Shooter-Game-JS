import Phaser from 'phaser';
import {
  setScore,
} from '../helpers/leaderboard';

export default class InputNameScene extends Phaser.Scene {
  constructor() {
    super('InputName');
  }

  create() {
    this.add.image(400, 300, 'bg2').setDisplaySize(800, 600);
    const score = window.localStorage.getItem('score');
    const text = this.add.bitmapText(200, 10, 'arcade', 'Please enter your name', 18).setTint(0xFFFFFF);

    const element = this.add.dom(350, 0).createFromCache('nameform');

    element.addListener('click');

    element.on('click', function a(event) {
      if (event.target.name === 'submitButton') {
        const inputText = this.getChildByName('nameField');

        if (inputText.value !== '') {
          setScore(inputText.value, score).then(() => {
            element.scene.scene.start('GameOver');
          }).catch(() => {

          });
        } else {
          this.scene.tweens.add({
            targets: text,
            alpha: 0.2,
            duration: 250,
            ease: 'Power3',
            yoyo: true,
          });
        }
      }
    });

    this.tweens.add({
      targets: element,
      y: 300,
      duration: 3000,
      ease: 'Power3',
    });
  }
}