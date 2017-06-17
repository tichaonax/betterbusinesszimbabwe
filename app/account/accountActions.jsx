import moment from 'moment';
import firebase, {firebaseRef} from 'app/firebase/index';

var errorActions = require('errorActions');
var profileActions = require('profileActions');
var loginActions = require('loginActions');

//<editor-fold desc="Create Account">

function getUserAvatar(avatar) {
    let photoURL = "images/no-image.png";
    if (avatar) {
        photoURL = avatar;
    }
    return (photoURL);
}

export var startBbzCreateAccount = (email, password) => {
    var gAuth;
    return (dispatch, getState) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
            console.log("createUserWithEmailAndPassword Email and Password worked!", result);
            let user = result;
            gAuth = {
                uid: user.uid,
                displayName: user.email,
                email: user.email,
                photoURL: getUserAvatar(result.photoURL),
                loggedIn: true,
                providerId: (user.providerData[0].providerId) ? user.providerData[0].providerId : 'password',
                userId: (user.providerData[0].uid) ? user.providerData[0].uid : email
            };
            console.log("Auth data!", gAuth);
            return dispatch(loginActions.bbzLogin(gAuth));
        }, (error) => {
            console.log("Unable to create new Account", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(errorActions.bbzReportError(errorObj));
        }).then(
            () => {
                return dispatch(profileActions.startSetUserProfile()).then(
                    () => {
                        var timestamp = getState().userProfile.createDate;
                        if (timestamp) {
                            console.debug("User profile created on: ", moment.unix(timestamp).format('MMM Do, YYYY @ h:mm a'));
                        } else {
                            return dispatch(profileActions.startAddUserProfile(gAuth.email, gAuth.displayName,
                                gAuth.providerId, gAuth.userId, gAuth.photoURL));
                        }
                    }
                )
            }
        ).then(
            () => {
                return dispatch(loginActions.startLastLogin());
            }
        )
    };
};

//</editor-fold>

//<editor-fold desc="Password Reset">

export var startSendPasswordResetEmail = (email) => {
    console.log("Start Create New Account !");
    return (dispatch, getState) => {
        return firebase.auth().sendPasswordResetEmail(email).then((result) => {
            console.log("Reset Password Email Sent!", result);
            return dispatch(errorActions.bbzClearError());
        }, (error) => {
            console.log("Unable to sent Password reset email", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(errorActions.bbzReportError(errorObj));
        });
    };
};

//</editor-fold>

