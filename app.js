https://www.omdbapi.com/?sapikey=f1e3b5d6
http://www.omdbapi.com/?i=tt3896198&apikey=f1e3b5d6

const movieSearchBox = document.getElementById(`movie-search-box`);
const searchList =  document.getElementById(`search-list`);
const r4esultGrid = document.getElementById(`result-grid`);

async function loadMovies(searchTerm){
    const URL = `https://www.omdbapi.com/?s=${searchTerm}apikey=f1e3b5d6`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if(data.Response === "True") displayMovieList(data.Search);
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

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement(`div`);
        movieListItem.dataset.id = movies[idx].imdbID;
        movieListItem.classList.add(`search-list-item`);
        if(movies[idx].Poster != "N/A");
            moviePoster = movies[idx].Poster;
        else
            moviePoster = "img_not_found.png";

        movieListItem.innerHTML = `
            
        `;
    }
}