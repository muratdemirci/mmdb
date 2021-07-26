import React, { useState } from 'react'
import { stringToSlug } from '../../support/slugify'
import { useHistory } from 'react-router-dom'

import './style.css'

const Filmography = ({ data }) => {
  const [toggledDates, setToggledDates] = useState(new Set())
  const history = useHistory()

  const toggle = (date) => {
    const toggledDatesCopy = new Set([...toggledDates])
    if (toggledDatesCopy.has(date)) {
      toggledDatesCopy.delete(date)
    } else {
      toggledDatesCopy.add(date)
    }
    setToggledDates(toggledDatesCopy)
  }

  const handleClick = (movie) => {
    const movieName = stringToSlug(movie.title || movie.original_name)
    history.push(`/title/${movie.id}-${movieName}`)
    window.location.reload()
  }

  const Row = ({ data }) => {
    return <Col data={data} />
  }

  const Cell = (props) => {
    return (
      <li className="m3-text-white">
        <span
          className="m3-text-orange"
          title={props.title}
          style={{ cursor: 'pointer' }}
          onClick={() => handleClick(props)}
        >
          {props.title}
        </span>{' '}
        as <span className="m3-text-khaki">{props.character}</span>
      </li>
    )
  }

  const Col = (props) => {
    const movies = props.data
    const movieList = movies.map((movie) => (
      <Cell
        id={movie.id}
        title={movie.original_title}
        character={movie.character}
        key={movie.id}
      />
    ))
    return (
      <div>
        <ul>{movieList}</ul>
      </div>
    )
  }

  return (
    <div>
      <h2 className="m3-text-amber">{data.title}</h2>
      {Object.keys(data.chunk)
        .reverse()
        .map(function (date) {
          return (
            <div key={date}>
              <h3 className="m3-text-teal" onClick={() => toggle(date)}>
                {' '}
                {`👉 ${date || 'Unreleased'}`}
              </h3>
              {toggledDates.has(date) && <Row data={data.chunk[date]} />}
            </div>
          )
        })}
    </div>
  )
}

export default Filmography
