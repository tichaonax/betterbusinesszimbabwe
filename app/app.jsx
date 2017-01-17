var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

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
