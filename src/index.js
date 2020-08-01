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
import dialogue from './helpers/dialogues';

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
    this.scene.add('Mission1', new GameScene('Mission1', 'space', 'DialogueBoss1', new Boss('Mission1')));
    this.scene.add('Mission2', new GameScene('Mission2', 'planet', 'DialogueBoss2', new Boss2('Mission2') ));
    this.scene.add('Mission2', new GameScene('Mission3', 'field', 'DialogueBoss3', new Boss3('Mission3') ));
    this.scene.add('DialogueIntro1', new DialogueScene('DialogueIntro1', dialogue.mission1.intro.title, dialogue.mission1.intro.content, dialogue.mission1.intro.description, 'Mission1'));
    this.scene.add('DialogueBoss1', new DialogueScene('DialogueBoss1', dialogue.mission1.boss.title, dialogue.mission1.boss.content, dialogue.mission1.boss.description, 'Mission1', true));
    this.scene.add('DialogueFinal1', new DialogueScene('DialogueFinal1', dialogue.mission1.end.title, dialogue.mission1.end.content, dialogue.mission1.end.description, 'DialogueIntro2'));
    this.scene.add('DialogueIntro2', new DialogueScene('DialogueIntro2', dialogue.mission2.intro.title, dialogue.mission2.intro.content, dialogue.mission2.intro.description, 'Mission2'));
    this.scene.add('DialogueBoss2', new DialogueScene('DialogueBoss2', dialogue.mission2.boss.title, dialogue.mission2.boss.content, dialogue.mission2.boss.description, 'Mission2', true));
    this.scene.add('DialogueFinal2', new DialogueScene('DialogueFinal2', dialogue.mission2.end.title, dialogue.mission2.end.content, dialogue.mission2.end.description, 'DialogueIntro3')); 
    this.scene.add('DialogueIntro3', new DialogueScene('DialogueIntro3', dialogue.mission3.intro.title, dialogue.mission3.intro.content, dialogue.mission3.intro.description, 'Mission3'));
    this.scene.add('DialogueBoss3', new DialogueScene('DialogueBoss3', dialogue.mission3.boss.title, dialogue.mission3.boss.content, dialogue.mission3.boss.description, 'Mission3', true));
    this.scene.add('DialogueFinal3', new DialogueScene('DialogueFinal3', dialogue.mission3.end.title, dialogue.mission3.end.content, dialogue.mission3.end.description, 'EndGame'));   
  }
}

window.game = new Game();