import React, {Component} from 'react';
import Navbar from '../../partials/Navbar';
import {BASE_BACKDROP_PATH, BASE_POSTER_PATH} from '../../config/config';
import {
    getMovieCreditsById,
    getMovieDetailsById,
    getMovieReviews,
    getSimilarMovies,
} from '../../services/titleAPI';
import Cast from '../../components/Cast/Cast';
import Trailer from '../../components/Trailer/Trailer';
import Row from '../../partials/Row';
import './Title.css';

class Title extends Component {
    constructor() {
        super();
        this.state = {
            movieInfo: [],
            movieReviews: [],
            movieCredits: [],
            movieGenres: [],
            loading: true,
            error: false,
        };
    }

    async componentDidMount() {
        if (this.props.match.params.id) {
            try {
                const movieInfo = await getMovieDetailsById(
                    this.props.match.params.id,
                );
                console.log(movieInfo);
                const movieReviews = await getMovieReviews(
                    this.props.match.params.id,
                );
                const movieCredits = await getMovieCreditsById(
                    this.props.match.params.id,
                );
                const similarMovies = await getSimilarMovies(
                    this.props.match.params.id,
                );
                this.setState({
                    loading: false,
                    movieInfo,
                    movieReviews,
                    movieCredits,
                    similarMovies,
                    error: false,
                });
            } catch (err) {
                this.setState({loading: false, error: true});
            }
        }
    }

    render() {
        let releaseDate = this.state.movieInfo.release_date
            ? this.state.movieInfo.release_date.substring(0, 4)
            : '';

        function time_convert(num) {
            var hours = Math.floor(num / 60);
            var minutes = num % 60;
            return ' ' + hours + 'h ' + minutes + 'min';
        }

        return (
            <>
                <Navbar />
                <div className="movie-details-wrapper">
                    <div className="movie-details-title">
                        <h1>
                            {this.state.movieInfo.title} {`(${releaseDate})`}
                        </h1>
                    </div>
                    <img
                        className="movie-details-backdrop"
                        src={`${BASE_BACKDROP_PATH}${this.state.movieInfo.backdrop_path}`}
                        alt="movie background"
                    />
                    <div className="movie-details-poster-wrapper">
                        <img
                            src={`${BASE_POSTER_PATH}/w500${this.state.movieInfo.poster_path}`}
                            alt="movie poster"
                        />
                        <div className="movie-details-info">
                            <div>
                                <p>{this.state.movieInfo.overview}</p>
                            </div>
                            <div>
                                ⭐{this.state.movieInfo.vote_average}/10 |
                                {time_convert(this.state.movieInfo.runtime)} |{' '}
                                {(this.state.movieInfo.genres || []).map(
                                    (genre, index) => (
                                        <a
                                            href={`/genre/${genre.name.toLowerCase()}`}>
                                            {(index ? ', ' : '') + genre.name}
                                        </a>
                                    ),
                                )}{' '}
                                | {this.state.movieInfo.release_date}
                            </div>
                            <div className="movie-details-cast">
                                <Cast data={this.state.movieCredits.cast} />
                            </div>
                            <Trailer
                                className="movie-details-trailer"
                                name={this.state.movieInfo.title}
                                release={releaseDate}
                            />
                        </div>
                    </div>
                    <div className="related-movies">
                        <Row
                            title={'More Like This'}
                            genre={'similar'}
                            movieId={this.props.match.params.id}
                            isLargeRow={true}
                        />
                    </div>
                </div>
            </>
        );
    }
}

export default Title;
