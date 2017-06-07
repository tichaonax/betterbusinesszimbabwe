var errorActions = require('errorActions');

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
        }, (error) => {
            console.debug("Unable to fetch users", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(errorActions.bbzReportError(errorObj));
        });
    };
};