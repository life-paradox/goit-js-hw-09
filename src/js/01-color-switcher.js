function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let colorTimer = null;

stopBtn.setAttribute('disabled', 'disabled');

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);
function colorChanger() {
  body.style.backgroundColor = getRandomHexColor();
}

function onStartClick() {
  colorTimer = setInterval(colorChanger, 1000);
  startBtn.setAttribute('disabled', 'disabled');
  stopBtn.removeAttribute('disabled', 'disabled');
}

function onStopClick() {
  clearInterval(colorTimer);
  startBtn.removeAttribute('disabled', 'disabled');
  stopBtn.setAttribute('disabled', 'disabled');
}
