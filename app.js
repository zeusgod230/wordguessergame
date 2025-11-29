const inputs = document.querySelector(".inputs"),
  hintTag = document.querySelector(".hint span"),
  guessLeft = document.querySelector(".guess-left span"),
  wrongLetter = document.querySelector(".wrong-letter span"),
  resetBtn = document.querySelector(".reset-btn"),
  typingInput = document.querySelector(".typing-input");

let word, maxGuesses;
let incorrectLetters = [];
let correctLetters = [];

function loadNewWord() {
  const randomObj = wordList[Math.floor(Math.random() * wordList.length)];
  word = randomObj.word.toLowerCase();
  maxGuesses = word.length >= 5 ? 8 : 6;

  incorrectLetters = [];
  correctLetters = [];

  hintTag.textContent = randomObj.hint;
  guessLeft.textContent = maxGuesses;
  wrongLetter.textContent = "";

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
  }
  inputs.innerHTML = html;
}

loadNewWord();

function handleInput(e) {
  const key = e.target.value.toLowerCase();
  e.target.value = "";

  if (!key.match(/^[a-z]$/)) return;

  if (incorrectLetters.includes(key) || correctLetters.includes(key)) return;

  if (word.includes(key)) {
    [...word].forEach((char, index) => {
      if (char === key) {
        correctLetters.push(key);
        inputs.querySelectorAll("input")[index].value = key.toUpperCase();
      }
    });
  } else {
    incorrectLetters.push(key);
    wrongLetter.textContent = incorrectLetters.join(", ");
    maxGuesses--;
  }

  guessLeft.textContent = maxGuesses;

  setTimeout(() => {
    if (correctLetters.length === word.length) {
      alert(`Correct! The word was: ${word.toUpperCase()}`);
      loadNewWord();
    } else if (maxGuesses < 1) {
      alert(`Game Over! The word was: ${word.toUpperCase()}`);
      [...word].forEach((char, index) => {
        inputs.querySelectorAll("input")[index].value = char.toUpperCase();
      });
    }
  }, 100);
}

resetBtn.addEventListener("click", loadNewWord);
typingInput.addEventListener("input", handleInput);

inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
