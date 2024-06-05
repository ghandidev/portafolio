let swiperCards = new Swiper('.card__content', {
  loop: true,
  spaceBetween: 32,
  grabCursor: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    600: {
      slidesPerView: 2,
    },
    968: {
      slidesPerView: 3,
    },
  },
});

let listItem = document.querySelectorAll('.nav-bar li');
let menuBackdrop = document.querySelector('#menu-backdrop');

listItem.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    const { left, top, width, height } = item.getBoundingClientRect();
    const { clientHeight, clientWidth } = item;
    /* console.log(left, top, width, height);
    console.log(clientHeight, clientWidth); */

    menuBackdrop.style.setProperty('--left', `${left}px`);
    menuBackdrop.style.setProperty('--top', `${top}px`);
    menuBackdrop.style.setProperty('--width', `${width}px`);
    menuBackdrop.style.setProperty('--height', `${height}px`);
    menuBackdrop.style.opacity = '1';
    menuBackdrop.style.visibility = 'visible';
  });
  item.addEventListener('mouseleave', () => {
    menuBackdrop.style.opacity = '0';
    menuBackdrop.style.visibility = 'hidden';
  });
});

const colorThemes = document.querySelectorAll('[name="theme"]');
// store theme
const storeTheme = function (theme) {
  localStorage.setItem('theme', theme);
};

const setTheme = function () {
  const activeTheme = localStorage.getItem('theme');
  colorThemes.forEach((themeOption) => {
    if (themeOption.id === activeTheme) {
      themeOption.checked = true;
    }
  });
};

colorThemes.forEach((themeOption) => {
  themeOption.addEventListener('click', () => {
    storeTheme(themeOption.id);
  });
});

document.onload = setTheme();

const flagsElement = document.getElementById('flags');
const textsToChange = document.querySelectorAll('[data-section]');
const navText = document.querySelectorAll('[a-section]');

const changeLanguage = async (language) => {
  const requestJson = await fetch(`./languages/${language}.json`);
  const texts = await requestJson.json();

  for (const textToChange of textsToChange) {
    const section = textToChange.attributes[1].value;
    const value = textToChange.attributes[0].value;

    textToChange.textContent = texts[section][value];
  }
};

flagsElement.addEventListener('click', (e) => {
  changeLanguage(e.target.getAttribute('data-language'));
});
