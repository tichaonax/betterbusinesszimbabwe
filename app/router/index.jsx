import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import firebase from 'app/firebase/'
import Main from 'Main';
import Weather from 'Weather';
import About from 'About';
import Examples from 'Examples';
import TodoLogin from 'TodoLogin';
import TodoApp from 'TodoApp';
import EnsureLoggedInContainer from 'EnsureLoggedInContainer';

var requireLogin = (nextState, replace, next) => {
    if (!firebase.auth().currentUser) {
        replace('/');
    }
    next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
    if (firebase.auth().currentUser) {
        replace('/todoitems');
    }
    next();
};

export default (
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <Route path="about" component={About}/>
            <Route path="login" component={TodoLogin}/>
            <IndexRoute component={Weather}/>
            <Route component={EnsureLoggedInContainer}>
                <Route path="examples" component={Examples}/>
                <Route path="todoitems" component={TodoApp}/>
            </Route>
        </Route>
    </Router>
);