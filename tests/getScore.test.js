import getScore from '../src/helpers/getScore';

describe('Testing GetStore function', () => {
  it('Should return 0 if is the first stage', () => {
    expect(getScore('space')).toBe(0);
  });
  it('Should clear the localStorage when it is the first stage', () => {
    getScore('space');
    expect(window.localStorage).toMatchObject({});
  });
  it('Should return a number if is the second or third stage', () => {
    const score = getScore('non space');
    expect(typeof score).toBe('number');
  });
  it('Should return the value in the localStorage when is not the first stage', () => {
    window.localStorage.setItem('score', JSON.stringify(1250));
    expect(getScore('non space')).toEqual(1250);
  });
});