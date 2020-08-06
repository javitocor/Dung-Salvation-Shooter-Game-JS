import Phaser from 'phaser';
import Button from '../Objects/Button';
import {
  getScore,
} from '../helpers/leaderboard';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000111');
    const loading = this.add.bitmapText(250, 250, 'arcade', 'Loading...').setTint(0x08B0F8);
    this.menuButton = new Button(this, 400, 550, 'blueButton1', 'blueButton2', 'Menu', 'Title');
    getScore().then((scores) => {
      loading.destroy();
      scores.sort((a, b) => b.score - a.score);
      this.add.bitmapText(100, 20, 'arcade', 'RANK  SCORE   NAME').setTint(0x08B0F8);
      for (let i = 0; i < 5; i += 1) {
        this.add.bitmapText(100, 90 * (i + 1), 'arcade', ` ${i + 1}     ${scores[i].score}   ${scores[i].user}`).setTint(0x08B0F8);
      }
    }).catch(() => {

    });
  }
}