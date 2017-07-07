import moment from 'moment';
import firebase, {firebaseRef} from 'app/firebase/index';
var UsersApi = require('../api/usersApi');
var userApi = new UsersApi();

//<editor-fold desc="User Profile">

export var setUserProfile = (profile) => {
    return {
        type: 'SET_USER_PROFILE',
        profile
    };
};

export var resetUserProfile = () => {
    return {
        type: 'RESET_USER_PROFILE'
    };
};

export var updateUserProfile = (profileUpdates) => {
    return {
        type: 'UPDATE_USER_PROFILE',
        profileUpdates
    };
};

export var startSetUserProfile = () => {
    return (dispatch, getState) => {
        let firebaseId = getState().auth.firebaseId;
        return userApi.findUserByFirebaseId(firebaseId).then((user) => {
            let profile = (user.data) ? user.data : {};
            console.log("profile", firebaseId, profile);
            dispatch(setUserProfile(profile));
        });
    };
};


export var addUserProfile = (profile) => {
    return {
        type: 'ADD_USER_PROFILE',
        profile
    };
};


export var startAddUserProfile = (firebaseId, email, displayName, providerId, uid, photoURL) => {
    console.log("Start Add User Profile!");
    return (dispatch, getState) => {
        let isAdmin= false;
        let isSuperUser = false;
        let reviewCount=0;
        return userApi.addFirebaseUser(firebaseId, displayName, email,
            photoURL, providerId, uid, reviewCount, isSuperUser, isAdmin).then((user) => {
            let profile = (user.data) ? user.data : {};
            dispatch(addUserProfile(profile));
        });
    };
};

export var startUpdateUserProfile = (firebaseId, email, displayName, providerId, uid, photoURL) => {
    return (dispatch, getState) => {
        return userApi.updateFirebaseUserProfile(firebaseId, displayName, email, photoURL, providerId, uid).then(
            (user) => {
                let profile = (user.data) ? user.data : {};
                return dispatch(updateUserProfile(profile));
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
}
//</editor-fold>
