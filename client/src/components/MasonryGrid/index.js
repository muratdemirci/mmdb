import React from 'react'
import './masonrygrid.css'
import { useHistory } from 'react-router-dom'
import { string_to_slug } from '../../support/slugify'

function MasonryGrid ({ data }) {
  const history = useHistory()

  const handleClick = (item) => {
    const itemName = string_to_slug(item.title || item.original_name)
    history.push(`/title/${item.id}-${itemName}`)
    window.location.reload()
  }
  const addDefaultSrc = (e) => {
    e.target.src = require('../../assets/img/poster-placeholder.png')
  }
  return (
    <>
      <h2 className='m3-text-amber'>{data.title}</h2>
      <div className='mg-container'>
        {data.chunk.map((item) => (
          <div key={item.id} className='grid-item' style={{ maxWidth: ['92px', '154px'][Math.floor(Math.random() * 2)], maxHeight: ['192px', '254px'][Math.floor(Math.random() * 2)] }}>
            <div className='fig'>
              <img
                src={`${data.imagePath}original${item?.poster_path}`}
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
