const API_KEY = "07f4c56ff64392836837181739598358";

const url = `https://api.themoviedb.org/3/search/movie?api_key=07f4c56ff64392836837181739598358`





function generateUrl(path){
    const url = `https://api.themoviedb.org/3${path}?api_key=07f4c56ff64392836837181739598358`
    return url;
}


function requestMovies(url, onComplete, onError){
    fetch(url)
    .then((res) => res.json())
    .then(onComplete)
    .catch(onError)
}





function movieSection(movies)
{
    return movies.map((movie) => {
        if(movie.poster_path)
        {
            document.querySelector(".mySwiper2 .swiper-wrapper").innerHTML += `<img width="300px"  class="SearchMovie swiper-slide" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"  data-movie-id="${movie.id}" /> `;
        }
    })
}



function createMovieContainer(movies){
    const movieElement = document.createElement("img");
    movieElement.setAttribute("class", "mySwiper2")

    const movieTemplate = `
    <div class="swiper-wrapper">
            ${movieSection(movies)}
    </div>
    </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
        <div class="backround">
            <div class="content"> 
                <p id="content-close">X</p>
            </div>
        </div>
    `;
}
    
    



//     movieElement.innerHTML = movieTemplate;
//     return movieElement;

// }



function renderSearchMovies(data){
    const movies = data.results
    const movieBlock = createMovieContainer(movies);
    // movieSerachable.appendChild(movieBlock)        
    console.log("Data:",data)
}

function renderPopularMovies(data){
    const movies = data.results

        let moviesToAdd = movieSection(movies);
        moviesToAdd.forEach((mov) => {
            console.log(mov)
            // document.querySelector(".mySwiper2 .swiper-wrapper").appendChild(mov);
        })
   
    // const movieBlock = createMovieContainer(movies);
    // console.log(movieBlock)
    // document.body.appendChild(movieBlock)   
    // console.log("Data:",data)
}


function searchMovie(value){
    const path = "/search/movie";

    const newUrl = generateUrl(path) + `&query=` + value;


    requestMovies(url,renderSearchMovies,``)
}

function handleError(error){
    console.log('Error: ',error)
}






function createIframe(video){
    const iframe = document.createElement("iframe")
    iframe.setAttribute('class', 'video')
    iframe.src = `https://youtube.com/embed/${video.key}`
    iframe.width = 480
    iframe.height = 415
    iframe.allowFullscreen = true

    return iframe
}


function createVideoTemplate(data,content){
    content.innerHTML = `
    <p id="content-close">X</p>
    <div class="content"> 
        <div class="links"></div>
    </div>
    `
    const videos = data.results
    const lenght = videos.lenght > 4 ? 4 : videos.lenght;
    const contents = document.querySelector(".content")

    for (let i = 0 ;i < 1; i++) {
        const video = videos[i] //video
        const iframe = createIframe(video)
        contents.appendChild(iframe)
        content.appendChild(iframeContainer)
    }
}



document.onclick = function(event){
    const target = event.target
    console.log("ello")

    if(target.tagName.toLowerCase() === "img")
    {
        console.log("ello")
        const section = target.parentElement;
        const backround = document.querySelector(".backround")
        const content = backround.firstElementChild;
        const movieId = target.dataset.movieId
        console.log(movieId)

        backround.classList.add("backround-display");
        content.classList.add("content-display");

        

        const path = `/movie/${movieId}/videos`
        const url = generateUrl(path);
        console.log(url)
        // Fetch movie videos

        fetch(url)
        .then((res) => res.json())
        .then((data) => createVideoTemplate(data,content))
        .catch((error) => {
            console.log("error is", error)
        });
        ;


    }

    if (target.id === 'content-close')
    {
        const content = target.parentElement;
        const backround = content.parentElement;

        backround.classList.remove("backround-display");
        content.classList.remove("content-display");

    }
}


    const path = "/search/movie";

    const Url = "https://api.themoviedb.org/3/movie/popular?api_key=07f4c56ff64392836837181739598358&language=en-US&page=1"

    fetch(Url)
        .then((res) => res.json())
        .then(renderPopularMovies)
        .catch((error) => {
            console.log("error is", error)
        });
    ;



