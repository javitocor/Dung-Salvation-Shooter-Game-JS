const getScore = (key) => {
  let score = 0;
  if (key === 'space') {
    score = 0;
  } else {
    score = parseInt(JSON.parse(window.localStorage.getItem('score')));
  }
  return score;
}

export default getScore;