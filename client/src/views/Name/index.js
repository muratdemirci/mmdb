import React, {Component} from 'react';
import Navbar from '../../partials/Navbar';
import {
    getPersonDetails,
} from '../../services/nameAPI';

class Name extends Component {
    constructor() {
        super();
        this.state = {
            personInfo: [],
            loading: true,
            error: false,
        };
    }

    componentDidMount() {
        const handleStates = async () => {
            const personInfo = await getPersonDetails(
                this.props.match.params.id,
            );
            this.setState({
                loading: false,
                personInfo,
            });
        };
        handleStates();
        console.log(this.props)
    }
    render() {
        return (
            <>
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
// 


// https://api.themoviedb.org/3/person/1892?api_key=4d4ed145d3584846f5922b6a467e1f85&language=en-US

// {
//     "birthday": "1970-10-08",
//     "known_for_department": "Acting",
//     "deathday": null,
//     "id": 1892,
//     "name": "Matt Damon",
//     "also_known_as": [
//       "马特·达蒙",
//       "Мэтт Дэймон",
//       "Мэтт Деймон",
//       "แม็ตต์ เดม่อน",
//       "マット・デイモン",
//       "맷 데이먼",
//       "مات ديمون",
//       "Метт Деймон",
//       "Метью Пейдж Деймон",
//       "מאט דיימון",
//       "Dickie Greenleaf",
//       "Ματ Ντέιμον",
//       "Matthew Paige Damon"
//     ],
//     "gender": 2,
//     "biography": "Matthew Paige Damon (born October 8, 1970) is an American actor, film producer, screenwriter, and environmentalist. He is ranked among Forbes magazine's most bankable stars and is one of the highest-grossing actors of all time. Damon has received various accolades, including an Academy Award from five nominations, two Golden Globe Awards from eight nominations, and has been nominated for three British Academy Film Awards and seven Emmy Awards.\n\nBorn and raised in Cambridge, Massachusetts, Damon began his acting career by appearing in high school theater productions. He made his professional acting debut in the film Mystic Pizza (1988). He came to prominence in 1997, when he wrote and starred in Good Will Hunting, alongside Ben Affleck, which won them the Academy and Golden Globe awards for Best Screenplay and earned Damon a nomination for the Academy Award for Best Actor. He continued to garner praise from critics for his roles as the eponymous character in Saving Private Ryan (1998), the antihero in The Talented Mr. Ripley (1999), a fallen angel in Dogma (1999) and Jay and Silent Bob Reboot (2019), an energy analyst in Syriana (2005), and a corrupt Irish-American police officer in The Departed (2006). In 2019 he starred as race car driver and designer Carroll Shelby in James Mangold's Ford v Ferrari.\n\nDamon is also known for his starring roles as Jason Bourne in the Bourne franchise (2002–2016) and as a con man in the Ocean's trilogy (2001–2007). For his supporting role as the rugby player Francois Pienaar in Invictus (2009) and his leading role as an astronaut stranded on Mars in The Martian (2015), Damon received Academy Award nominations for Best Supporting Actor and Best Actor, respectively. The latter also won him a Golden Globe Award for Best Actor. Damon has received Emmy Award nominations for his portrayal of Scott Thorson in the biopic Behind the Candelabra (2013) and for producing the reality series Project Greenlight. He also received an Academy Award nomination for producing Manchester by the Sea (2016).\n\nDescription above from the Wikipedia article Matt Damon, licensed under CC-BY-SA, full list of contributors on Wikipedia.",
//     "popularity": 10.44,
//     "place_of_birth": "Boston, Massachusetts, USA",
//     "profile_path": "/elSlNgV8xVifsbHpFsqrPGxJToZ.jpg",
//     "adult": false,
//     "imdb_id": "nm0000354",
//     "homepage": null
//   }

//get images

// https://api.themoviedb.org/3/person/1892/images?api_key=4d4ed145d3584846f5922b6a467e1f85

//https://api.themoviedb.org/3/person/1892/movie_credits?api_key=4d4ed145d3584846f5922b6a467e1f85&language=en-US

// "cast": [
//     {
//       "character": "Will Hunting",
//       "credit_id": "52fe4249c3a36847f8012657",
//       "release_date": "1997-12-05",
//       "vote_count": 7826,
//       "video": false,
//       "adult": false,
//       "vote_average": 8.1,
//       "title": "Good Will Hunting",
//       "genre_ids": [
//         18
//       ],
//       "original_language": "en",
//       "original_title": "Good Will Hunting",
//       "popularity": 25.496,
//       "id": 489,
//       "backdrop_path": "/vbpZxGxZQGkCZdYyQqoM26YS98.jpg",
//       "overview": "Will Hunting has a genius-level IQ but chooses to work as a janitor at MIT. When he solves a difficult graduate-level math problem, his talents are discovered by Professor Gerald Lambeau, who decides to help the misguided youth reach his potential. When Will is arrested for attacking a police officer, Professor Lambeau makes a deal to get leniency for him if he will get treatment from therapist Sean Maguire.",
//       "poster_path": "/bABCBKYBK7A5G1x0FzoeoNfuj2.jpg"
//     },

// https://api.themoviedb.org/3/person/1892/combined_credits?api_key=4d4ed145d3584846f5922b6a467e1f85&language=en-US
