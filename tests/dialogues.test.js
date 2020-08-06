import dialogue from '../src/helpers/dialogues';

describe('Testing dialogues', () => {
  it('should return the content of the intro of the first missio', () => {
    expect(dialogue.mission1.intro.content).toMatch('Space Battle');
  });
  it('should returnt the title of the boss of the mission 2', () => {
    expect(dialogue.mission2.boss.title).toMatch('Boss 2');
  });
  it('should return the description of the end of the mission 3', () => {
    expect(dialogue.mission3.end.description).toMatch('Congratulations!\nCpt.Tintin has defeated the Rebels\nand saved the princess and the entire galaxy');
  });
});