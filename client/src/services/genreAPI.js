import axios from '../config/axios'
import { API_KEY, BASE_URL_PATH } from '../config'

// TODO: add follow to the genre endpoint

export const getAllGenres = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL_PATH}genre/movie/list?api_key=${API_KEY}&language=en-US`
    )
    return response.data.genres
  } catch (err) {
    console.error(`Something went wrong fetching the genres: ${err}`)
    throw err
  }
}

export const getMoviesByGenre = async (genreId) => {
  try {
    const response = await axios.get(
      `${BASE_URL_PATH}discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&include_adult=false&include_video=false`
    )
    return response.data
  } catch (err) {
    console.error(
      `Something went wrong fetching the getting movies by genres: ${err}`
    )
    throw err
  }
}
