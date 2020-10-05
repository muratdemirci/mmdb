import React, {Component} from 'react';
import Navbar from '../../partials/Navbar';
import {BASE_BACKDROP_PATH, BASE_POSTER_PATH} from '../../config/config';
import {
    getMovieCreditsById,
    getMovieDetailsById,
    getMovieReviews,
    getSimilarMovies,
} from '../../services/titleAPI';
import Reviews from '../../components/Reviews/Reviews';
import Cast from '../../components/Cast/Cast';
import './Title.css';

class Title extends Component {
    constructor() {
        super();
        this.state = {
            movieInfo: [],
            movieReviews: [],
            movieCredits: [],
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
        let reviews;
        let otherReviews;

        if (this.state.movieReviews && this.state.movieReviews.length > 2) {
            const prevReviews = this.state.movieReviews.slice(0, 2);
            otherReviews = this.state.movieReviews.length - 2;
            reviews = prevReviews.map((review) => {
                return (
                    <Reviews
                        key={review.id}
                        author={review.author}
                        review={review}
                    />
                );
            });
        } else if (
            this.state.movieReviews &&
            this.state.movieReviews.length <= 2
        ) {
            reviews = this.state.movieReviews.map((review) => {
                return (
                    <Reviews
                        key={review.id}
                        author={review.author}
                        review={review}
                    />
                );
            });
        }

        return (
            <>
                <Navbar />
                <div className="movie-details-wrapper">
                    <div className="movie-details-title">
                        <h1>{this.state.movieInfo.title}</h1>
                    </div>
                    <img
                        className="movie-details-backdrop"
                        src={`${BASE_BACKDROP_PATH}${this.state.movieInfo.backdrop_path}`}
                        alt="movie background"
                    />
                    <div className="movie-details-poster-wrapper">
                        <img
                            className="movie-details-poster"
                            src={`${BASE_POSTER_PATH}/w500${this.state.movieInfo.poster_path}`}
                            alt="movie poster"
                        />
                        <div className="movie-details-info">
                            <div>
                                <strong>Movie Overview:</strong>{' '}
                                {this.state.movieInfo.overview}
                            </div>
                            <div>
                                <strong>Release Date:</strong>{' '}
                                {this.state.movieInfo.release_date}
                            </div>
                            <div>
                                <strong>Average Rating:</strong>{' '}
                                {this.state.movieInfo.vote_average}
                            </div>
                            <div className="movie-details-cast">
                                <Cast data={this.state.movieCredits.cast} />
                            </div>
                        </div>
                        {reviews && reviews.length > 0 && (
                            <div className="movie-details-reviews">
                                <strong>Reviews:</strong>
                                {reviews}
                                {otherReviews && (
                                    <p>
                                        {otherReviews} additional
                                        {otherReviews === 1
                                            ? ' review'
                                            : ' reviews'}{' '}
                                        not shown here
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default Title;
