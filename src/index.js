import React from 'react';
import ReactDOM from 'react-dom';
import {Auth0Provider} from './contexts/auth0-context';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';

ReactDOM.render(
    <Router>
        <Auth0Provider>
            <App />
        </Auth0Provider>
    </Router>,
    document.getElementById('root')
);