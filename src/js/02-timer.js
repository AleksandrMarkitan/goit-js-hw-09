import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
Notiflix.Notify.init({
  position: 'left-top',
  distance: '0px',
  timeout: 5000,
  clickToClose: true,
});

const refs = {
  timerDiv: document.querySelector('.timer'),
  startButton: document.querySelector('.start-button'),
  input: document.querySelector('.data-input'),
};
refs.startButton.setAttribute('disabled', true);
let ms = 0;
const timerStep = 1000;

refs.startButton.addEventListener('click', onStartButtonHandler);

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date() < selectedDates[0]) {
      refs.startButton.removeAttribute('disabled');
    } else {
      refs.startButton.setAttribute('disabled', true);
      Notiflix.Notify.failure('Please choose a date in the future');
    }
    ms = selectedDates[0] - new Date();
  },
});

function onStartButtonHandler() {
  refs.input.setAttribute('disabled', true);
  refs.startButton.setAttribute('disabled', true);

  timerId = setInterval(() => {
    ms -= timerStep;
    if (ms - timerStep < 0) {
      clearInterval(timerId);
      refs.input.removeAttribute('disabled');
    }

    const { days, hours, minutes, seconds } = convertMs(ms);

    refs.timerDiv.innerHTML = `<div class="field">
        <span class="value" data-days>${addLeadingZero(String(days))}</span>
        <span class="label">Days</span>
      </div>
      <div class="field">
        <span class="value" data-hours>${addLeadingZero(String(hours))}</span>
        <span class="label">Hours</span>
      </div>
      <div class="field">
        <span class="value" data-minutes>${addLeadingZero(
          String(minutes)
        )}</span>
        <span class="label">Minutes</span>
      </div>
      <div class="field">
        <span class="value" data-seconds>${addLeadingZero(
          String(seconds)
        )}</span>
        <span class="label">Seconds</span>
      </div>`;
  }, timerStep);
}

// function markap() {
//   ms -= 1000;
//   const { days, hours, minutes, seconds } = convertMs(ms);

//   const newMarkup = (refs.timerDiv.innerHTML = `<div class="field">
//         <span class="value" data-days>${addLeadingZero(String(days))}</span>
//         <span class="label">Days</span>
//       </div>
//       <div class="field">
//         <span class="value" data-hours>${addLeadingZero(String(hours))}</span>
//         <span class="label">Hours</span>
//       </div>
//       <div class="field">
//         <span class="value" data-minutes>${addLeadingZero(
//           String(minutes)
//         )}</span>
//         <span class="label">Minutes</span>
//       </div>
//       <div class="field">
//         <span class="value" data-seconds>${addLeadingZero(
//           String(seconds)
//         )}</span>
//         <span class="label">Seconds</span>
//       </div>`);
//   return newMarkup;
// }

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}
