const input = document.querySelector('#datetime-picker');
const elButtonStart = document.querySelector('button[data-start]');
const elDays = document.querySelector('span[data-days]');
const elHours = document.querySelector('span[data-hours]');
const elMinutes = document.querySelector('span[data-minutes]');
const elSeconds = document.querySelector('span[data-seconds]');

// import Notiflix from 'notiflix';

// // імпортувати і нааштувати flatpickr
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timer.futureDate = selectedDates[0]; // зберегти вибрану дату
    if (timer.checkFuture()) {
      timer.onButton();
    } // якщо дата в майбутньому увімкнути кн. Старт
    console.log('Календар');
  },
};

flatpickr(input, options);

// об'ект таймер містить все необхідне
const timer = {
  futureDate: 0,
  timeMs: 0,
  intervalId: null,

  buttonListener(el) {
    elButtonStart.addEventListener('click', () => {
      this.start();
    });
  },

  start() {
    console.log('Старт');
    if (!this.checkFuture()) {
      // повторна перевірка, раптом обраний час вже наcтав
      return;
    }
    this.offButton(); // вИмкнути кн. Старт
    this.intervalId = setInterval(() => {
      console.log('Таймаут 1 сек');
      this.timeMs = this.futureDate - new Date();
      console.log(this.timeMs);

      if (this.timeMs < 0) {
        console.log('Час вийшов');
        clearInterval(this.intervalId);
        return;
      }

      console.log('Запис в циферблат');
      this.changeDial(this.convertMs(this.timeMs)); // ms - в convertMs = Дні,Годин,Сек - в changeDial
    }, 1000);
  },

  checkFuture() {
    console.log('Перевірка');
    this.timeMs = this.futureDate - new Date();

    if (this.timeMs > 0) {
      console.log('Перевірка Ок');
      return true;
    }

    alert('Please choose a date in the future');
    console.log('Перевірка Н');
    return false;
  },

  onButton() {
    elButtonStart.disabled = false;
  },

  offButton() {
    elButtonStart.disabled = true;
  },

  convertMs(ms) {
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
  },

  changeDial(timeArr) {
    const { days, hours, minutes, seconds } = timeArr;

    elDays.textContent = this.addLeadingZero(days);
    elHours.textContent = this.addLeadingZero(hours);
    elMinutes.textContent = this.addLeadingZero(minutes);
    elSeconds.textContent = this.addLeadingZero(seconds);
  },

  addLeadingZero(value) {
    return String(value).padStart(2, 0);
  },
};

// вимиаэмо кн. Старт за замовчанням
timer.offButton();
// запукамо відслідковування кліку на кн. Старт
timer.buttonListener();
