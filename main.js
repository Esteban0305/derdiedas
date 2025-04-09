const nouns = [];
const data = {
  score: 0,
  bestScore: 0,
  shuffleNouns: [],
  currentNoun: 0,
  answered: [],
  phrase: 0
}

const phrases = [
  "¡Der Hammer! (¡Increíble!)",
  "Imparable",
  "¡Eres un genio!",
  "¡Lo tuyo es el der, die, das!",
  "¡No hay duda, eres una experta!",
  "¡Estás en racha!",
  "¡Eres un maestro del alemán!",
  "¡Nivel: Alemán ninja!",
  "¡Cada vez más cerca de la perfección!",
  "¡Qué memoria tienes!",
  "¡No hay quien te detenga!",
  "¡Estás arrasando con los artículos!",
  "¡Eres el terror de los errores!",
  "Der, die, das... ¡todos caen ante ti!",
  "¡Boom! Otro punto para ti.",
  "¡No hay quien te pare!",
  "¡Cada punto te hace más fuerte!",
  "¡Increíble! Ni Google te alcanza.",
  "¡Das war perfekt!",
  "¡Bam! Otro acierto más.",
  "¡Eres una máquina de aprender!",
  "¡El diccionario debería tener tu nombre!",
  "¡Una mente poderosa en acción!",
  "¡Cuidado, que se viene una mente bilingüe!",
  "¡Los artículos tiemblan cuando te ven!",
  "¡Pura elegancia lingüística!",
  "¡No hay “derrota” cuando tú juegas!",
  "¡Eres la reina de los artículos!",
  "¡Ese “der” estuvo de diez!",
  "¡Estás en modo alemán pro!",
  "¡Tu memoria debería estar en un museo!",
  "¡Un genio entre artículos!",
  "¡Estás conquistando el idioma palabra por palabra!",
  "¡Un punto más, un paso más!",
  "¡Cada acierto, un aplauso mental!",
  "¡Der, die, das... ¡y tú en la cima!",
  "¡Este idioma no sabe con quién se metió!",
  "¡Ya casi puedes soñar en alemán!"
]

function getBestScore() {
  const bestScore = parseInt(localStorage.getItem('best-score')) || 0;
  const phrase = parseInt(localStorage.getItem('phrase')) || 0;
  data.bestScore = bestScore;
  data.phrase = phrase;
  return bestScore;
}

function setBestScore(score) {
  localStorage.setItem('best-score', score);
  data.phrase++;
  localStorage.setItem('phrase', data.phrase);
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
  document.getElementById('new_score').style.display = 'none';
  if (ans == data.shuffleNouns[data.currentNoun].gender) {
    data.score++;
    data.currentNoun++;
    setNoun();
  } else {
    document.getElementById('new_best_score').innerText = data.score;
    if (data.score > data.bestScore) {
      setBestScore(data.score);
      getBestScore();
      document.getElementById('phrase').innerText = phrases[data.phrase];
      document.getElementById('new_score').style.display = 'initial';
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