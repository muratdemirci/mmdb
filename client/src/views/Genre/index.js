import React, { Component } from 'react'
// import { BEST_TV_POSTER_PATH, BASE_POSTER_PATH } from '../../config'
import { getAllGenres } from '../../services/genreAPI'
import Navbar from '../../partials/Navbar'
import MasonryGrid from '../../components/MasonryGrid'
import Metadata from '../../components/Metadata'

class Genres extends Component {
  constructor () {
    super()
    this.state = {
      genres: []
    }
  }

  componentDidMount () {
    const handleStates = async () => {
      const allGenres = await getAllGenres()
      this.setState({
        loading: false,
        genres: allGenres
      })
    }
    handleStates()
  }

  render () {
    return (
      <>
        <div style={{ marginTop: '50px' }}>
          <Metadata title='Popular Genres' />
          <Navbar />
          <div>
            <MasonryGrid data={{ title: '', chunk: this.state.genres, maxwidth: ['200px'], maxheight: ['200px'], caption: true }} />
          </div>
        </div>
      </>
    )
  }
}

export default Genres
