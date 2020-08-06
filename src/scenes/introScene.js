import Phaser from 'phaser';
import config from '../config/config';

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super('Intro');
  }

  create() {
    this.cameras.main.setBackgroundColor('#000111');
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.skipText = this.add.bitmapText(10, 10, 'arcade', 'Press SPACE\nto skip', 10);
    this.titleText = this.add.bitmapText(0, 0, 'arcade', 'Dung Salvation', 32);
    this.introText = this.add.bitmapText(0, 0, 'arcade', 'It is a period of civil war.\nThe evil Rebel spaceships, striking\nfrom a hidden base,have won their\nfirst victory against the Galactic\nDemocratic System. During the\nbattle, Rebel spies managed to\nhijack a galactic shuttle with\nPrincess Dung on board.\nPrincess Dung custodian important\ninformation that might end with the\nwar and restore the peace and\nfreedom to the galaxy.\nThe Galactic Democratic\nGovernement has send a secret\nmission lead by the best pilot\nin the galaxy, Captain Tintin,\nto rescue the Princess and\nbring her back so the war will\nend.', 22);
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
      duration: 16000,
      delay: 1000,
      onComplete: (() => {
        this.scene.start('DialogueIntro1');
      }),
    });
  }

  update() {
    if (this.keySpace.isDown) {
      this.scene.start('DialogueIntro1');
    }
  }
}