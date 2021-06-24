import React, { Component } from 'react'
import './style.css'
import { searchMovies } from '../../services/userAPI'
import { BASE_BACKDROP_PATH, BASE_POSTER_PATH } from '../../config'

class Searchbar extends Component {
	constructor () {
    super()
    this.state = {
			squery: '',
      search_results: []
    }
  }
	
	handleSearch = async (squery) => {
		this.setState({
			squery: squery
		});
		// search all, titles, celebs tv episodes
		if (squery.length > 3) {
			const result = await searchMovies(squery)
			this.setState({
				search_results: result
			})
			console.log(result)
		} else {
			this.setState({
				search_results: []
			});
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
			<SearchResults addResult={this.addResult} searchResults={this.state.search_results}/>
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
		// it doesn't work! f*ck!
  }
	return (
		<div className="searchResults">
			<ul>{(props.searchResults).map(function(result,key){
					return(<SearchResult 
						addResult={props.addResult} 
						key={key} 
						title={result.title} 
						movieDate={result.release_date} 
						movieImg={`${BASE_BACKDROP_PATH}${result?.backdrop_path}` || `${BASE_POSTER_PATH}${result?.poster_path}`} 
						onError={addDefaultSrc}
						/>)
				})}
			</ul>
		</div>
	)
}

class SearchResult extends Component {
	addResult = (i) => {
		this.props.addResult(i)
	}

	moveit = (i) => {
		console.log(i)
	}
	
  render() {
		return (<li onClick={this.moveit.bind(null,this.props)}>
			<img 
			title={this.props.title}
			alt={this.props.title}
			className="search-image"
			src={this.props.movieImg} width="50px" />{` ${this.props.title} (${this.props.movieDate.split('-')[0]})`}</li>)
  }
}

export default Searchbar