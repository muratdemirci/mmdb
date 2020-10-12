import React, {useState, useEffect} from 'react';
import {POSTERURL} from '../config/config';
import {getUpcoming} from '../services/titleAPI';

function Banner() {
    const [movie, setMovie] = useState();
    useEffect(() => {
        async function fetchData() {
            const request = await getUpcoming();
            setMovie(request[Math.floor(Math.random() * request.length - 1)]);
            return request;
        }
        fetchData();
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    }

    return (
        <header
            className="banner"
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url(${POSTERURL}${movie?.backdrop_path})`,
                backgroundPosition: 'center center',
            }}>
            <div className="banner__contents">
                <h1 className="banner__title">
                    {' '}
                    {movie?.title || movie?.name || movie?.original_name}{' '}
                </h1>
                <div className="banner_buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">
                    {' '}
                    {truncate(movie?.overview, 150)}{' '}
                </h1>
            </div>
            <div className="banner__fadeBottom"></div>
        </header>
    );
}

export default Banner;
