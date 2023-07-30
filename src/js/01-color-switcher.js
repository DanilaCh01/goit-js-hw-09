
const body = document.body;
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

stopButton.disabled = true;
let id = null;
startButton.addEventListener('click', onStartButtonClick);
stopButton.addEventListener('click', onStopButtonClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function onStartButtonClick() {
  startButton.disabled = true;
  stopButton.disabled = false;
  id = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopButtonClick() {
  startButton.disabled = false;
  stopButton.disabled = true;

  clearInterval(id);
}
