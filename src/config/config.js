import Phaser from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-container',
  width: 800,
  height: 600,
  backgroundColor: 'black',
  autoCenter: Phaser.Scale.CENTER_BOTH,
  dom: {
    createContainer: true,
  },
  plugins: {
    scene: [{
      key: 'rexUI',
      plugin: RexUIPlugin,
      mapping: 'rexUI',
    }],
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        x: 0,
        y: 0,
      },
    },
  },
  scene: [],
  pixelArt: true,
  roundPixels: true,
};