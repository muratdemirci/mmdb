import React from 'react'
import './assets/css/App.css'
import Row from './partials/Row'
import Banner from './partials/Banner'
import Navbar from './partials/Navbar'
import Metadata from './components/Metadata'
// it will be change for movie advices...
// if user logged in and liked somethings...
function App () {
  return (
    <div className='app'>
      <Metadata />
      <Navbar />
      <Banner />
      <Row title='Trending Now' genre='trending' isLargeRow />
      <Row title='Top Rated' genre='top-rated' />
      <Row title='Action Movies' genre={28} />
      <Row title='Comedy Movies' genre={35} />
      <Row title='Romance Movies' genre={10749} />
      <Row title='Horror Movies' genre={27} />
      <Row title='Documentaries' genre={99} />
    </div>
  )
}

export default App
