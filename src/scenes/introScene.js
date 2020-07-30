import Phaser from 'phaser';
import config from '../config/config';

export default class IntroScene extends Phaser.Scene {
  constructor () {
    super('Intro');
  }

  create () {
    this.cameras.main.setBackgroundColor('#000111');
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.skipText = this.add.bitmapText(10, 10, 'arcade','Press SPACE\nto skip', 10);
    this.titleText = this.add.bitmapText(0, 0, 'arcade', 'Dung Salvation', 32);    
    this.introText = this.add.bitmapText(0, 0, 'arcade', 'It is a period of civil war.\nThe evil Rebel spaceships, striking from a hidden base,\n have won their first victory against the Galactic Democratic System.\n During the battle, Rebel spies managed\n to hijack a galactic shuttle with Princess Dung on board.\n Princess Dung custodian important information that might end\n with the war and restore the peace and freedom to the galaxy.\n The Galactic Democratic Governement has send a secret mission lead by the best pilot in the galaxy,\n Captain Tintin, to rescue the Princess and bring her back so the war will end.', 26);
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);
    this.introText.setY(850);

    Phaser.Display.Align.In.Center(
      this.titleText,
      this.zone,
    );

    this.introTween = this.tweens.add({
      targets: this.titleText,
      y: -200,
      duration: 3000,
      delay: 1000,
    });

    this.introTween1 = this.tweens.add({
      targets: this.introText,
      y: -200,
      duration: 8000,
      delay: 1000,
      onComplete: (() => {
        this.scene.start('Game');
      }),
    });
  }

  update() {
    if (this.keySpace.isDown) {
      this.scene.start('Game');
    }
  }
};