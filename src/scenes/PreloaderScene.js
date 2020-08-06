import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    this.add.image(400, 200, 'logo');

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      // eslint-disable-next-line radix
      percentText.setText(`${parseInt(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    this.load.bitmapFont('arcade', 'assets/arcade.png', 'assets/arcade.xml');

    this.load.image('logo2', 'assets/logo2.png');
    this.load.image('microverse', 'assets/microverse.png');
    this.load.image('opengameart', 'assets/opengameart.png');
    this.load.image('blueButton1', 'assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'assets/ui/blue_button03.png');
    this.load.image('box', 'assets/ui/grey_box.png');
    this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
    this.load.image('tintin', 'assets/commander.png');
    this.load.image('princess', 'assets/princess.png');
    this.load.image('boss', 'assets/game/boss.PNG');
    this.load.image('boss2', 'assets/game/boss2.png');
    this.load.image('boss3', 'assets/game/boss3.png');
    this.load.image('carrier', 'assets/game/carrier.png');
    this.load.image('destroyer', 'assets/game/destroyer.png');
    this.load.image('fighter', 'assets/game/fighter.png');
    this.load.image('playerShip', 'assets/game/playerShip.png');
    this.load.image('space', 'assets/game/Space-Background-2.jpg');
    this.load.image('planet', 'assets/game/Space-Background-4.jpg');
    this.load.image('field', 'assets/game/fractal-alien-city-2.png');
    this.load.image('bg2', 'assets/game/Space-Background-3.jpg');
    this.load.image('starfield', 'assets/game/starfield.png');
    this.load.image('laserEnemy', 'assets/game/sprLaserEnemy0.png');
    this.load.image('missile', 'assets/game/missile.png');
    this.load.image('missile2', 'assets/game/missile2.png');
    this.load.image('missile3', 'assets/game/missile3.png');
    this.load.image('laserPlayer', 'assets/game/sprLaserPlayer.png');
    this.load.spritesheet('explosion', 'assets/game/explosion.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.audio('bgMusic', 'assets/DaftPunk-Bestof-11Aerodynamic.mp3');
    this.load.audio('explosion1', 'assets/game/sndExplode0.wav');
    this.load.audio('explosion2', 'assets/game/sndExplode1.wav');
    this.load.audio('lasers', 'assets/game/sndLaser.wav');
    this.load.audio('missiles', 'assets/game/missile.ogg');

    this.load.html('nameform', 'assets/text/nameform.html');
  }

  ready() {
    this.scene.start('Title');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}