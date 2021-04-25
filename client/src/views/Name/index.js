import React, {Component} from 'react';
import {BEST_TV_POSTER_PATH, BASE_POSTER_PATH} from '../../config';
import Navbar from '../../partials/Navbar';
import Metadata from '../../components/Metadata';
import ReadMore from '../../components/Readmore';
import MasonryGrid from '../../components/MasonryGrid';

import {
    getPersonDetails,
    getPersonCombinedCredits,
    getSocialMediaAccounts,
    getPersonTaggedImages,
    getPersonKnownFor
} from '../../services/nameAPI';
import '../../assets/css/SinglePage.css';
class Name extends Component {
    constructor() {
        super();
        this.state = {
            personInfo: [],
            personCombinedCredits: [],
            personSocialMediaAccounts: [],
            personTaggedImages: [],
            personKnownFor: [],
            loading: true,
            error: false,
        };
    }

    componentDidMount() {
        const handleStates = async () => {
            const personInfo = await getPersonDetails(
                this.props.match.params.id,
            );
            const personCombinedCredits = await getPersonCombinedCredits(
                this.props.match.params.id,
            );
            const personSocialMediaAccounts = await getSocialMediaAccounts(
                this.props.match.params.id,
            );
            const personTaggedImages = await getPersonTaggedImages(
                this.props.match.params.id,
            );
            const personKnownFor = await getPersonKnownFor(
                this.props.match.params.id, 5
            );            
            this.setState({
                loading: false,
                personInfo,
                personCombinedCredits,
                personSocialMediaAccounts,
                personTaggedImages,
                personKnownFor
            });
        };
        handleStates();
    }
    
    render() {
        return (
            <>
                <Metadata title={this.state.personInfo.name} />
                <Navbar />
                <div className="m3-content m3-margin-top" style={{maxWidth: "1400px"}}>
                <div className="m3-row-padding" style={{marginTop: "80px"}}>
                    <div className="m3-third">
                    <div className="m3-card-4">
                        <div className="m3-display-container">
                        <img 
                        src={`${BEST_TV_POSTER_PATH}${this.state.personInfo.profile_path}`}
                        style={{width: "100%"}} 
                        alt={this.state.personInfo.name} />
                        <div className="m3-display-bottomleft m3-container">
                            <h2 className="m3-text-indigo">{this.state.personInfo.name}</h2>
                        </div>
                        </div>
                        <div className="m3-container">
                        <h5>Personal Info</h5>
                        <p><i className="m3-margin-right m3-large m3-text-teal"></i>Designer</p>
                        <p><i className="m3-margin-right m3-large m3-text-teal"></i>London, UK</p>
                        <p><i className="m3-margin-right m3-large m3-text-teal"></i>ex@mail.com</p>
                        <p><i className="m3-margin-right m3-large m3-text-teal"></i>1224435534</p>

                        <p className="m3-large"><b><i className="m3-margin-right m3-text-teal"></i>Skills</b></p>
                        <br/>
                        </div>
                    </div><br/>
                    </div>
                    <div className="m3-twothird">
                    <h2 className="m3-text-amber m3-padding-16">Biography</h2>
                        <div className="m3-container">
                            <ReadMore textClass={'m3-text-white'}>{this.state.personInfo.biography}</ReadMore>
                        </div>
                    <MasonryGrid data={{title: 'Known For', imagePath: BASE_POSTER_PATH, chunk: this.state.personKnownFor}} />
                    </div>
                </div>
                </div>
            </>
        );
    }
}

export default Name;

// born date and deathday view
// name
// gender 1 = actress, gender 2 actor
// profile image
// biography
// photos
// known for, movies
// Filmography
// Awards