import React, { useEffect, useState } from 'react'
import Searchbar from '../components/Searchbar'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

function Navbar () {
  const [show, handleShow] = useState(false)
  
  const user = cookies.get('email')

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        handleShow(true)
      } else handleShow(false)
    })
    return () => {
      window.removeEventListener('scroll', handleShow())
      // it might be cause a memory leak, check this later.
    }
  }, [])

  if (cookies.get('loggedIn') && user) {
    return (
      <div className={`navbar ${show && 'navbar__black'}`}>
        <img
          loading='lazy'
          className='navbar__logo'
          src={require('../assets/img/MMDB_Logo_2021.svg')}
          title='MMDB'
          onClick={(e) => {
            e.preventDefault()
            window.location.href = '/'
          }}
          alt='mmdb logo'
        />
        <Searchbar />
        <div className="navbar__info">
          <img
              loading='lazy'
              className='navbar__avatar'
              src={require('../assets/img/Missing_avatar.svg')}
              alt='missing avatar'
          />
          <h4 className='navbar__userInfo'> {user} </h4>
        </div>
      </div>
    )
  } else {
    return (
      <div className={`navbar ${show && 'navbar__black'}`}>
        <img
          loading='lazy'
          className='navbar__logo'
          src={require('../assets/img/MMDB_Logo_2021.svg')}
          title='MMDB'
          onClick={(e) => {
            e.preventDefault()
            window.location.href = '/'
          }}
          alt='mmdb logo'
        />

        <Searchbar />

        <div className='navbar__signin'>
          <button
            className='signin__button'
            onClick={(e) => {
              e.preventDefault()
              window.location.href = '/signin'
            }}
          >
            Sign in
          </button>
        </div>
      </div>
    )
  }
}

export default Navbar
