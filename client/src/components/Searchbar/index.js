import React, { Component, useState } from 'react'
import './style.css'
import { searchEverything } from '../../services/userAPI'
import { BASE_BACKDROP_PATH, BASE_POSTER_PATH } from '../../config'
import { string_to_slug } from '../../support/slugify'


//make responsive searchbar input damn it
class Searchbar extends Component {
	constructor () {
    super()
    this.state = {
			squery: '',
      search_results: [],
			showSearchResults: false
    }	
  }

	handleSearch = async (squery) => {
		this.setState({
			squery: squery
		});
		// search all, titles, celebs tv episodes
		if (squery.length > 3) {
			const result = await searchEverything(squery)
			this.setState({
				search_results: result,
				showSearchResults: true
			})
			console.log(this.state.showSearchResults)
		} else {
			this.setState({
				search_results: [],
				showSearchResults: false
			})
		}
	}

	addResult = () => {
		this.setState({
			search_results: [],
			squery: ''
		})
	}

  render() {
		return (
			<div className="Searchbar">
			<Search handleSearch={this.handleSearch} squery={this.state.squery}/>
			{ this.state.showSearchResults && <SearchResults addResult={this.addResult} searchResults={this.state.search_results}/> }			
		 </div>
    )
  }
}

class Search extends Component {
	handleSearch = (e) => {
		this.props.handleSearch(e.target.value)
	}

  render() {
		return (<input type="text" value={this.props.squery} onChange={this.handleSearch} placeholder="Type a movie name to search" className="searchBar" />)
  }
}

function SearchResults(props) {
  const addDefaultSrc = (e) => {
    e.target.src = require('../../assets/img/poster-placeholder.png')
		//it's useless dude (-_-) TODO: fix this garbage
  }
	return (
		<div className="searchResults">
			<ul>{(props.searchResults).map(function(result,key){
					if (result.media_type === 'movie') {
						return(
							// return movies
							<SearchResult 
								addResult={props.addResult}
								media_type={result.media_type}  
								key={key} 
								title={result.title}
								id={result.id} 
								movieDate={result.release_date} 
								movieImg={`${BASE_BACKDROP_PATH}${result?.poster_path}` || `${BASE_POSTER_PATH}${result?.backdrop_path}`} 
								onError={addDefaultSrc}
								/>
						)
					}else if (result.media_type === 'tv') {
						return(
							// return tv series
							<SearchResult 
								addResult={props.addResult}
								media_type={result.media_type}  
								key={key} 
								title={result.name}
								id={result.id}
								movieDate={result.first_air_date} 
								movieImg={`${BASE_BACKDROP_PATH}${result?.poster_path}` || `${BASE_POSTER_PATH}${result?.backdrop_path}`} 
								onError={addDefaultSrc}
								/>
						)
					}else{
						// return person
						return(
						<SearchResult 
							addResult={props.addResult}
							media_type={result.media_type} 
							key={key} 
							title={result.name}
							id={result.id}
							movieImg={`${BASE_BACKDROP_PATH}${result?.profile_path}`}					
							onError={addDefaultSrc}
							/>
						)
					}

				})}
			</ul>
		</div>
	)
}

class SearchResult extends Component {
	addResult = (i) => {
		this.props.addResult(i)
	}

	moveit = (searchResult) => {
		const contentName = string_to_slug(searchResult.title || searchResult.original_name)
		if (searchResult.media_type === 'person') {
			window.location.replace(`/name/${searchResult.id}-${contentName}`)
		}else{
			window.location.replace(`/title/${searchResult.id}-${contentName}`)
		}
	}
	
  render() {

		if (this.props.media_type === 'movie' || this.props.media_type === 'tv') {
			return (
				<li onClick={this.moveit.bind(null,this.props)}>
				<img 
				title={this.props.title}
				alt={this.props.title}
				className="search-image"
				onError={this.addDefaultSrc}
				src={this.props.movieImg} width="50px" />{` ${this.props.title} (${this.props.movieDate.split('-')[0]})`}
				</li>
			)
		}else{
			return (
				<li onClick={this.moveit.bind(null,this.props)}>
					<img 
					title={this.props.title}
					alt={this.props.title}
					className="search-image"
					onError={this.addDefaultSrc}
					src={this.props.movieImg} width="50px" />{` ${this.props.title}`}
					</li>
			)
		}
	}
}

export default Searchbar