import React, {useState, useEffect} from 'react';
import {POSTERURL} from '../config/config';
// import YouTube from 'react-youtube';
import {useHistory} from 'react-router-dom';
// import movieTrailer from 'movie-trailer';
import {
    getMoviesByGenre,
    getTrendingMovies,
    getTopRatedMovies,
} from '../services/titleAPI';
import '../assets/css/App.css';

function Row({title, isLargeRow, genre}) {
    const [movies, setMovies] = useState([]);
    // const [trailerUrl, setTrailerUrl] = useState('');
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            switch (genre) {
                case 'trending':
                    let trendingMovies = await getTrendingMovies();
                    setMovies(trendingMovies);
                    return trendingMovies;
                case 'top-rated':
                    let topRatedMovies = await getTopRatedMovies();
                    setMovies(topRatedMovies);
                    return topRatedMovies;
                default:
                    let moviesByGenres = await getMoviesByGenre(genre);
                    setMovies(moviesByGenres);
                    return moviesByGenres;
            }
        }
        fetchData();
    }, [genre]);

    // const opts = {
    //     height: '390',
    //     width: '100%',
    //     playerVars: {
    //         autoplay: 1,
    //     },
    // };

    const handleClick = (movie) => {
        console.log(movie);
        history.push(`/title/${movie.id}`);
        // if (trailerUrl) {
        //     setTrailerUrl('')
        // } else {
        //     movieTrailer(movie?.name || "")
        //         .then((url) => {
        //             const urlParams = new URLSearchParams(new URL(url).search);
        //             setTrailerUrl(urlParams.get("v"));
        //         }).catch((error) => console.log(error));
        // }
    };

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map((movie) => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${
                            isLargeRow && 'row_posterLarge'
                        }`}
                        src={`${POSTERURL}${
                            isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`}
                        alt={movie.name}
                    />
                ))}
            </div>
            {/* {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} */}
        </div>
    );
}

export default Row;
