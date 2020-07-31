import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import InputNameScene from './Scenes/inputNameScene';
import IntroScene from './Scenes/introScene';
import LeaderboardScene from './Scenes/leaderboardScene';
import GameOverScene from './Scenes/GameOverScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import EndGameScene from './Scenes/endGameScene';
import DialogueScene from './Scenes/dialogueScene';
import Sound from './model/sound';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    const model = new Sound();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Intro', IntroScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('Leaderboard', LeaderboardScene);
    this.scene.add('InputName', InputNameScene);
    this.scene.add('EndGame', EndGameScene);
    this.scene.start('Boot');
    this.scene.add('DialogueIntro', new DialogueScene());
    this.scene.add('DialogueBoss', new DialogueScene());
    this.scene.add('DialogueFinal', new DialogueScene());    
  }
}

window.game = new Game();