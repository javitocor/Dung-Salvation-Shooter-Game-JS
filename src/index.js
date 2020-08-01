import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import InputNameScene from './Scenes/inputNameScene';
import IntroScene from './Scenes/introScene';
import LeaderboardScene from './Scenes/leaderboardScene';
import GameOverScene from './Scenes/GameOverScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';
import OptionsScene from './scenes/OptionsScene';
import CreditsScene from './scenes/CreditsScene';
import EndGameScene from './scenes/endGameScene';
import DialogueScene from './scenes/dialogueScene';
import Sound from './model/sound';
import Boss from './Objects/enemies/boss';
import Boss2 from './Objects/enemies/boss2';
import Boss3 from './Objects/enemies/boss3';

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
    this.scene.add('Intro', IntroScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('Leaderboard', LeaderboardScene);
    this.scene.add('InputName', InputNameScene);
    this.scene.add('EndGame', EndGameScene);
    this.scene.start('Boot');    
    this.scene.add('Mission1', new GameScene('Mission1', 'space', '', '', new Boss('Mission1')));
    this.scene.add('Mission2', new GameScene('Mission2', 'planet', '', '', new Boss2('Mission2') ));
    this.scene.add('Mission2', new GameScene('Mission3', 'field', '', '', new Boss3('Mission3') ));
    this.scene.add('DialogueIntro', new DialogueScene('DialogueIntro', 'Mission 1', 'Space Battle', 'Captain Tintin is heading to Magrathea,\nwhere the Rebels base is.\nBut it is well protected, the fight begins...', 'Mission1'));
    this.scene.add('DialogueBoss', new DialogueScene('DialogueBoss', 'Final Boss', 'Defeat the Rebels Boss', 'Defeat the boss to save the Princess Dung!', 'Game', true));
    this.scene.add('DialogueFinal', new DialogueScene('DialogueFinal', 'Rescue', 'You saved the Galaxy!', 'Success! You have rescued\nthe Princess Dung and\nsaved the Galaxy\nCongratulations!!!', 'EndGame'));    
  }
}

window.game = new Game();