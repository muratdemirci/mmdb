import React, { useState, useEffect } from 'react'
import { POSTERURL } from '../config'
import { getUpcomingMovies } from '../services/titleAPI'
import { useHistory } from 'react-router-dom'
import { stringToSlug } from '../support/slugify'

function Banner() {
  const [movie, setMovie] = useState()
  const history = useHistory()
  useEffect(() => {
    async function fetchData() {
      const request = await getUpcomingMovies()
      setMovie(request[Math.floor(Math.random() * request.length - 1)])
      return request
    }
    fetchData()
  }, [])

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }

  const handleClick = (movie) => {
    const movieName = stringToSlug(movie.title || movie.original_name)
    history.push(`/title/${movie.id}-${movieName}`)
    window.location.reload()
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(${POSTERURL}${movie?.backdrop_path})`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {' '}
          {movie?.title || movie?.name || movie?.original_name}{' '}
        </h1>
        <div className="banner_buttons">
          <button className="banner__button" onClick={() => handleClick(movie)}>
            Quick peek
          </button>
          <button className="banner__button">Add to my list</button>
        </div>
        <h1 className="banner__description">
          {' '}
          {truncate(movie?.overview, 150)}{' '}
        </h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  )
}

export default Banner
