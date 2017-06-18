var errorActions = require('errorActions');
var searchActions = require('searchActions');

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
        dispatch(searchActions.setLoadingStatus(true));
        var userItemRef = firebaseRef.child(`users`);
        return userItemRef.once('value').then((snapshot) => {
            var userItems = snapshot.val() || {}; //return available data or empty object

            var parsedUserItems = [];

            Object.keys(userItems).forEach((userItemId) => {
                parsedUserItems.push({
                    userItemId: userItemId,
                    ...userItems[userItemId]
                });
            });
            //console.debug("startAddUserItems:",parsedUserItems);
            dispatch(addUserItems(parsedUserItems));
            dispatch(searchActions.setLoadingStatus(false));
        }, (error) => {
            console.debug("Unable to fetch users", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            dispatch(searchActions.setLoadingStatus(false));
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



