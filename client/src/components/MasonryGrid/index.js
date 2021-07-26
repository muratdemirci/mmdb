import React from 'react'
import './masonrygrid.css'
import { useHistory } from 'react-router-dom'
import { stringToSlug } from '../../support/slugify'

function MasonryGrid({ data }) {
  const history = useHistory()

  const handleClick = (item) => {
    if (Object.keys(item).length > 2) {
      const itemName = stringToSlug(item.title || item.original_name)
      history.push(`/title/${item.id}-${itemName}`)
      window.location.reload()
    } else {
      history.push(`/genres/browse/${item.id}`)
      window.location.reload()
    }
  }
  const addDefaultSrc = (e) => {
    e.target.src = require('../../assets/img/poster-placeholder.png')
  }

  const centeredStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }

  // follow button u filan

  return (
    <>
      <h2 className="m3-text-amber">{data.title}</h2>
      <div className="mg-container">
        {data.chunk.map((item) => (
          <div
            key={Math.floor(Math.random() * item.id)}
            className="grid-item"
            style={{
              maxWidth:
                data.maxwidth[Math.floor(Math.random() * data.maxwidth.length)],
              maxHeight:
                data.maxheight[
                  Math.floor(Math.random() * data.maxheight.length)
                ],
            }}
          >
            <div className="fig">
              {data.caption ? (
                <div className="centered" style={centeredStyle}>
                  <h2 className="m3-text-deep-purple">{item?.name}</h2>
                </div>
              ) : null}
              <img
                loading="lazy"
                src={`${item?.image_path}`}
                onError={addDefaultSrc}
                onClick={() => handleClick(item)}
                title={item.media?.original_title}
                alt={item.media?.original_title}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default MasonryGrid
