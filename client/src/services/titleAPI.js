import axios from '../config/axios'
import {
  API_KEY,
  BASE_MOVIE_PATH,
  SEARCH_MOVIE_PATH,
  BASE_URL_PATH,
} from '../config'

export let genres = []

export const getAllGenres = async () => {
  if (genres.length) {
    return genres
  }

  try {
    const response = await axios.get(
      `${BASE_URL_PATH}genre/movie/list?api_key=${API_KEY}`
    )
    genres = response.data.genres
    return genres
  } catch (err) {
    console.error(`Something went wrong fetching the all genres: ${err}`)
    throw err
  }
}

export const getMoviesByGenre = async (genreId) => {
  try {
    const response = await axios.get(
      `${BASE_URL_PATH}discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
    )
    return response.data.results
  } catch (err) {
    console.error(`Something went wrong fetching the movies genres: ${err}`)
    throw err
  }
}

export const getNowPlayingMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_MOVIE_PATH}now_playing?api_key=${API_KEY}`
    )
    return response.data.results
  } catch (err) {
    console.error(`Something went wrong fetching the now playing data: ${err}`)
    throw err
  }
}

export const getUpcomingMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_MOVIE_PATH}upcoming?api_key=${API_KEY}`
    )
    return response.data.results
  } catch (err) {
    console.error(`Something went wrong fetching the upcoming movies: ${err}`)
    throw err
  }
}

export const getTrendingMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL_PATH}trending/all/week?api_key=${API_KEY}&language=en-US`
    )
    return response.data.results
  } catch (err) {
    console.error(`Something went wrong fetching the trending movies: ${err}`)
    throw err
  }
}

export const getTopRatedMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_MOVIE_PATH}top_rated?api_key=${API_KEY}&language=en-US`
    )
    return response.data.results
  } catch (err) {
    console.error(`Something went wrong fetching the toprated movies: ${err}`)
    throw err
  }
}

export const getMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(
      `${BASE_MOVIE_PATH}${movieId}/reviews?api_key=${API_KEY}`
    )
    return response.data.results
  } catch (err) {
    console.error(`There was a problem finding titles: ${err}`)
    throw err
  }
}

export const searchMovies = async (searchInput) => {
  try {
    const response = await axios.get(
      `${SEARCH_MOVIE_PATH}?query=${searchInput}&api_key=${API_KEY}`
    )
    return response.data.results
  } catch (err) {
    console.error(`There was a problem finding titles: ${err}`)
    throw err
  }
}

export const getMovieDetailsById = async (movieId) => {
  try {
    const response = await axios.get(
      `${BASE_MOVIE_PATH}${movieId}?api_key=${API_KEY}`
    )
    return response.data
  } catch (err) {
    console.error(
      `There was a problem finding the details of this title: ${err}`
    )
    throw err
  }
}

export const getMovieCreditsById = async (movieId) => {
  try {
    const response = await axios.get(
      `${BASE_MOVIE_PATH}${movieId}/credits?api_key=${API_KEY}`
    )
    return response.data
  } catch (err) {
    console.error(
      `There was a problem finding the credits of this title: ${err}`
    )
    throw err
  }
}

export const getSimilarMovies = async (movieId) => {
  try {
    const response = await axios.get(
      `${BASE_MOVIE_PATH}${movieId}/similar?api_key=${API_KEY}`
    )
    return response.data.results
  } catch (err) {
    console.error(`There was a problem finding the similar movies: ${err}`)
    throw err
  }
}
