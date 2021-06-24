// search everything 

// ya da her s*ki ara?
// https://api.themoviedb.org/3/search/multi?api_key=4d4ed145d3584846f5922b6a467e1f85&language=en-US&query=benedict&page=1&include_adult=false

//search query lerini anonim ya da user id ile kaydet searchs olarak filan

import axios from '../config/axios'
import {
  API_KEY,
  BASE_URL_PATH
} from '../config'

export const searchMovies = async (squery) => {
  try {
    const response = await 	axios.get(`${BASE_URL_PATH}search/movie?api_key=${API_KEY}&language=en-US&query=${squery}&page=1&include_adult=false`)
    return response.data.results
  } catch (err) {
    console.error(`Something went wrong fetching the genres: ${err}`)
    throw err
  }
}
