import Phaser from 'phaser';
import {
  setScore
} from '../leaderboard';

export default class InputNameScene extends Phaser.Scene {
  constructor() {
    super('InputName');
  }

  create() {
    this.add.image(400, 300, 'bg2').setDisplaySize(800, 600);
    let score = window.localStorage.getItem('score');
    let text = this.add.bitmapText(300, 10, 'arcade', 'Please enter your name', 18).setTint(0x08B0F8);

    let element = this.add.dom(400, 0).createFromCache('nameform');

    element.addListener('click');

    element.on('click', function (event) {

      if (event.target.name === 'submitButton') {
        let inputText = this.getChildByName('nameField');        
        const loading = this.add.bitmapText(250, 250, 'arcade', 'Loading...').setTint(0x08B0F8);

        if (inputText.value !== '') {
          setScore(inputText.value, score).then(() => {
            loading.destroy();
            element.scene.scene.start('GameOver');
          }).catch((e) => {
            console.log('Error:', e);
          });

        } else {
          this.scene.tweens.add({
            targets: text,
            alpha: 0.2,
            duration: 250,
            ease: 'Power3',
            yoyo: true
          });
        }
      }

    });

    this.tweens.add({
      targets: element,
      y: 300,
      duration: 3000,
      ease: 'Power3'
    });
  }
}