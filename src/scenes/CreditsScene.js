import Phaser from 'phaser';
import config from '../config/config';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000111');
    this.creditsText = this.add.bitmapText(0, 0, 'arcade', 'Credits', 32);
    this.madeByText1 = this.add.bitmapText(0, 0, 'arcade', 'Created By: Javier Correas', 26);
    this.madeByText2 = this.add.bitmapText(0, 0, 'arcade', "Thanks to Microverse", 26);
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.skipText = this.add.bitmapText(10, 10, 'arcade', 'Press SPACE\nto skip', 8);

    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.madeByText1,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.madeByText2,
      this.zone,
    );



    this.madeByText1.setY(850);
    this.madeByText2.setY(1100);


    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -200,
      duration: 3000,
      delay: 1000,
    });

    this.madeByTween1 = this.tweens.add({
      targets: this.madeByText1,
      y: -200,
      duration: 8000,
      delay: 1000,
    });

    this.madeByTween2 = this.tweens.add({
      targets: this.madeByText2,
      y: -200,
      duration: 12000,
      delay: 1000,
      onComplete: (() => {
        this.scene.start('Title');
      }),
    });
  }

  update() {
    if (this.keySpace.isDown) {
      this.scene.start('Title');
    }
  }
}