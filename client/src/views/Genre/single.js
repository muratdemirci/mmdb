import React, { Component } from 'react'
import Navbar from '../../partials/Navbar'
import Metadata from '../../components/Metadata'
import '../../assets/css/App.css'
import Row from '../../partials/Row'
import Banner from '../../partials/Banner'

class Genre extends Component {
  render() {
    return (
      <>
        <Metadata title="Popular Genres" />
        <Navbar />
        <Banner />
        <Row
          title="Trending Now"
          genre={this.props.match.params.id}
          isLargeRow
        />
        <Row title="Now Playing" genre="now-playing" isLargeRow />
        <Row title="Upcoming Movies" genre="upcoming" isLargeRow />
        <Row title="Top Rated Movies" genre="top-rated" isLargeRow />
        <Row title="Action Movies" genre={28} isLargeRow />
        <Row title="Comedy Movies" genre={35} isLargeRow />
        <Row title="Romance Movies" genre={10749} isLargeRow />
        <Row title="Horror Movies" genre={27} isLargeRow />
        <Row title="Documentaries" genre={99} isLargeRow />
      </>
    )
  }
}

export default Genre
