// // Т.З.:
//  - скрипт, який при сабміті форми викликає ф. createPromise(position, delay) стільки разів, скільки ввели в поле Amount.
//  - (position) номер промісу, що створюється під час кожного виклику
//  - (delay) затримка (враховуює першу затримку First delay, і крок Delay step ).
//  createPromise повертає один проміс, який виконується або відхиляється через delay часу.
//  Значенням промісу є об'єкт, в якому є властивості position і delay зі значеннями однойменних параметрів.

const elForm = document.querySelector('form');
let position = 0;
// console.log(elForm);

elForm.addEventListener('submit', (event) => {
  // виявляєм подію квік
  event.preventDefault(); // вимикаєм стандартні події

  let delay = elForm.delay.value * 1; // зчитуєм з форми delay мс.
  const step = elForm.step.value * 1; // зчитуєм з форми step мс.
  const amount = elForm.amount.value * 1; // зчитуєм з форми step мс.

  // console.log('подія квік', delay, step, amount);

  while (position < amount) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    position += 1;
    delay += step;
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    // створ. проміс
    // console.log('створ. проміс', position);
    // console.log('запускаю таймаут на', delay);

    setTimeout(() => {
      // console.log('минув таймаут');

      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
