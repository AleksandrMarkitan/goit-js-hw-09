const refs = {
  body: document.querySelector('body'),
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
};

refs.startButton.addEventListener('click', onStartButtonHandler);
refs.stopButton.addEventListener('click', onStopButtonHandler);

let timerId = null;
function onStartButtonHandler() {
  refs.startButton.setAttribute('disabled', true);
  timerId = setInterval(
    () => (refs.body.style.backgroundColor = getRandomHexColor()),
    1000
  );
}

function onStopButtonHandler() {
  clearInterval(timerId);
  refs.startButton.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
