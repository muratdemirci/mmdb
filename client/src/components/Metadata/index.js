import React from 'react'
import { Helmet } from 'react-helmet'

function Metadata(props) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>
        {props.title
          ? `${props?.title} | Murat Movie Database`
          : 'Murat Movie Database'}
      </title>
    </Helmet>
  )
}

export default Metadata
