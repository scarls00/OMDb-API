const movieSearchBox = document.getElementById(`movie-search-box`);
const searchList =  document.getElementById(`search-list`);
const resultGrid = document.getElementById(`result-grid`);

let movies = [];

async function loadMovies(searchTerm){
  const URL = `https://www.omdbapi.com/?s=${searchTerm}&apikey=f1e3b5d6`;
  const res = await fetch(URL);
  const data = await res.json();
    if(data.Response === "True") {
    movies = data.Search;
    displayMovieList(movies);
  }
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
    searchList.classList.remove(`hide-search-list`);
    loadMovies(searchTerm);
  } else {
    searchList.classList.add(`hide-search-list`);
  }
}

function displayMovieList(moviesToDisplay = movies) {
    searchList.innerHTML = "";
    for(let idx = 0; idx < moviesToDisplay.length; idx++){
        let movieListItem = document.createElement(`div`);
        movieListItem.dataset.id = moviesToDisplay[idx].imdbID;
        movieListItem.classList.add(`search-list-item`);
        if(moviesToDisplay[idx].Poster != "N/A")
            moviePoster = moviesToDisplay[idx].Poster;
        else
            moviePoster = "./assets/img-not-found.png";

        movieListItem.innerHTML = `
        <div class="search-item-thumbnail">
            <img src="${moviePoster}">
        </div>
        <div class="search-item-info">
            <h3>${moviesToDisplay[idx].Title}</h3>
            <p>${moviesToDisplay[idx].Year}</p>
        </div>
    `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails(movie) {
    const searchListMovies = searchList.querySelectorAll(`.search-list-item`);
    searchListMovies.forEach(movie => {
        movie.addEventListener(`click`, async () => {
            searchList.classList.add(`hide-search-list`);
            movieSearchBox.value = "";
            const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=f1e3b5d6`);
            const movieDetails = await result.json();
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details){
  resultGrid.innerHTML = `
    <div class="movie-poster">
            <img src="${(details.Poster != "N/A") ? 
                details.Poster : ".assets/img-not-found.png"}" alt = "movie poster">
        </div>
        <div class="movie-info">
        <h3 class="movie-title">${details.Title}</h3>
        <ul class="movie-misc-info">
            <li class="year">${details.Year}</li>
        </ul>
    </div> 
    `;
}

window.addEventListener(`click`, (event) => {
    if(
    event.target.className != "form-control" &&
    event.target.id !== "filter" &&
    !event.target.closest("#search-list")
    ){
    searchList.classList.add(`hide-search-list`);
  }
})

function filterMovies(event){
  const filter = event.target.value;

    if(filter === "A_TO_Z"){
        movies.sort((a,b) => a.Title.localeCompare(b.Title));
  }

    if(filter === "Z_TO_A"){
        movies.sort((a,b) => b.Title.localeCompare(a.Title));
  }

    if(filter === "Newest_to_Oldest"){
        movies.sort((a,b) => b.Year - a.Year);
  }

    if(filter === "Oldest_to_Newest"){
        movies.sort((a,b) => a.Year - b.Year);
  }

  displayMovieList(movies);
}




// async function renderMovies(filter) {
//     const listElement = document.getElementById(`sortable-list`);
//     const API_URL = `https://www.omdbapi.com/?i=${item.title}&apikey=f1e3b5d6`
    
//     try {
//         const response = await fetch(API_URL);
//         const data = await response.json();

//         listElement.innerHTML = ``;

//         data.forEach(item => {
//             const textContent = item.title; 
//         });
//     }catch (error) {
//         console.error("Error fetching data:", error);
//     }
//   }

// function sortListById() {
//     const listElement = document.getElementById(`sortable-list`);
//     const listItemElements = [...listElement.querySelectorAll(`:scope > item.title`)];

//     listItemElements.sort((a, b) => {
//         const idA = parseInt(a.getAttribute(`data-id`));
//         const idB = parseInt(b.getAttribute(`data-id`));
//         return idA - idB;
//     })
//     for (const item.title of listItemElements) {
//         listElement.appendChild(item.title;)
//     }
// }