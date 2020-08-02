const getScore = (key) => {
  if (key === 'space') {
    score = 0;
  } else {
    score = parseInt(JSON.parse(window.localStorage.getItem('score')));
  }
}

export default getScore;