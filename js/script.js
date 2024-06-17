let swiperCards = new Swiper('.card__content', {
  loop: true,
  spaceBetween: 25,
  grabCursor: true,
  centerSlide: 'true',
  fade: 'true',
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

const menuBtn = document.querySelector('.menu');
const exitBtn = document.querySelector('.exit');
const colorBar = document.querySelector('.page');
const langBar = document.querySelector('.lang');

menuBtn.addEventListener('click', () => {
  colorBar.classList.remove('hide');
  langBar.classList.remove('hide');
  exitBtn.classList.remove('hide');
  menuBtn.classList.add('hide');
});

exitBtn.addEventListener('click', () => {
  menuBtn.classList.remove('hide');
  exitBtn.classList.add('hide');
  langBar.classList.add('hide');
  colorBar.classList.add('hide');
});

function makeEaseOut(timing) {
  return function (timeFraction) {
    return 1 - timing(1 - timeFraction);
  };
}

function bounce(timeFraction) {
  for (let a = 0, b = 1; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return (
        -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
      );
    }
  }
}

function quad(timeFraction) {
  return Math.pow(timeFraction, 2);
}

ball.onclick = function () {
  let height = field.clientHeight - ball.clientHeight;
  let width = 250;
  animate({
    duration: 2000,
    timing: makeEaseOut(bounce),
    draw: function (progress) {
      ball.style.top = height * progress + 'px';
    },
  });

  animate({
    duration: 2000,
    timing: makeEaseOut(quad),
    draw: function (progress) {
      ball.style.left = width * progress + 'px';
    },
  });
};
