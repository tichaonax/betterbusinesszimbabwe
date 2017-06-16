import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {hashHistory} from 'react-router';

var loginActions = require('loginActions');
var errorActions = require('errorActions');
var profileActions = require('profileActions');
var searchActions = require('searchActions');
var companiesActions = require('companiesActions');
var reviewsActions = require('reviewsActions');
var store = require('configureStore').configure();
import firebase from 'app/firebase/'
import router from 'app/router/';

store.dispatch(errorActions.bbzClearError());
store.dispatch(profileActions.resetUserProfile());
store.dispatch(searchActions.setSearchText(""));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.debug("subscribed user:", user);
        console.debug("providerId:", user.providerData[0].providerId);
        console.debug("email:", user.providerData[0].email);
        console.debug("userId:", user.providerData[0].uid);
        //console.debug("getState",store.getState());
        //console.debug("getState.redirectUrl", store.getState().redirectUrl);
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
        store.dispatch(companiesActions.startAddCompanyItems());
        store.dispatch(searchActions.setSearchText(""));
        hashHistory.push(store.getState().redirectUrl);
    } else {
        console.debug("user session invlaid:", user);
        store.dispatch(loginActions.bbzLogout());
        store.dispatch(profileActions.resetUserProfile());
        store.dispatch(reviewsActions.startAddReviewItems());
        hashHistory.push('/reviews');
    }
});

//load bootstrap
require("modules/bootstrap-sass/assets/javascripts/bootstrap.js");

// App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
    <Provider store={store}>
        {router}
    </Provider>,
    document.getElementById('app')
);
