// search everything and save search queries
import axios from '../config/axios'
import { API_KEY, BASE_URL_PATH } from '../config'

export const searchEverything = async (squery) => {
  try {
    const response = await axios.get(
      `${BASE_URL_PATH}search/multi?api_key=${API_KEY}&language=en-US&query=${squery}&page=1&include_adult=false`
    )
    // response deconstruct ....
    return response.data.results
  } catch (err) {
    console.error(`Something went wrong fetching the multi results: ${err}`)
    throw err
  }
}
