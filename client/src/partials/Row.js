import React, {useState, useEffect} from 'react';
import {POSTERURL} from '../config';
import {useHistory} from 'react-router-dom';
import {string_to_slug} from '../support/slugify'
import {
    getMoviesByGenre,
    getTrendingMovies,
    getTopRatedMovies,
    getSimilarMovies,
} from '../services/titleAPI';
import '../assets/css/App.css';

function Row({title, isLargeRow, genre, movieId}) {
    const [movies, setMovies] = useState([]);
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
                case 'similar':
                    let similarMovies = await getSimilarMovies(movieId);
                    setMovies(similarMovies);
                    return similarMovies;
                default:
                    let moviesByGenres = await getMoviesByGenre(genre);
                    setMovies(moviesByGenres);
                    return moviesByGenres;
            }
        }
        fetchData();
    }, [genre, movieId]);



    const handleClick = (movie) => {                
        const movieName = string_to_slug(movie.title ||  movie.original_name)
        history.push(`/title/${movie.id}-${movieName}`);
        window.location.reload();
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
                        title={movie.name}
                        alt={movie.name}
                    />
                ))}
            </div>
        </div>
    );
}

export default Row;
