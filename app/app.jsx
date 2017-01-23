import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

var actions = require('actions');
var store = require('configureStore').configure();
import TodoLogin from 'TodoLogin';
import TodoApp from 'TodoApp';
import firebase from 'app/firebase/'

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        hashHistory.push('/todoitems');
    } else {
        hashHistory.push('/');
    }
});

store.dispatch(actions.startTodoAddItems());

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

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

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/">
                <Route path="todoitems" component={TodoApp} onEnter={requireLogin}/>
                <IndexRoute component={TodoLogin} onEnter={redirectIfLoggedIn}/>
            </Route>
        </Router>

    </Provider>,
    document.getElementById('app')
);
