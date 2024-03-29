import React, { Component } from 'react'
import Metadata from '../../components/Metadata'
import Navbar from '../../partials/Navbar'
import { time_convert_h_min } from '../../support/time'
import { BASE_BACKDROP_PATH, BASE_POSTER_PATH } from '../../config'
import {
  getMovieCreditsById,
  getMovieDetailsById,
  getSimilarMovies,
} from '../../services/titleAPI'
import Cast from '../../components/Cast'
import Trailer from '../../components/Trailer'
import Row from '../../partials/Row'
import './style.css'

class Title extends Component {
  constructor() {
    super()
    this.state = {
      movieInfo: [],
      movieReviews: [],
      movieCredits: [],
      movieGenres: [],
      loading: true,
      error: false,
    }
  }

  componentDidMount() {
    const handleStates = async () => {
      const movieInfo = await getMovieDetailsById(this.props.match.params.id)
      const movieCredits = await getMovieCreditsById(this.props.match.params.id)
      const similarMovies = await getSimilarMovies(this.props.match.params.id)
      this.setState({
        loading: false,
        movieInfo,
        movieCredits,
        similarMovies,
      })
    }
    handleStates()
  }

  render() {
    const releaseDate = this.state.movieInfo.release_date
      ? this.state.movieInfo.release_date.substring(0, 4)
      : ''

    if (!this.state.loading) {
      return (
        <>
          <Metadata title={`${this.state.movieInfo.title} (${releaseDate})`} />
          <Navbar />
          <div className="movie-details-wrapper">
            <div className="movie-details-title">
              <h1>
                {this.state.movieInfo.title} {`(${releaseDate})`}
              </h1>
            </div>
            <img
              loading="lazy"
              className="movie-details-backdrop"
              src={`${BASE_BACKDROP_PATH}${this.state.movieInfo.backdrop_path}`}
              alt="movie background"
            />
            <div className="movie-details-poster-wrapper">
              <img
                loading="lazy"
                src={`${BASE_POSTER_PATH}w500${this.state.movieInfo.poster_path}`}
                alt="movie poster"
                style={{ height: '90%' }}
              />
              <div className="movie-details-info">
                <div>
                  <p>{this.state.movieInfo.overview}</p>
                </div>
                <div>
                  <span role="img" aria-label="star">
                    ⭐
                  </span>
                  {this.state.movieInfo.vote_average}/10 |
                  {time_convert_h_min(this.state.movieInfo.runtime)} |{' '}
                  {(this.state.movieInfo.genres || []).map((genre, index) => (
                    <span key={genre.id} className="movie-genre">
                      <a href={`/genres/${genre.id}`} title={genre.name}>
                        {(index ? ',' : '') + genre.name}
                      </a>
                    </span>
                  ))}{' '}
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
                <div className="related-movies">
                  <Row
                    title="More Like This"
                    genre="similar"
                    movieId={this.props.match.params.id}
                    isLargeRow
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )
    } else {
      return (
        <>
          <Navbar />
          <div>
            <h1>Loading...</h1>
          </div>
        </>
      )
    }
  }
}

export default Title
