import Phaser from 'phaser';
import createLabel from '../createLabel';

export default class Dialogue extends Phaser.Scene {
  constructor(scene, title, content, description) {
    super(scene)
    this.title = title;
    this.content = content;
    this.description = description;
  }

  create() {
    var dialog = this.rexUI.add.dialog({
        x: 400,
        y: 300,
        width: 500,
        background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0),
        title: createLabel(this, this.title).setDraggable(),
        content: createLabel(this, this.content), 
        description: createLabel(this, this.description),       
        actions: createLabel(this, 'Go!'),
        space: {
          left: 20,
          right: 20,
          top: -20,
          bottom: -20,
          title: 25,
          titleLeft: 30,
          content: 25,
          description: 25,
          descriptionLeft: 20,
          descriptionRight: 20,
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
      .on('button.click', function (button, groupName, index, pointer, event) {
        this.print.text += groupName + '-' + index + ': ' + button.text + '\n';
      }, this)
      .on('button.over', function (button, groupName, index, pointer, event) {
        button.getElement('background').setStrokeStyle(1, 0xffffff);
      })
      .on('button.out', function (button, groupName, index, pointer, event) {
        button.getElement('background').setStrokeStyle();
      });
  }

}