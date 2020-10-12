import React, {useState, useEffect} from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

function Trailer(props) {
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };
    const [trailerUrl, setTrailerUrl] = useState('');
    useEffect(() => {
        movieTrailer(props.name || '', props.release)
            .then((url) => {
                setTrailerUrl(url.split('=').pop());
            })
            .catch(console.error);
    });

    return (
        <div>{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}</div>
    );
}

export default Trailer;
