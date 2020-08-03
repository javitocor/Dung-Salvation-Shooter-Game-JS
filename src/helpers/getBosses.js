import Boss from '../Objects/enemies/boss';
import Boss2 from '../Objects/enemies/boss2';
import Boss3 from '../Objects/enemies/boss3';

const getBosses = (scene, key) => {
  let boss;
  if (key === 'boss1') {
    boss = new Boss(scene);
  } else if (key === 'boss2') {
    boss = new Boss2(scene);
  } else {
    boss = new Boss3(scene);
  }
  return boss;
};

export default getBosses;