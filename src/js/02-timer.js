import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const resetButton = document.querySelector('[data-reset]');
const formDays = document.querySelector('[data-days]');
const formHours = document.querySelector('[data-hours]');
const formMinutes = document.querySelector('[data-minutes]');
const formSeconds = document.querySelector('[data-seconds]');

let difference;
let timerId;
const DELAY = 1000;

const options = {
  defaultDate: new Date(),
  minuteIncrement: 1,
  time_24hr: true,
  enableTime: true,
  onClose([selectedDate]) {
    const differenceTime = selectedDate - Date.now();
    const isInFuture = differenceTime > 0;

    startButton.disabled = !isInFuture;

    if (!isInFuture) {
      Notify.failure('Please, choose a date in the future!');
    }
  },
};



startButton.disabled = true;
resetButton.disabled = true;

flatpickr(input, options);

startButton.addEventListener('click', onStartButtonClick);
resetButton.addEventListener('click', onResetButtonClick);

function onResetButtonClick() {
  setCountdown({})

  resetButton.disabled = true;
  input.disabled = false;
}

function setCountdown({days = 0, hours = 0, minutes = 0, seconds = 0}) {
  formDays.textContent = addLeadingZero(days);
  formHours.textContent = addLeadingZero(hours);
  formMinutes.textContent = addLeadingZero(minutes);
  formSeconds.textContent = addLeadingZero(seconds);
}

function onStartButtonClick() {
  setStart(true);
  input.disabled = true;
  setTimer();
  timerId = setInterval(() => {
    setTimer();
    
    if (difference < DELAY) {
      input.disabled = false;
      clearInterval(timerId);
      resetButton.disabled = true;
    }
  }, DELAY);
}

resetButton.addEventListener('click', () => clearInterval(timerId));

const setStart = (boolean) => {
  startButton.disabled = boolean;
  resetButton.disabled = !boolean;
}

function setTimer() {
  difference = getDifferenceTime();
  setCountdown(transformMs(getDifferenceTime()));
}

function transformMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  return { days, hours, minutes, seconds };
}

function getDifferenceTime() {
  const chosenDatetime = new Date(input.value);
  const currentTime = Date.now();
  return chosenDatetime - currentTime;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}