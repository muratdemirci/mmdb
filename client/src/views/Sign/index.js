import React, {useState, useEffect, Component} from 'react';
import './style.css';
import {getUpcoming} from '../../services/titleAPI';
import {POSTERURL} from '../../config/config';
import {useDispatch, useSelector} from 'react-redux';
import {userActions} from '../../redux/_actions';

class SignIn extends Component {
    componentDidMount() {}

    render() {
        return <SignForm />;
    }
}

function Form({option}) {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const {email, password, confirmPassword} = inputs;
    const loggingIn = useSelector((state) => state.authentication.loggingIn);
    const dispatch = useDispatch();
    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    function handleChange(e) {
        const {name, value} = e.target;
        setInputs((inputs) => ({...inputs, [name]: value}));
    }

    const preSubmit = (e) => {
        e.preventDefault();
        switch (option) {
            case 1:                
                setSubmitted(true);
                if (email && password) {
                    dispatch(userActions.login(email, password));
                }
                break;
            case 2:
                setSubmitted(true);
                if (email && password && confirmPassword) {
                    const user = {
                        email: email,
                        password: password,
                        confirmPassword: confirmPassword,
                        acceptTerms: true,
                    };
                dispatch(userActions.register(user));                    
                }

                break;
            case 3:
                //api side is done, tie up this with redux etc...
                break;
            default:
                console.log(`Sorry dorothy but ${option} not exist.`);
        }
    };

    return (
        <form className="account-form" onSubmit={preSubmit}>
            <div
                className={
                    'account-form-fields ' +
                    (option === 1
                        ? 'sign-in'
                        : option === 2
                        ? 'sign-up'
                        : 'forgot')
                }>
                <input
                    type="text"
                    name="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={handleChange}
                    className={
                        'form-control' +
                        (submitted && !email ? ' is-invalid' : '')
                    }
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                    className={
                        'form-control' +
                        (submitted && !password ? ' is-invalid' : '')
                    }
                    required
                />

                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Repeat password"
                    onChange={handleChange}
                    value={confirmPassword}
                    required={option === 2 ? true : false}
                    disabled={option === 1 || option === 3 ? true : false}
                />
            </div>
            {/* change button text while logging in or registering in */}
            <button className="btn-submit-form" type="submit">
                {option === 1
                    ? 'Sign in'
                    : option === 2
                    ? 'Sign up'
                    : 'Reset password'}
            </button>
        </form>
    );
}

function SignForm() {
    const [option, setOption] = React.useState(1);
    const [movie, setMovie] = useState();

    useEffect(() => {
        async function fetchData() {
            const request = await getUpcoming();
            setMovie(request[Math.floor(Math.random() * request.length - 1)]);
            return request;
        }
        fetchData();
    }, []);

    return (
        <>
            <img
                className="background"
                src={`${POSTERURL}${movie?.backdrop_path}`}
                // TODO: movie.poster_path : movie.backdrop_path condition                
                alt=""
                // TODO: quick alt and title
            />
            <div className="container">
                <header>
                    <div
                        className={
                            'header-headings ' +
                            (option === 1
                                ? 'sign-in'
                                : option === 2
                                ? 'sign-up'
                                : 'forgot')
                        }>
                        <span>Sign in to your account</span>
                        <span>Create an account</span>
                        <span>Reset your password</span>
                    </div>
                </header>
                <ul className="options">
                    <li
                        className={option === 1 ? 'active' : ''}
                        onClick={() => setOption(1)}>
                        Sign in
                    </li>
                    <li
                        className={option === 2 ? 'active' : ''}
                        onClick={() => setOption(2)}>
                        Sign up
                    </li>
                    <li
                        className={option === 3 ? 'active' : ''}
                        onClick={() => setOption(3)}>
                        Forgot
                    </li>
                </ul>
                <Form option={option} />
                <footer></footer>
            </div>
        </>
    );
}

export default SignIn;
