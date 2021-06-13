import axios from '../config/axios'
import {
  API_KEY,
  BASE_URL_PATH
} from '../config'

// TODO: add follow to the name endpoint

export const getPersonDetails = async (nameId) => {
  try {
    const response = await axios.get(
			`${BASE_URL_PATH}person/${nameId}?api_key=${API_KEY}&language=en-US`
    )
    // console.log(response.data)
    return response.data
  } catch (err) {
    console.error(
				`Something went wrong fetching the person's details: ${err}`
    )
    throw err
  }
}

export const getPersonCombinedCredits = async (nameId) => {
  try {
    const response = await axios.get(
			`${BASE_URL_PATH}/person/${nameId}/combined_credits?api_key=${API_KEY}&language=en-US`
    )
    // console.log(response.data)
    return response.data
  } catch (err) {
    console.error(
				`Something went wrong fetching the person's movie credits: ${err}`
    )
    throw err
  }
}

export const getPersonFilmography = async (nameId) => {
  try {
    const response = await axios.get(
			`${BASE_URL_PATH}/person/${nameId}/combined_credits?api_key=${API_KEY}&language=en-US`
    )

    const rdSorted = [...response.data.cast, ...response.data.crew].sort((a, b) => {
      const dateA = new Date(a.release_date); const dateB = new Date(b.release_date)
      return dateB - dateA
    })

    const result = rdSorted.reduce(function (r, a) {
      if (a.release_date === undefined || !a.character || a.character.length === 0) {
        return r
      }
      const rdshort = a.release_date.substr(0, 4)
      if (r[rdshort] === undefined) {
        r[rdshort] = [a]
      } else {
        r[rdshort].push(a)
      }
      return r
    }, {})

    return result
  } catch (err) {
    console.error(
				`Something went wrong fetching the person's filmography: ${err}`
    )
    throw err
  }
}

export const getPersonKnownFor = async (nameId, limit) => {
  try {
    const response = await axios.get(
			`${BASE_URL_PATH}/person/${nameId}/combined_credits?api_key=${API_KEY}&language=en-US`
    )
    const knownFor = [...response.data.cast, ...response.data.crew].sort((a, b) => { return b.vote_average - a.vote_average })
    return knownFor.slice(0, limit || 3)
  } catch (err) {
    console.error(
				`Something went wrong fetching the person's known for: ${err}`
    )
    throw err
  }
}

export const getSocialMediaAccounts = async (nameId) => {
  try {
    const response = await axios.get(
			`${BASE_URL_PATH}/person/${nameId}/external_ids?api_key=${API_KEY}&language=en-US`
    )
    // console.log(response.data)
    return response.data
  } catch (err) {
    console.error(
				`Something went wrong fetching the person's social media accounts: ${err}`
    )
    throw err
  }
}

export const getPersonTaggedImages = async (nameId) => {
  try {
    const response = await axios.get(
			`${BASE_URL_PATH}/person/${nameId}/tagged_images?api_key=${API_KEY}&language=en-US`
    )
    // console.log(response.data)
    return response.data
  } catch (err) {
    console.error(
				`Something went wrong fetching the person's tagged images: ${err}`
    )
    throw err
  }
}
