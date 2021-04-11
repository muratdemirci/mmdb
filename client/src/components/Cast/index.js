import React from 'react';
import {MOBILEPOSTERURL} from '../../config';
import {string_to_slug} from '../../support/slugify'
import './style.css';

const Cast = (props) => {
    if (props.data) {
        return props.data.slice(0, 5).map((star) => {
            return (
                <div className="cast_member" key={star.name}>
                    <a href={`/name/${star.id}-${string_to_slug(star.name)}`}>
                        <img
                            src={`${MOBILEPOSTERURL}/w138_and_h175_bestv2/${star.profile_path}`}
                            alt={star.name}
                            title={star.name}
                        />
                    </a>
                    <h4 className="cast_name">{star.name}</h4>
                    <span className="cast_character">{star.character}</span>
                </div>
            );
        });
    } else {
        return '';
    }
};

export default Cast;
