const nouns = [];
const data = {
  score: 0,
  bestScore: 0,
  shuffleNouns: [],
  currentNoun: 0,
  answered: []
}

function getBestScore() {
  const bestScore = parseInt(localStorage.getItem('best-score')) || 0;
  data.bestScore = bestScore;
  return bestScore;
}

function setBestScore(score) {
  localStorage.setItem('best-score', score);
}

function setBestScoreDisplay() {
  document.getElementById('best_score').innerText = data.bestScore;
}

function setScoreDisplay() {
  document.getElementById('score').innerText = data.score;
}

function resetScore() {
  data.score = 0;
}

function getNouns() {
  return fetch('src/Sustantivos.tsv')
    .then(response => response.text())
    .then(raw => {
      const rawSplitted = raw.split('\n');
      rawSplitted.forEach( row => {
        const columns = row.split('\t');
        const noun = {
          'gender': columns[0],
          'singular': columns[1],
          'plural': columns[2],
          'translation': columns[3].split(','),
        }
        nouns.push(noun);
      });
    });
}

function shuffleNouns() {
  const shuffledNounsArray = nouns.sort(() => Math.random() - 0.5);
  data.shuffleNouns = shuffledNounsArray;
  // return shuffledNounsArray;
}

function answer(ans) {
  data.answered.push({...data.shuffleNouns[data.currentNoun], answer: ans});
  if (ans == data.shuffleNouns[data.currentNoun].gender) {
    data.score++;
    data.currentNoun++;
    setNoun();
  } else {
    if (data.score > data.bestScore) {
      setBestScore(data.score);
      getBestScore();
      alert('Nuevo Mejor Puntaje')
    } else {
    }
    setBestScoreDisplay();
    resetScore();
    resetGame();
    data.score = 0;
  }
  setScoreDisplay();
}

function setNoun() {
  const single = data.shuffleNouns[data.currentNoun].singular;
  const plural = data.shuffleNouns[data.currentNoun].plural;
  const gender = data.shuffleNouns[data.currentNoun].gender;
  console.log(gender)
  document.getElementById('word').innerText = (single == '-' ? plural : single)
}

function initGame() {
  document.getElementById('start_button').style.display = 'none';
  document.getElementById('buttons').style.display = 'flex';
  document.getElementById('summary').style.display = 'none';
  shuffleNouns();
  setNoun();
}

function resetGame() {
  document.getElementById('start_button').style.display = 'initial';
  document.getElementById('buttons').style.display = 'none';
  document.getElementById('summary').style.display = 'block';
  document.getElementById('correct_answer').innerText = data.shuffleNouns[data.currentNoun].gender;
  setNoun();
}

getNouns();
getBestScore();
setScoreDisplay();
setBestScoreDisplay();