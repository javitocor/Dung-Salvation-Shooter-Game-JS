const createLabel = function createLabel(scene, text) {
  return scene.rexUI.add.label({
    width: 40,
    height: 40,

    background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x5e92f3),

    text: scene.add.text(0, 0, text, {
      fontSize: '24px',
    }),

    space: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    },
  });
};

export default createLabel;