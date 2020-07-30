export default class IntroScene extends Phaser.Scene {
  constructor () {
    super('Intro');
  }

  create () {
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.skipText = this.add.text(10, 10, 'Press SPACE\nto skip', { fontSize: '10px', fill: '#fff' });
    this.titleText = this.add.text(0, 0, 'Dung Salvation', { fontSize: '32px', fill: '#fff' });    
    this.introText = this.add.text(0, 0, 'Created By: Javier Correas', { fontSize: '26px', fill: '#fff' });

    this.introText.setY(850);

    Phaser.Display.Align.In.Center(
      this.titleText,
      this.zone,
    );

    this.introTween = this.tweens.add({
      targets: this.introText,
      y: -200,
      duration: 3000,
      delay: 1000,
      onComplete: (() => {
        this.scene.start('Game');
      }),
    });

    this.introTween1 = this.tweens.add({
      targets: this.introText,
      y: -200,
      duration: 8000,
      delay: 1000,
    });
  }

  update() {
    if (this.keySpace.isDown) {
      this.scene.start('Game');
    }
  }
};