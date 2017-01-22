import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import TodoLogin from 'TodoLogin';
import TodoApp from 'TodoApp';


var actions = require('actions');
var store = require('configureStore').configure();

store.dispatch(actions.startTodoAddItems());

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
