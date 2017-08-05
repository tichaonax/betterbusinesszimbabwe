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
            //console.debug("users", users);
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

export var updateUserItem = (userId, updates) => {
    return {
        type: 'UPDATE_USER_ITEM',
        userId,
        updates
    };
};

export var startToggleAdminUserItem = (userId, isAdmin, adminUserId) => {
    //console.log("startToggleAdminUserItem userId, isAdmin, adminUserId",userId, isAdmin, adminUserId);
    return (dispatch, getState) => {
        dispatch(loadingActions.setLoadingStatus(true));
        return usersApi.updateUserIsAdminFlag(userId, isAdmin, adminUserId).then((response) => {
            let user = response.data;
            console.debug("user", user);
            dispatch(loadingActions.setLoadingStatus(false));
            return dispatch(updateUserItem(userId, user));
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