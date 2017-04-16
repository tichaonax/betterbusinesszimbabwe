import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {hashHistory} from 'react-router';

var actions = require('actions');
var store = require('configureStore').configure();
import firebase from 'app/firebase/'
import router from 'app/router/';


store.dispatch(actions.bbzClearError());


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var auth = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            loggedIn: true
        };

        store.dispatch(actions.bbzLogin(auth));
       // store.dispatch(actions.startBbzAddItems());
        hashHistory.push('/bbzreviews');
    } else {
        store.dispatch(actions.bbzLogout());
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
