import React, { Component } from 'react'
import { BEST_TV_POSTER_PATH, BASE_BACKDROP_PATH } from '../../config'
import Navbar from '../../partials/Navbar'
import { getAge } from '../../support/time'
import Metadata from '../../components/Metadata'
import ReadMore from '../../components/Readmore'
import MasonryGrid from '../../components/MasonryGrid'
import Filmography from '../../components/Filmography'
import SocialMediaButtons from '../../components/SocialMediaButtons'

import {
  getPersonDetails,
  getPersonCombinedCredits,
  getSocialMediaAccounts,
  getPersonTaggedImages,
  getPersonKnownFor,
  getPersonFilmography
} from '../../services/nameAPI'
import '../../assets/css/SinglePage.css'
import './style.css'
class Name extends Component {
  constructor () {
    super()
    this.state = {
      personInfo: [],
      personCombinedCredits: [],
      personSocialMediaAccounts: [],
      personTaggedImages: [],
      personKnownFor: [],
      personFilmography: {},
      loading: true,
      error: false
    }
  }

  componentDidMount () {
    const handleStates = async () => {
      const personInfo = await getPersonDetails(
        this.props.match.params.id
      )
      const personCombinedCredits = await getPersonCombinedCredits(
        this.props.match.params.id
      )
      const personSocialMediaAccounts = await getSocialMediaAccounts(
        this.props.match.params.id
      )
      const personTaggedImages = await getPersonTaggedImages(
        this.props.match.params.id
      )
      const personKnownFor = await getPersonKnownFor(
        this.props.match.params.id, 5
      )
      const personFilmography = await getPersonFilmography(
        this.props.match.params.id
      )

      personKnownFor.forEach(obj => obj.image_path = `${BASE_BACKDROP_PATH}${obj?.poster_path}`)

      this.setState({
        loading: false,
        personInfo,
        personCombinedCredits,
        personSocialMediaAccounts,
        personTaggedImages,
        personKnownFor,
        personFilmography
      })

      // TODO: print tagged images as a background image with low opacity

      // console.log(personKnownFor)
    }
    handleStates()
  }

  render () {
    const addDefaultSrc = (e) => {
      e.target.src = require('../../assets/img/profile-placeholder.png')
    }

    return (
      <>
        <Metadata title={this.state.personInfo.name} />
        <Navbar />
        <div className='m3-content m3-margin-top' style={{ maxWidth: '1400px' }}>
          <div className='m3-row-padding' style={{ marginTop: '80px' }}>
            <div className='m3-third'>
              <div className='m3-card-4' style={{ backgroundColor: 'rgb(3 150 136 / 17%)' }}>
                <div className='m3-display-container'>
                  <img
                    onError={addDefaultSrc}
                    src={`${BEST_TV_POSTER_PATH}${this.state.personInfo.profile_path}`}
                    style={{ width: '100%' }}
                    alt={this.state.personInfo.name}
                  />
                  <div className='m3-container'>
                    <h2 className='m3-text-indigo'>{this.state.personInfo.name} {`(${getAge(this.state.personInfo.birthday)})`}</h2>
                  </div>
                </div>
                <div className='m3-container'>
                  <SocialMediaButtons data={this.state.personSocialMediaAccounts} />
                  <br />
                </div>
              </div><br />
            </div>
            <div className='m3-twothird'>
              <h2 className='m3-text-amber m3-padding-16'>Biography</h2>
              <div className='m3-container'>
                <ReadMore textClass='m3-text-white'>{this.state.personInfo.biography}</ReadMore>
              </div>
              <MasonryGrid data={{ title: 'Known For', chunk: this.state.personKnownFor, maxwidth: ['92px', '154px'], maxheight: ['192px', '254px'] }} />
              <Filmography data={{ title: this.state.personInfo.known_for_department, chunk: this.state.personFilmography }} />{' '}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Name
