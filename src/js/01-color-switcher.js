// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на випадкове значення, використовуючи інлайн стиль. Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.
// Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).

// 1) Відслідковуєм клік по Старт
//  - запускаєм інтервал який генерує колір і вішає його на фон
//  - Старт disabled
// 2) Відслідковуєм клік по Стоп
//  - видаляєм нтервал
//  - Старт enabled

const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;

const myInterval = {
  timerId: null,
  go() {
    this.timerId = setInterval(() => {
      // console.log('go interval');
      this.styleChange();
    }, 1000);
  },

  clear() {
    clearInterval(this.go);
  },

  styleChange() {
    body.style.backgroundColor = this.getRandomHexColor();
  },

  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  },

  buttonDisabled() {
    start.disabled = true;
  },

  buttonEnabled() {
    start.disabled = false;
  },
};

start.addEventListener('click', () => {
  // console.log('clock start');
  myInterval.go();
  myInterval.buttonDisabled();
});

stop.addEventListener('click', () => {
  // console.log('click stop');
  clearInterval(myInterval.timerId);
  myInterval.buttonEnabled();
});
