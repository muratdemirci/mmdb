import React, { useEffect, useState } from 'react'

function Navbar () {
  const [show, handleShow] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))

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

  if (localStorage.getItem('user')) {
    return (
      <div className={`navbar ${show && 'navbar__black'}`}>
        <img
          className='navbar__logo'
          src={require('../assets/img/MMDB_Logo_2021.svg')}
          title='MMDB'
          onClick={(e) => {
            e.preventDefault()
            window.location.href = '/'
          }}
          alt='mmdb logo'
        />

        <img
          className='navbar__avatar'
          src={require('../assets/img/Missing_avatar.svg')}
          alt='missing avatar'
        />
        <h4 className='navbar__userInfo'> {user.email} </h4>
      </div>
    )
  } else {
    return (
      <div className={`navbar ${show && 'navbar__black'}`}>
        <img
          className='navbar__logo'
          src={require('../assets/img/MMDB_Logo_2021.svg')}
          title='MMDB'
          onClick={(e) => {
            e.preventDefault()
            window.location.href = '/'
          }}
          alt='mmdb logo'
        />

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
