import React, {Component} from 'react';
import Navbar from '../../partials/Navbar';
import Metadata from '../../components/Metadata';
import {
    getPersonDetails,
    getPersonCombinedCredits,
    getSocialMediaAccounts,
    getPersonTaggedImages,
} from '../../services/nameAPI';

class Name extends Component {
    constructor() {
        super();
        this.state = {
            personInfo: [],
            personCombinedCredits: [],
            personSocialMediaAccounts: [],
            personTaggedImages: [],
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
            this.setState({
                loading: false,
                personInfo,
                personCombinedCredits,
                personSocialMediaAccounts,
                personTaggedImages
            });
        };
        handleStates();
    }
    render() {
        return (
            <>
                <Metadata title={this.state.personInfo.name} />
                <Navbar />
                <h1>sa</h1>
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