import {
  getScore,
  setScore,
} from '../src/helpers/leaderboard';

jest.mock('../src/helpers/leaderboard');

describe('Testing the API functionality', () => {
  it('returns the third user name', async () => {
    getScore.mockResolvedValue({
      result: [{
        user: 'John Doe',
        score: 42,
      },
      {
        user: 'Peter Parker',
        score: 35,
      },
      {
        user: 'Wonder Woman',
        score: 50,
      },
      ],
    });
    const user = await getScore();
    expect(user.result[2].user).toMatch('Wonder Woman');
  });

  it('returns the score of the second user', async () => {
    getScore.mockResolvedValue({
      result: [{
        user: 'John Doe',
        score: 42,
      },
      {
        user: 'Peter Parker',
        score: 35,
      },
      {
        user: 'Wonder Woman',
        score: 50,
      },
      ],
    });

    const user = await getScore();
    expect(user.result[1].score).toEqual(35);
  });

  it('Should save the score into the API', async () => {
    setScore.mockResolvedValue({
      result: 'Leaderboard score created correctly.',
    });
    const success = await setScore('Dung', 50000);
    expect(success.result).toMatch('Leaderboard score created correctly.');
  });
});