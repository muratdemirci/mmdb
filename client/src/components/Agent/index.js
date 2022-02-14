import React, { Component } from 'react'
import { LOCAL_API_URL } from '../../config'
import { getVisitorData } from '../../support/fingerprints'
import { findGenreById } from '../../services/genreAPI'
import axios from '../../config/axios'

class Agent extends Component {
  constructor() {
    super()
    this.state = { data: [] }
  }

  async componentDidMount() {
    const visitor = await getVisitorData()

    const findUrlType = () => {
      const urlParam = window.location.href.split('/').slice(-2)[0]
      if (urlParam === 'genres') {
        const genre = findGenreById(window.location.href.split('/').slice(-1)[0])
        return genre
      } else {
        return window.location.href.split('/').slice(-2)[0]
      }
    }

    try {
      const urlType = await findUrlType()
      const urlTypeName = urlType.name
      const response = await axios.post(
        `${LOCAL_API_URL}/interests/crawl`, {
        fingerPrint: visitor.visitorId,
        urlPaths: [
          {
            type: urlTypeName,
            path: window.location.href
          }
        ]
      }
      )

      return response.data.results
    } catch (err) {
      console.error(`Something went wrong fetching the multi results: ${err}`)
      throw err
    }

  }

  render() {
    return '';
  }
}

export default Agent
