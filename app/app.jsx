import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {hashHistory} from 'react-router';

var actions = require('actions');
var store = require('configureStore').configure();
import firebase from 'app/firebase/'
import router from 'app/router/';

store.dispatch(actions.bbzClearError());
store.dispatch(actions.resetUserProfile());

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.debug("subscribed user:", user);

        var displayName = user.email;

        if (user.displayName) {
            displayName = user.displayName;
        }

        var auth = {
            uid: user.uid,
            displayName: displayName,
            email: user.email,
            photoURL: user.photoURL,
            loggedIn: true
        };

        store.dispatch(actions.bbzLogin(auth));
        store.dispatch(actions.startSetUserProfile());
        hashHistory.push('/bbzreviews');
    } else {
        console.debug("user session invlaid:", user);
        store.dispatch(actions.bbzLogout());
        store.dispatch(actions.resetUserProfile());
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
