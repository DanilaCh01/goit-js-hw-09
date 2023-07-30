import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');
const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
  if (+delay.value < 0 || +step.value < 0 || +amount.value < 0) {
    Notify.failure('Please, enter only positive values')
    return
  }

  for (let i = 0; i < +amount.value; i += 1) {
    const sumDelay = +delay.value + +step.value * i;
    createPromise(i, sumDelay)
      .then(result => Notify.success(result))
      .catch(error => Notify.failure(error));
  };
};


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
};