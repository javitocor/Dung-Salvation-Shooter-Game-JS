import Phaser from 'phaser';
import { setScore } from '../leaderboard';

export default class InputNameScene extends Phaser.Scene {
  constructor() {
    super('InputName');
  }

  create() { 
    this.add.image(400, 300, 'bg2');   
    let score = window.localStorage.getItem('score');
    let text = this.add.text(300, 10, 'Please enter your name', {
      color: 'white',
      fontSize: '20px '
    });

    let element = this.add.dom(400, 0).createFromCache('nameform');

    element.addListener('click');

    element.on('click', function (event) {

      if (event.target.name === 'playButton') {
        let inputText = this.getChildByName('nameField');


        if (inputText.value !== '') {
          setScore(inputText.value, score).then(() => {
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