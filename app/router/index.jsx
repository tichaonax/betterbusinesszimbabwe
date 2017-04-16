import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import firebase from 'app/firebase/'
import Main from 'Main';
import Weather from 'Weather';
import About from 'About';
import Examples from 'Examples';
import BbzLogin from 'BbzLogin';
import BbzPasswordLogin from 'BbzPasswordLogin';
import BbzResetPassword from 'BbzResetPassword';
import BbzLoggedInContainer from 'BbzLoggedInContainer';
import Home from 'Home';
import BbzReviews from 'BbzReviews';
import CreateNewAccount from 'CreateNewAccount';

export default (
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <Route path="about" component={About}/>
            <Route path="login" component={BbzLogin}/>
            <Route path="weather" component={Weather}/>
            <Route path="emaillogin" component={BbzPasswordLogin}/>
            <Route path="resetpassword" component={BbzResetPassword}/>
            <Route path="createaccount" component={CreateNewAccount}/>
            <IndexRoute component={Home}/>
            <Route component={BbzLoggedInContainer}>
                <Route path="examples" component={Examples}/>
                <Route path="bbzreviews" component={BbzReviews}/>
            </Route>
        </Route>
    </Router>
);