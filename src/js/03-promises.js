import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

Notiflix.Notify.init({ fontSize: '16px', useIcon: false });

const form = document.querySelector('.form');
const formEls = form.elements;
let delay = Number(formEls.delay.value);
let formStep = Number(formEls.step.value);
let formAmount = Number(formEls.amount.value);
let position = 1;

form.addEventListener('submit', onSubmit);

function onFullfilled({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}
function onRejected({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
    if (shouldResolve) {
      // Fulfill
      onFullfilled({ position, delay });
    } else {
      // Reject
      onRejected({ position, delay });
    }
  }, delay);
}
function onSubmit(e) {
  e.preventDefault();

  delay = Number(formEls.delay.value);
  formStep = Number(formEls.step.value);
  formAmount = Number(formEls.amount.value);

  for (let i = 1; i <= formAmount; i += 1) {
    position = i;

    createPromise(position, delay);
    delay += formStep;
  }
}
