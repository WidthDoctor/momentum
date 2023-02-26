
let imgUrl = '';
const time = document.querySelector(".time");
const day = document.querySelector(".date");
const greetingElement = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');
const body = document.querySelector('body');
let currentImageNumber= 1;

nameInput.addEventListener('focus', (event) => {
  if (nameInput.value === '[Enter name]') {
    nameInput.value = '';
  }
  if (nameInput.value !== '') {
    nameInput.select();
  }
});

function showTime() {
  const currentTime = new Date().toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
}

showTime();

const showDate = () => {
  const currentDate = new Date().toLocaleDateString('en-En', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' });
  day.textContent = currentDate;
};

showDate();
// !DONE_______________________
function hello() {
  const hour = new Date().getHours();
  const name = nameInput.value || 'Guest';
  localStorage.setItem('name', name);
  const greeting = hour >= 5 && hour < 12 ? 'Good Morning,' : hour >= 12 && hour < 18 ? 'Good Afternoon,' : 'Good Evening,';
  greetingElement.textContent = `${greeting}`;
  nameInput.value = `${name}${name ? "!" : ""}`;
  setBg(hour);
}

nameInput.addEventListener('focus', (event) => {
  if (nameInput.value === '[Enter name]') {
    nameInput.value = '';
  }
});

nameInput.addEventListener('blur', (event) => {
  if (nameInput.value === '') {
    nameInput.value = '[Enter name]';
  }
});

nameInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    hello();
  }
});

const savedName = localStorage.getItem('name');
if (savedName) {
  nameInput.value = `${savedName}`;
  hello();
} else {
  const hour = new Date().getHours();
  const greeting = hour >= 5 && hour < 12 ? 'Good Morning!' : hour >= 12 && hour < 18 ? 'Good Afternoon!' : 'Good Evening!';
  greetingElement.textContent = greeting;
  nameInput.value = '[Enter name]';
}

// !Done___________________________
const next = document.querySelector('.slide-next');
const prev = document.querySelector('.slide-prev');


next.addEventListener('click', () => {
  changeBg(1);
});

prev.addEventListener('click', () => {
  changeBg(-1);
});
function changeBg(step) {
  let currentNumber = 0;
  if (imgUrl && imgUrl !== '') {
    currentNumber = parseInt(imgUrl.match(/\d{2}(?=\.jpg)/)[0]);
  }
  currentNumber += step;
  if (currentNumber > 20) {
    currentNumber = 1;
  } else if (currentNumber < 1) {
    currentNumber = 20;
  }
  imgUrl = imgUrl.replace(/\d{2}(?=\.jpg)/, currentNumber.toString().padStart(2, '0'));
  body.style.backgroundImage = `url('${imgUrl}')`;
}
function setBg(hour, imageNumber) {

  if (hour >= 5 && hour < 12) {
    imgUrl = "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/morning/";
  } else if (hour >= 12 && hour < 18) {
    imgUrl = "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/afternoon/";
  } else if (hour >= 18 && hour < 24) {
    imgUrl = "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/";
  } else {
    imgUrl = "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/night/";
  }

  imgUrl += getRandomNumber() + '.jpg';
  body.style.backgroundImage = `url('${imgUrl}')`;
  currentImageNumber = imageNumber;
}

function getRandomNumber() {
  const randomNumber = Math.floor(Math.random() * 20) + 1;
  return randomNumber.toString().padStart(2, '0');
}

// !TODO POGODA___________________

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const cityInput = document.querySelector('.city');

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=79a309f35cd6f58608cdfbde48258129&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
  } catch (error) {
    console.log(error);
  }
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather(cityInput.value);
    cityInput.blur();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getWeather('Minsk');
});

cityInput.addEventListener('keypress', setCity);
cityInput.value = 'Minsk';

//!TODO--------------citata
const refreshButton = document.querySelector(".change-quote");
const author = document.querySelector('.author');
const quote = document.querySelector('.quote');
// Функция загрузки данных
function getQuotes(){
  const quotes = '/js/data.json';
  fetch(quotes)
    .then(res => res.json())
    .then(data => {
      let randomNum = Math.floor(Math.random() * data.length);
      author.innerHTML = data[randomNum].author;
      quote.innerHTML = data[randomNum].text;
  });
}

// При загрузке страницы загружаем первую цитату
getQuotes();

// При нажатии на кнопку `refreshButton` загружаем новую цитату
refreshButton.addEventListener('click', getQuotes);

// !todo___________ player
import playList from './playlist.js';

const playButton = document.querySelector(".play");
const prevButton = document.querySelector(".play-prev");
const nextButton = document.querySelector(".play-next");
const ul = document.querySelector('.play-list');

let audio = null;
let currentTrackIndex = 0;

playList.forEach((item, index) => {
  const li = document.createElement('li');
  const text = document.createTextNode(`${item.title} (${item.duration})`);
  li.appendChild(text);
  ul.appendChild(li);

  li.addEventListener('click', function() {
    currentTrackIndex = index;
    playTrack(currentTrackIndex);
  });
});

playButton.addEventListener('click', function() {
  if (!audio) {
    currentTrackIndex = 0;
    playTrack(currentTrackIndex);
  } else if (audio.paused) {
    audio.play();
    playButton.classList.replace('play', 'pause');
  } else {
    audio.pause();
    playButton.classList.replace('pause', 'play');
  }
});

prevButton.addEventListener('click', function() {
  if (currentTrackIndex === 0) {
    currentTrackIndex = playList.length - 1;
  } else {
    currentTrackIndex--;
  }
  playTrack(currentTrackIndex);
});

nextButton.addEventListener('click', function() {
  if (currentTrackIndex === playList.length - 1) {
    currentTrackIndex = 0;
  } else {
    currentTrackIndex++;
  }
  playTrack(currentTrackIndex);
});

function playTrack(index) {
  if (audio) {
    audio.pause();
  }
  audio = new Audio(playList[index].src);
  audio.play();
  playButton.classList.replace('play', 'pause');
  highlightCurrentTrack(index);
}

function highlightCurrentTrack(index) {
  playList.forEach((track, trackIndex) => {
    const li = ul.children[trackIndex];
    if (index === trackIndex) {
      li.classList.add('current', 'this_music');
    } else {
      li.classList.remove('current', 'this_music');
    }
  });
}

audio.addEventListener('ended', function() {
  currentTrackIndex++;
  if (currentTrackIndex > playList.length - 1) {
    currentTrackIndex = 0;
  }
  playTrack(currentTrackIndex);
});