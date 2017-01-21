import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

var TodoApp = require('TodoApp');
var TodoAPI = require('TodoAPI');


var actions = require('actions');
var store = require('configureStore').configure();

//subscribe to changes
var unsubscribe = store.subscribe(()=>{
    var state = store.getState();

    console.log ('New state', state);

    TodoAPI.setTodoItems(state.todoItems);

});


var initialTodoItems = TodoAPI.getTodoItems();
store.dispatch(actions.addTodoItems(initialTodoItems));

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
    <Provider store={store}>
        <TodoApp/>
    </Provider>,
    document.getElementById('app')
);
