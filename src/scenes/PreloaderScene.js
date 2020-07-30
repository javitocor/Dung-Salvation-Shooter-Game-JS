import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }

  init () {
    this.readyCount = 0;
  }

  preload () {
    this.add.image(400, 200, 'logo');

    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    this.load.bitmapFont('arcade', 'assets/arcade.png', 'assets/arcade.xml');

    this.load.image('logo', 'assets/logo.png');
    this.load.image('blueButton1', 'assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'assets/ui/blue_button03.png');
    this.load.image('box', 'assets/ui/grey_box.png');
    this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
    this.load.spritesheet('boss', 'assets/game/boss.PNG', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('carrier', 'assets/game/carrier.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('destroyer', 'assets/game/destroyer.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('fighter', 'assets/game/fighter.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image('playerShip', 'assets/game/playerShip.png');
    this.load.image('bg1', 'assets/game/Space-Background-2.jpg');
    this.load.image('bg2', 'assets/game/Space-Background-3.jpg');
    this.load.image('laserEnemy', 'assets/game/sprLaserEnemy0.png');
    this.load.image('laserPlayer', 'assets/game/sprLaserPlayer.png');
    this.load.spritesheet('explosion', 'assets/game/explosion.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.audio('bgMusic', 'assets/Daft Punk - Best of - 11 Aerodynamic.mp3');
    this.load.audio('explosion1', 'assets/game/sndExplode0.wav');
    this.load.audio('explosion2', 'assets/game/sndExplode1.wav');
    this.load.audio('laser', 'assets/game/sndLaser.wav');

    this.load.html('nameform', 'assets/text/nameform.html');
    
  }

  ready () {
    this.scene.start('Title');
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
};
