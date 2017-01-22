import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

var actions = require('actions');
var store = require('configureStore').configure();
import TodoLogin from 'TodoLogin';
import TodoApp from 'TodoApp';
import firebase from 'app/firebase/'

firebase.auth().onAuthStateChanged()
store.dispatch(actions.startTodoAddItems((user) => {
    if (user) {
        hashHistory.push('/todoitems');
    } else {
        hashHistory.push('/');
    }
}));

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/">
                <Route path="todoitems" component={TodoApp}/>
                <IndexRoute component={TodoLogin}/>
            </Route>
        </Router>

    </Provider>,
    document.getElementById('app')
);
