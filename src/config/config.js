import 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-container',
  width: 800,
  height: 600,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
};
