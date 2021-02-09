import React, {useEffect, useState} from 'react';

function Navbar() {
    const [show, handleShow] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener('scroll', handleShow());
            // it might be cause a memory leak, check this later.
        };
    }, []);

    if (localStorage.getItem('user')) {
        return (
            <div className={`navbar ${show && 'navbar__black'}`}>
                <img
                    className="navbar__logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
                    alt="imdb logo"
                />

                <img
                    className="navbar__avatar"
                    src="https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg"
                    alt="imdb logo"
                />
                <h4 className="navbar__userInfo"> {user.email} </h4>
            </div>
        );
    } else {
        return (
            <div className={`navbar ${show && 'navbar__black'}`}>
                <img
                    className="navbar__logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
                    alt="imdb logo"
                />

                <div className="navbar__signin">
                    <button
                        className="signin__button"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href = '/signin';
                        }}>
                        Sign in
                    </button>
                </div>
            </div>
        );
    }
}

export default Navbar;
