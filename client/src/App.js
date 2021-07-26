import React from 'react'
import './assets/css/App.css'
import Row from './partials/Row'
import Banner from './partials/Banner'
import Navbar from './partials/Navbar'
import Metadata from './components/Metadata'
// it will be change for movie advices...
// if user logged in and liked somethings...
function App() {
  return (
    <div className="app">
      <Metadata />
      <Navbar />
      <Banner />
      <Row title="Trending Now" genre="trending" isLargeRow />
      <Row title="Now Playing" genre="now-playing" isLargeRow />
      <Row title="Upcoming Movies" genre="upcoming" isLargeRow />
      <Row title="Top Rated Movies" genre="top-rated" isLargeRow />
      <Row title="Action Movies" genre={28} isLargeRow />
      <Row title="Comedy Movies" genre={35} isLargeRow />
      <Row title="Romance Movies" genre={10749} isLargeRow />
      <Row title="Horror Movies" genre={27} isLargeRow />
      <Row title="Documentaries" genre={99} isLargeRow />
    </div>
  )
}

export default App
