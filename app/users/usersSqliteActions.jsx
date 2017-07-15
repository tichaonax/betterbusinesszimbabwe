var errorActions = require('errorActions');
var loadingActions = require('loadingActions');
var UsersApi = require('../api/usersApi');
var usersApi = new UsersApi();

import firebase, {firebaseRef, githubProvider} from 'app/firebase/index';

export var addUserItem = (userItem) => {
    return {
        type: 'ADD_USER_ITEM',
        userItem
    };
};

export var addUserItems = (userItems) => {
    return {
        type: 'ADD_USER_ITEMS',
        userItems
    };
};

export var startAddUserItems = () => {
    return (dispatch, getState) => {
        dispatch(loadingActions.setLoadingStatus(true));
        return usersApi.findAllUsers().then((response) => {
            let users = response.data;
            console.debug("users", users);
            dispatch(loadingActions.setLoadingStatus(false));
            dispatch(addUserItems(users));
        }, (error) => {
            console.debug("Unable to fetch users", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            dispatch(loadingActions.setLoadingStatus(false));
            return dispatch(errorActions.bbzReportError(errorObj));
        });
    };
};

export var updateUserItem = (userItemId, updates) => {
    return {
        type: 'UPDATE_USER_ITEM',
        userItemId,
        updates
    };
};

export var startToggleAdminUserItem = (userItemId, isAdmin) => {
    return (dispatch, getState) => {
        var userItemRef = firebaseRef.child(`users/${userItemId}/userProfile`);
        var userProfile={};
        return userItemRef.once('value').then((snapshot) => {
            userProfile = snapshot.val() || {}; //return available data or empty object
        }).then(()=>{
            var updates = {isAdmin: isAdmin};
            userProfile["isAdmin"] = isAdmin;
            return userItemRef.update(updates).then(()=>{
                return dispatch(updateUserItem(userItemId, {userProfile: userProfile}));
            })
        }).catch(
            (error) => {
                console.debug("Unable to update user admin status", error);
                var errorObj = {
                    errorCode: error.code,
                    errorMessage: error.message
                };
                return dispatch(errorActions.bbzReportError(errorObj));
            }
        );
    };
};