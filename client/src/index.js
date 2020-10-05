import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import './assets/css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import SignIn from './views/Sign/SignIn';
import Title from './views/Title/Title';

import {Provider} from 'react-redux';
import {store, history} from './redux/_helpers';

serviceWorker.unregister();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter history={history}>
            <Switch>
                <Route
                    path="/signin"
                    render={(props) => <SignIn {...props} />}
                />
                <Route
                    path="/title/:id"
                    render={(props) => <Title {...props} />}
                />
                <Route path="/" render={(props) => <App {...props} />} />
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);
