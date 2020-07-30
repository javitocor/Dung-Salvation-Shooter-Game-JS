import ScrollingBackground from '../scrolling';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "GameOver" });
  }

  preload(){
    this.load.image('blueButton1', 'assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'assets/ui/blue_button03.png');
  }
  create() {

    this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.title.setOrigin(0.5);


    this.restartButton = new Button(this, config.width/2, config.height/2 - 100, 'blueButton1', 'blueButton2', 'Play Again', 'Game');
    this.titleButton = new Button(this, config.width/2, config.height/2 , 'blueButton1', 'blueButton2', 'Menu', 'Title');
    

    this.backgrounds = [];
    for (var i = 0; i < 5; i++) {
      var keys = ["bg1", "bg2"];
      var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }

  update() {
    for (var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }
}