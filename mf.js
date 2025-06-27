//change the color of navbar when scroll down
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

const loginOverlay = document.getElementById('loginOverlay');
const loginBtn = document.getElementById('open-login');
const avatarIcon = document.getElementById('avatarIcon');
const submitLogin = document.getElementById('submitLogin');
// the login button
loginBtn.addEventListener('click', () => {
  loginOverlay.style.display = 'flex';
});
//close the login form after clicking out of it
loginOverlay.addEventListener('click', (e) => {
  if (e.target.id === 'loginOverlay') {
    loginOverlay.style.display = 'none';
  }
});
// go to search after clicking serach now button
document.getElementById('gotosearch').addEventListener('click', () => {
  const searchInput = document.getElementById('searchinput');
  searchInput.focus();
});
// creating an account from the form
submitLogin.addEventListener('click', () => {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (username && password.length >= 8) {
    localStorage.setItem('loggedInUser', username); // local storage bcz we dont have DB
    showAvatar();
    loginOverlay.style.display = 'none';
  } else {
    alert('Please enter a valid username and a password with at least 8 characters.');
  }
});
//showing an avatar at the place of the log in button after making an account
function showAvatar() {
  loginBtn.style.display = 'none';
  avatarIcon.style.display = 'inline';
}
avatarIcon.addEventListener('click', () => {
  if (confirm('Do you want to log out?')) {
    localStorage.removeItem('loggedInUser');
    loginBtn.style.display = 'inline-block';
    avatarIcon.style.display = 'none';
  }
});
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('loggedInUser')) {
    showAvatar();
  }
});
//array of popular movies using api
const popularMovies = ['Inception', 'Interstellar', 'The Matrix', 'Titanic', 'Gladiator',
  'Avengers', 'The Dark Knight', 'Frozen', 'The Lion King', 'Joker'];
const apiKey = 'bbd3bc51'; 
const container = document.getElementById('popularMovies');

/*popularMovies.forEach(title => { // fetch promise for every element in the array 
  fetch(`https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`) 
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'True') {
        const card = document.createElement('div');
        card.classList.add('movie-card');

        card.innerHTML = `
          <img src="${data.Poster}" alt="${data.Title}">
          <h3>${data.Title}</h3>
        `;

        container.appendChild(card);
      }
    })
    .catch(error => {
      console.error('Error fetching movie:', title, error);
    });
});
const slideLeft = document.getElementById('slideLeft');
const slideRight = document.getElementById('slideRight');
// cards size 
function getCardWidth() {
  const card = container.querySelector('.movie-card');
  const style = getComputedStyle(container);
  const gap = parseInt(style.gap) || 20;
  return card ? card.offsetWidth + gap : 200;
}
// the popular movies slider 
slideLeft.onclick = () => {
  container.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
};

slideRight.onclick = () => {
  container.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
}; */
// the other sections slider 
function createMovieSlider(movieTitles, containerId, leftBtnId, rightBtnId) {
  const container = document.getElementById(containerId);
  const leftBtn = document.getElementById(leftBtnId);
  const rightBtn = document.getElementById(rightBtnId);

  movieTitles.forEach(title => {
    fetch(`https://www.omdbapi.com/?t=${title}&apikey=bbd3bc51`)
      .then(res => res.json())
      .then(data => {
        if (data.Response === 'True') {
          const card = document.createElement('div');
          card.classList.add('movie-card');
          card.innerHTML = `
            <img src="${data.Poster}" alt="${data.Title}">
            <h3>${data.Title}</h3>
          `;
          container.appendChild(card);
        }
      });
  });

  function getCardWidth() {
    const card = container.querySelector('.movie-card');
    const style = getComputedStyle(container);
    const gap = parseInt(style.gap) || 20;
    return card ? card.offsetWidth + gap : 200;
  }

  leftBtn.onclick = () => container.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
  rightBtn.onclick = () => container.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
}

const romanceTitles = ['The Notebook', 'La La Land', 'Pride and Prejudice', 'Titanic', 'Before Sunrise', 'Me Before You',
  'A Walk to Remember'];
const actionTitles = ['Mad Max', 'Gladiator', 'John Wick', 'Die Hard', 'The Dark Knight','Extraction', 
  'Mission: Impossible' ];

createMovieSlider(popularMovies ,"popularMovies" , "slideLeft" , "slideRight");
createMovieSlider(romanceTitles, 'romanceMovies', 'slideLeftRomance', 'slideRightRomance');
createMovieSlider(actionTitles, 'actionMovies', 'slideLeftAction', 'slideRightAction');


const searchInput = document.getElementById('searchinput');
const searchResultContainer = document.getElementById('searchResult');

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchMovieByTitle(searchInput.value.trim());
  }
});

function searchMovieByTitle(title) {
  if (!title) return;

  fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=bbd3bc51`)
    .then(res => res.json())
    .then(data => {
      
      document.getElementById('mainSections').style.display = 'none';
      
      
      searchResultContainer.innerHTML = '';
      document.querySelector('.search-result-section').style.display = 'block';
      document.querySelector('.navbar').style.backgroundColor = '#000';

      if (data.Response === 'True') {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
          <img src="${data.Poster}" alt="${data.Title}">
          <h3>${data.Title}</h3>
        `;
        searchResultContainer.appendChild(card);
      } else {
        searchResultContainer.innerHTML = `<p style="color: white;">Movie not found.</p>`;
      }
    });
}

document.querySelector('.search i').addEventListener('click', () => {
  searchMovieByTitle(searchInput.value.trim());
});
document.addEventListener('click', function (e) {
  const card = e.target.closest('.movie-card');
  if (!card) return;

  const title = card.querySelector('h3').innerText;

  fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=bbd3bc51`)
    .then(res => res.json())
    .then(data => {
      const detailsHTML = `
        <img src="${data.Poster}" alt="${data.Title}">
        <h2>${data.Title} (${data.Year})</h2>
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Director:</strong> ${data.Director}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
        <button onclick="markAsSeen('${data.imdbID}')">Mark as Seen</button>
        <button onclick="closeDetails()">Close</button>
      `;
      document.getElementById('movieDetailsCard').innerHTML = detailsHTML;
      document.getElementById('movieDetailsOverlay').style.display = 'flex';
    });
});

function closeDetails() {
  document.getElementById('movieDetailsOverlay').style.display = 'none';
}

function markAsSeen(imdbID) {
  const username = localStorage.getItem('loggedInUser');
  if (!username) {
    alert('You must be logged in to mark movies as seen.');
    return;
  }

  let seen = JSON.parse(localStorage.getItem('seenMovies')) || {};

  // Make sure only one level of nesting
  if (!Array.isArray(seen[username])) {
    seen[username] = [];
  }

  if (!seen[username].includes(imdbID)) {
    seen[username].push(imdbID);
    localStorage.setItem('seenMovies', JSON.stringify(seen));
    alert('Marked as seen!');
  } else {
    alert('Already in your seen list.');
  }
}


document.getElementById('seenIcon').addEventListener('click', () => {
  const username = localStorage.getItem('loggedInUser');
  if (!username) {
    alert('Please log in to view seen movies.');
    return;
  }

  document.getElementById('mainSections').style.display = 'none';
  document.querySelector('.search-result-section').style.display = 'none';
  document.getElementById('movieDetailsOverlay').style.display = 'none';
  document.getElementById('seenPage').style.display = 'block';
  document.querySelector('.navbar').style.backgroundColor = '#000';

  const container = document.getElementById('seenMoviesContainer');
  container.innerHTML = '';

  const seen = JSON.parse(localStorage.getItem('seenMovies')) || {};
  const userSeen = seen[username] || [];

  if (userSeen.length === 0) {
    container.innerHTML = `<p style="color: white;">You haven't marked any movies as seen yet.</p>`;
    return;
  }

  userSeen.forEach(id => {
  fetch(`https://www.omdbapi.com/?i=${id}&apikey=bbd3bc51`)
    .then(res => res.json())
    .then(data => {
      const card = document.createElement('div');
      card.classList.add('movie-card');
      card.setAttribute('data-id', id);
      card.innerHTML = `
        <img src="${data.Poster}" alt="${data.Title}">
        <h3>${data.Title}</h3>
        <button onclick="removeSeen('${id}')">❌ Remove</button>
      `;
      container.appendChild(card);
    });
});
});
function removeSeen(imdbID) {
  const username = localStorage.getItem('loggedInUser');
  let seen = JSON.parse(localStorage.getItem('seenMovies')) || {};

  if (seen[username]) {
    seen[username] = seen[username].filter(id => id !== imdbID);
    localStorage.setItem('seenMovies', JSON.stringify(seen));
    alert('Removed from seen.');

    // Remove the card from the DOM
    const cardToRemove = document.querySelector(`[data-id="${imdbID}"]`);
    if (cardToRemove) cardToRemove.remove();
  }
}
const username = localStorage.getItem('loggedInUser');
const seen = JSON.parse(localStorage.getItem('seenMovies')) || {};
const userSeen = seen[username] || [];
console.log('User:', username);
console.log('Seen movies for user:', userSeen);




