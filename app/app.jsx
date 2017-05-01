import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {hashHistory} from 'react-router';

var loginActions = require('loginActions');
var errorActions = require('errorActions');
var profileActions = require('profileActions');
var store = require('configureStore').configure();
import firebase from 'app/firebase/'
import router from 'app/router/';


store.dispatch(errorActions.bbzClearError());
store.dispatch(profileActions.resetUserProfile());

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

        store.dispatch(loginActions.bbzLogin(auth));
        store.dispatch(loginActions.startGetLastLogin());
        store.dispatch(profileActions.startSetUserProfile());
        hashHistory.push('/reviews');
    } else {
        console.debug("user session invlaid:", user);
        store.dispatch(loginActions.bbzLogout());
        store.dispatch(profileActions.resetUserProfile());
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
