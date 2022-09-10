import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const datePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysScrn = document.querySelector('[data-days]');
const hoursScrn = document.querySelector('[data-hours]');
const minutesScrn = document.querySelector('[data-minutes]');
const secondsScrn = document.querySelector('[data-seconds]');
let selectedDate;

startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() > selectedDates[0]) {
      Notiflix.Notify.warning('Please choose a date in the future');
      return;
    }
    startBtn.removeAttribute('disabled', false);

    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
  },
};

flatpickr(datePicker, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function changeTimeOnScreen({ days, hours, minutes, seconds }) {
  daysScrn.textContent = days;
  hoursScrn.textContent = hours;
  minutesScrn.textContent = minutes;
  secondsScrn.textContent = seconds;
}

const timer = {
  intervalId: null,
  start() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedDate - currentTime;
      if (deltaTime <= 0) {
        clearInterval(this.intervalId);
        return;
      }
      const convertedTime = convertMs(deltaTime);
      changeTimeOnScreen(convertedTime);
      startBtn.setAttribute('disabled', true);
      console.log(convertMs(deltaTime));
    }, 1000);
  },
};

startBtn.addEventListener('click', () => {
  timer.start();
});
