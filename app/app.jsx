import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {hashHistory} from 'react-router';

var loginActions = require('loginActions');
var errorActions = require('errorActions');
var profileSqliteActions = require('profileSqliteActions');
var searchActions = require('searchActions');
var companiesSqliteActions = require('companiesSqliteActions');
var reviewsSqliteActions = require('reviewsSqliteActions');
var navActions = require('navActions');
var store = require('configureStore').configure();
import firebase from 'app/firebase/'
import router from 'app/router/';

store.dispatch(errorActions.bbzClearError());
store.dispatch(profileSqliteActions.resetUserProfile());
store.dispatch(searchActions.setSearchText(""));

firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
        //console.log("firebaseUser",firebaseUser);
        //console.debug("subscribed firebaseUser:", firebaseUser);
        //console.debug("providerId:", firebaseUser.providerData[0].providerId);
        //console.debug("email:", firebaseUser.providerData[0].email);
        //console.debug("firebaseUserId:", firebaseUser.providerData[0].uid);
        //console.debug("getState",store.getState());
        //console.debug("getState.redirectUrl", store.getState().redirectUrl);
        var displayName = firebaseUser.email;

        if (firebaseUser.displayName) {
            displayName = firebaseUser.displayName;
        }

        var auth = {
            firebaseId: firebaseUser.uid,
            displayName: displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
            loggedIn: true
        };

        store.dispatch(loginActions.bbzLogin(auth));
        store.dispatch(loginActions.startGetLastLogin());
        store.dispatch(profileSqliteActions.startSetUserProfile());
        store.dispatch(companiesSqliteActions.startAddCompanyItems());
        store.dispatch(reviewsSqliteActions.startAddReviewItems(''));
        store.dispatch(searchActions.setSearchText(""));
        hashHistory.push(store.getState().redirectUrl);
    } else {
        //console.debug("firebaseUser session invlaid:", firebaseUser);
        store.dispatch(loginActions.bbzLogout());
        store.dispatch(profileSqliteActions.resetUserProfile());
        store.dispatch(reviewsSqliteActions.startAddReviewItems(''));
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
