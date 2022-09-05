import Notiflix from 'notiflix';
Notiflix.Notify.init({
  timeout: 5000,
});

const formData = document.querySelector('.form');

formData.addEventListener('submit', onButtonCreateHandler);

function onButtonCreateHandler(e) {
  e.preventDefault();

  let { delay, step, amount } = e.currentTarget.elements;
  delay = Number(delay.value);
  step = Number(step.value);
  amount = Number(amount.value);
  for (let i = 1; i < amount + 1; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
