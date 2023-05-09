const global = {
    currentPage: window.location.pathname
}

//Now Playing 
async function nowPlaying () {
    console.log('now playing');
    const { results } = await fetchAPIData('movie/now_playing');
    console.log(results);
    results.forEach((movie) =>{

        const div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML = `
            <a href="movie-details.html?${movie.id}">
            ${
                movie.poster_path
                ?
                `<img src="https:image.tmdb.org/t/p/w500${movie.poster_path}" alt="Movie title" />`
                :
                `<img src="./images/no-image.jpg" alt="${movie.original_title}" />`
            }
            </a>
            <h4 class="swiper-rating">
                <i class="fas fa-star text-secondary"></i> ${Math.round(movie.vote_average *10) / 10} / 10
            </h4>`;

        document.querySelector('.swiper-wrapper').appendChild(div);
    });
}

// Popular Movies
async function displayPopularMovies () {
    const { results } = await fetchAPIData('movie/popular')
    results.forEach((movie) => {
        const div = document.createElement('div')
        div.classList.add('card');
        div.innerHTML = `
        <a href="movie-details.html?${movie.id}">
        ${
            movie.poster_path
            ? `<img
            src="https:image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.original_title}"
            />` : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="Movie Title"`
        }
        </a>
        <div class="card-body">
        <h5 class="card-title">${movie.original_title}</h5>
        <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
        </p>
        </div>
        `
        document.querySelector('#popular-movies').appendChild(div);
    });
};

//Display popular TV shows
async function displayPopularTVShows () {
    const { results } = await fetchAPIData('tv/popular');
    console.log(results);
    results.forEach((show) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <a href="tv-details.html?${show.id}">
            ${
                show.poster_path
                ? `<img
                src="https:image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="Show Title"
                />`
                : `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="Show Title"
                />`
            }
            </a>
            <div class="card-body">
            <h5 class="card-title">${show.original_name}</h5>
            <p class="card-text">
                <small class="text-muted">Aired: ${show.first_air_date
                }</small>
            </p>
            </div>`

            document.querySelector('#popular-shows').appendChild(div);
    });
}

// Display movie details
async function movieDetails () {
    const id = window.location.search.substring(1);
    console.log(id);
    const movie = await fetchAPIData(`movie/${id}`);
    console.log(movie);

    const { production_companies, genres } = movie;
    console.log(production_companies);
    console.log(movie.genres);

   
    const divTop = document.createElement('div');
    divTop.classList.add('details-top')
    divTop.innerHTML = `
        <div class="img-wrap">
        ${
            movie.poster_path
        
        ?
            `<img
                src="https:image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="Movie Title"
            />`
        :
            `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="Movie Title"
            />`
        }

        </div>
        <div>
        <h2>${movie.original_title}</h2>
        <p>
            <i class="fas fa-star text-primary"></i>
            ${Math.round(movie.vote_average *10) / 10} / 10
        </p>
        <p class="text-muted">Release Date: ${movie.release_date}</p>
        <p>${movie.overview}</p>
        <h5>Genres</h5>
        <ul class="list-group"></ul>
        <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
        </div>`;

    const divBottom = document.createElement('div');
    divBottom.classList.add('details-bottom');
    divBottom.innerHTML = `
        <h2>Movie Info</h2>
        <ul>
        ${
            movie.budget === 0
            ?
            `
            <li><span class="text-secondary">Budget:</span> Not Listed</li>
            `
            :
            `
            <li><span class="text-secondary">Budget:</span> $${movie.budget.toLocaleString()}</li>
            `
        }
        ${
            movie.revenue === 0
            ?
            `
            <li><span class="text-secondary">Budget:</span> Not Listed</li>
            `
            :
            `
            <li><span class="text-secondary">Budget:</span> $${movie.revenue.toLocaleString()}</li>
            `
        }
        <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
        <li><span class="text-secondary">Status:</span> ${movie.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group"></div>`;
        
    const companies = document.createElement('div');
    companies.classList.add('list-group');

    if (production_companies.length !== 0) {
        production_companies.forEach((company) => {
            const comPany = document.createElement('div');
            comPany.textContent = company.name;
            companies.appendChild(comPany);
        })
    } else {
        const comPany = document.createElement('div');
        comPany.textContent = 'Not Listed';
        companies.appendChild(comPany);  
    }
        

    const parent = document.querySelector('#movie-details');

    divBottom.appendChild(companies);
    
    parent.appendChild(divTop);
    parent.appendChild(divBottom);

    if (genres.length !== 0) {
        genres.forEach((genre) => {
            const li = document.createElement('li');
            li.textContent = genre.name;
            document.querySelector('ul[class="list-group"]').appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'Not Listed';
        document.querySelector('ul[class="list-group"]').appendChild(li);
    }

    // const backgroundPoster = document.querySelector('section');
    // backgroundPoster.style.cssText = `background: url(https:image.tmdb.org/t/p/w500${movie.backdrop_path}) no-repeat center center/cover`
       
}

// display TV-show details
async function showDetails () {
    const id = window.location.search.substring(1);
    const show = await fetchAPIData(`tv/${id}`);
    console.log(show);

    const { production_companies, genres } = show;
    console.log(production_companies, genres);

    const divTop = document.createElement('div');
    divTop.classList.add('details-top')
    divTop.innerHTML = `
        <div>
        ${
            show.poster_path
        
        ?
            `<img
                src="https:image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="Movie Title"
            />`
        :
            `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="Movie Title"
            />`
        }

        </div>
        <div>
        <h2>${show.original_name}</h2>
        <p>
            <i class="fas fa-star text-primary"></i>
            ${Math.round(show.vote_average *10) / 10} / 10
        </p>
        <p class="text-muted">Release Date: ${show.first_air_date}</p>
        <p>${show.overview}</p>
        <h5>Genres</h5>
        <ul class="list-group"></ul>
        <a href="${show.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
        </div>`;

    const divBottom = document.createElement('div');
    divBottom.classList.add('details-bottom');
    divBottom.innerHTML = `
        <h2>Movie Info</h2>
        <ul>
        <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
        <li><span class="text-secondary">Last Episode To Air:</span> ${show.last_air_date}</li>
        <li><span class="text-secondary">Status:</span> ${show.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group"></div>`;
        
    const companies = document.createElement('div');
    companies.classList.add('list-group');
    
    if (production_companies.length !== 0) {
        production_companies.forEach((company) => {
            const comPany = document.createElement('div');
            comPany.textContent = company.name;
            companies.appendChild(comPany);   
        });    
    } else {
        const comPany = document.createElement('div');
        comPany.textContent = 'Not Listed';
        companies.appendChild(comPany);
    }
    
    const parent = document.querySelector('#show-details');
    
    divBottom.appendChild(companies);
    
    parent.appendChild(divTop);
    parent.appendChild(divBottom);
    
    if (genres.length !== 0) {
        genres.forEach((genre) => {
            const li = document.createElement('li');
            li.textContent = genre.name;
            document.querySelector('ul[class="list-group"]').appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'Not Listed';
        document.querySelector('ul[class="list-group"]').appendChild(li);
    }

}

// Get search type and user input
function searchTerm () {
    document.querySelector('#search-term').removeEventListener('input', checkUserInput);
    const url = window.location.search;
    const type = getSubstring(url, '=', '&');
    const searchArr = url.split('=');
    const searchTerm = searchArr.splice(2,2);
    
    console.log('TYPE: ' + type);
    console.log('SEARCH TERM: ' + searchTerm);

    if (type === 'movie'){
        searchMovies(searchTerm);
    } else {
        searchTV(searchTerm);
    }
}

// Validate user input
function checkUserInput(e) {
    
    let userInput = e.target.value;

    const inputBorder = document.querySelector('input[type="text"]');
    const btn = document.querySelector('.btn[type="submit"]');
    
    const pattern = /^[a-zA-Z0-9\s\-]+$/;

    const inputValue = userInput.trim();
        if (inputValue.match(pattern)) {
            console.log('Valid search term');
            btn.disabled = false;
            inputBorder.style.cssText = 'border: 2px solid green';
        } else {
            console.log('Invalid search term');
            btn.disabled = true;
            inputBorder.style.cssText = 'border: 2px solid red';
        } 
}

// Search Movies API
async function searchMovies (searchTerm) {
    addSpinner();
    const TV = false;
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=8f6f48fed65bd43c3c5074010015cc51&query=${searchTerm}`);
    const  results   = await response.json();
    const pages = results.total_pages;
    const pagesArr = [];
    for (let i = 1; i < pages + 1; i++) {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=8f6f48fed65bd43c3c5074010015cc51&query=${searchTerm}&page=${[i]}`);
        const { results } = await response.json();
        pagesArr.push(results);
    }
    const searchResults = pagesArr.flat();

    let currentPage = 1;
    console.log('currentPage: ', currentPage);
    
    displayResults(searchResults, currentPage, TV);
    removeSpinner();
}

// Search TV API
async function searchTV (searchTerm) {
    addSpinner();
    const TV = true;
    const response = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=8f6f48fed65bd43c3c5074010015cc51&query=${searchTerm}`);
    const  results  = await response.json();
    const pages = results.total_pages;
    const pagesArr = [];
    for (let i = 1; i < pages + 1; i++) {
        const response = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=8f6f48fed65bd43c3c5074010015cc51&query=${searchTerm}&page=${[i]}`);
        const { results } = await response.json();
        pagesArr.push(results);
    }
    const searchResults = pagesArr.flat();

    let currentPage = 1;
    console.log('currentPage: ', currentPage);

    displayResults(searchResults, currentPage, TV);
    removeSpinner();
}

// Display search results with pagination
function displayResults(results, currentPage, TV) {
    console.log(results, currentPage);
    const totalPages = Math.ceil(results.length / 8);

    const startIndex = (currentPage - 1) * 8;
    const endIndex = startIndex + 8;
    const pageCards = results.slice(startIndex, endIndex);
    console.log('Array: ', pageCards);

    document.querySelector('#search-results').innerHTML = '';
   
    pageCards.forEach((card) =>{

        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            ${
                TV === true
                ?
                `
                <a href="tv-details.html?${card.id}">
                `
                :
                `
                <a href="movie-details.html?${card.id}">
                `
            }
            ${
                card.poster_path
                ?
                `
                <img src="https:image.tmdb.org/t/p/w500${card.poster_path}" class="card-img-top" alt="" />
                `
                :
                `
                <img src="images/no-image.jpg" class="card-img-top" alt="" />
                `
            }
            </a>
            <div class="card-body">
                ${
                    TV === true
                    ?
                    `
                    <h5 class="card-title">${card.original_name}</h5>
                    <p class="card-text">
                        <small class="text-muted">Release: ${card.first_air_date}</small>
                    </p>
                    `
                    :
                    `
                    <h5 class="card-title">${card.original_title}</h5>
                    <p class="card-text">
                        <small class="text-muted">Release: ${card.release_date}</small>
                    </p>
                    `
                }
            </div>`
        document.querySelector('#search-results').appendChild(div);
        console.log(div);
    })
    const pageDiv = document.createElement('div');
    pageDiv.setAttribute('id', 'pagination');
    pageDiv.innerHTML =`
        <div class="pagination">
        <button class="btn btn-primary" id="prev">Prev</button>
        <button class="btn btn-primary" id="next">Next</button>
        <div class="page-counter">Page ${currentPage} of ${totalPages}</div>
        </div>`
    document.querySelector('#search-results').appendChild(pageDiv);

    document.querySelector('#prev').addEventListener('click', () => {
        if (currentPage > 1) {
          displayResults(results,currentPage - 1, TV);
        }
      });
      
      document.querySelector('#next').addEventListener('click', () => {
        if (currentPage < totalPages) {
          displayResults(results, currentPage + 1, TV);
        }
      });
}

// Fetch data from TMBD API 
async function fetchAPIData(endpoint) {
    const API_KEY = '8f6f48fed65bd43c3c5074010015cc51';
    const API_URL = 'https://api.themoviedb.org/3/';
    addSpinner();
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    removeSpinner();
    return data;
}

//Initialize swiper
function startSwiper() {
    const swiper = new Swiper('.swiper', {
        speed: 500,
        spaceBetween: 200,
        slidesPerView: 2,
        spaceBetween: 10,
        // when window width is >= 640px
        breakpoints: {
            640: {
            slidesPerView: 4,
            spaceBetween: 10
            },
        },

        autoplay: {
            delay: 4000,
          },
      }); 
};

//Highlight active link
function highlightActiveLink () {
    const link = document.querySelectorAll('.nav-link');
    link.forEach((link) => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    })
};

function getSubstring (str, start, end) {
    const char1 = str.indexOf(start) + 1;
    const char2 = str.indexOf(end);
    return str.substring(char1, char2);
}

function addSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

// Init App
function init () {
    switch(global.currentPage) {
        case '/': 
        case '/index.html' :
            startSwiper();
            nowPlaying();
            displayPopularMovies();
            console.log('home');
        break;
        case '/shows.html':
            displayPopularTVShows();
            console.log('Shows');
        break;
        case '/movie-details.html':
            movieDetails();
            console.log('Movie-details');
        break;
        case '/tv-details.html': 
            console.log('TV-details');
            showDetails();
        break;
        case '/search.html' :
            searchTerm(); 
            console.log('Search');
        break;
        }
                    
    highlightActiveLink();
    document.querySelector('#search-term').addEventListener('input', checkUserInput);
    
}
                
document.addEventListener('DOMContentLoaded', init);