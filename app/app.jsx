import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {hashHistory} from 'react-router';

var actions = require('actions');
var store = require('configureStore').configure();
import firebase from 'app/firebase/'
import router from 'app/router/';

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var auth = {
            uid: user.uid,
            displayName: user.displayName
        };

        store.dispatch(actions.todoLogin(auth));
       // store.dispatch(actions.startTodoAddItems());
        hashHistory.push('/todoitems');
    } else {
        store.dispatch(actions.todoLogout());
        hashHistory.push('/');
    }
});

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')


ReactDOM.render(
    <Provider store={store}>
        {router}
    </Provider>,
    document.getElementById('app')
);
