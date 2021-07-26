import React, { Component } from 'react'
import { getVisitorData } from '../../support/fingerprints'

class Agent extends Component {
  constructor() {
    super()
    this.state = { data: [] }
  }

  async componentDidMount() {
    const visitor = await getVisitorData()
    await console.log(visitor)
    await console.log(window.location.href)
  }

  render() {
    return <div></div>
  }
}

export default Agent
