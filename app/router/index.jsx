import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import firebase from 'app/firebase/'

import TodoLogin from 'TodoLogin';
import TodoApp from 'TodoApp';

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
        <Route path="/">
            <Route path="todoitems" component={TodoApp} onEnter={requireLogin}/>
            <IndexRoute component={TodoLogin} onEnter={redirectIfLoggedIn}/>
        </Route>
    </Router>
);