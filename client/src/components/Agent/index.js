import React, { Component } from 'react'
import { LOCAL_API_URL } from '../../config'
import { getVisitorData } from '../../support/fingerprints'
import axios from '../../config/axios'

class Agent extends Component {
  constructor() {
    super()
    this.state = { data: [] }
  }

  async componentDidMount() {
    const visitor = await getVisitorData()

    try {
      const response = await axios.post(
        `${LOCAL_API_URL}/interests/crawl`,{
          fingerPrint: visitor.visitorId,
          urlPaths: [
            {
              type: window.location.href.split('/').slice(-2)[0],
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
