import Phaser from 'phaser';
import createLabel from '../createLabel';

export default class DialogueScene extends Phaser.Scene {
  constructor(scene, title, content, description, nextScene, boss = false) {
    super(scene)
    this.title = title;
    this.content = content;
    this.description = description;
    this.nextScene = nextScene;
    this.boss = boss;
  }

  create() {
    this.add.image(400, 300, 'bg2').setDisplaySize(800, 600);
    var dialog = this.rexUI.add.dialog({
        x: 400,
        y: 300,
        width: 500,
        background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x08B0F8),
        title: createLabel(this, this.title).setDraggable(),
        content: createLabel(this, this.content), 
        description: createLabel(this, this.description),       
        actions: [createLabel(this, 'Go!')],
        space: {
          left: 20,
          right: 20,
          top: -20,
          bottom: -20,
          title: 25,
          content: 25,
          description: 25,
          choices: 25,
          toolbarItem: 5,
          choice: 15,
          action: 15,
        },

        expand: {
          title: false,
        },

        align: {
          title: 'center',
          actions: 'right', 
        },

        click: {
          mode: 'release'
        }
      })
      .setDraggable('background') 
      .layout()      
      .popUp(1000);

    const tween = this.tweens.add({
      targets: dialog,
      scaleX: 1,
      scaleY: 1,
      ease: 'Bounce', 
      duration: 1000,
      repeat: 0, 
      yoyo: false
    });

    this.print = this.add.text(0, 0, '');
    dialog
      .on('button.click', () => {
        if(this.boss){
          this.scene.stop();
          this.scene.resume(this.nextScene);
        }
        this.scene.start(this.nextScene);
      })
      .on('button.over', ()=> {
        button.getElement('background').setStrokeStyle(1, 0xffffff);
      })
      .on('button.out', ()=> {
        button.getElement('background').setStrokeStyle();
      });
  }

}