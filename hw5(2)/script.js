"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("toggleButton");
  const message = document.getElementById("message");

  // завантажуємо поточний стан кнопки з localStorage
  const state = localStorage.getItem("state");

  // якщо стан було збережено раніше, то відновлюємо його
  if (state) {
    button.textContent = state === "on" ? "Turn off" : "Turn on"; // встановлюємо текст кнопки
    setTheme(state); // змінюємо тему відповідно до стану
    message.textContent = localStorage.getItem("lastChange"); // відображаємо час останньої зміни
  }

  // метод .addEventListener() для кнопки, щоб відслідковувати кліки
  button.addEventListener("click", function () {
    if (button.textContent === "Turn off") {
      button.textContent = "Turn on";
      setTheme("off");
      setLastToggle("off");
    } else {
      button.textContent = "Turn off";
      setTheme("on");
      setLastToggle("on");
    }
  });

  // функція для збереження останньої дати і часу зміни та виведення їх на екран
  function setLastToggle(state) {
    const date = new Date();
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    // зберігаємо стан в LocalStorage
    localStorage.setItem("state", state);
    // встановлюємо повідомлення відповідно до стану
    const lastChangeMessage =
      state === "on" ? "Last turn on: " : "Last turn off: ";
    // зберігаємо час останньої зміни в LocalStorage
    localStorage.setItem("lastChange", lastChangeMessage + formattedDate);
    // відображаємо час останньої зміни на веб-сторінці
    message.textContent = lastChangeMessage + formattedDate;
  }

  // функція для зміни теми відповідно до стану кнопки
  function setTheme(state) {
    if (state === "on") {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      button.classList.remove("dark-theme");
    } else {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      button.classList.add("dark-theme");
    }
  }
});
