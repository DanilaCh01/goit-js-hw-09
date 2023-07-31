const refs = {
  body: document.body,
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
};

refs.stopButton.disabled = true;
let id = null;

refs.startButton.addEventListener('click', onStartButtonClick);
refs.stopButton.addEventListener('click', onStopButtonClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const setStart = (boolean) => {
  refs.startButton.disabled = boolean;
  refs.stopButton.disabled = !boolean;
}

function onStartButtonClick() {
  setStart(true);
  id = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopButtonClick() {
  setStart(false);
  clearInterval(id);
}