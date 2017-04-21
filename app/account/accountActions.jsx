import moment from 'moment';
import firebase, {firebaseRef} from 'app/firebase/index';

var errorActions = require('errorActions');
var profileActions = require('profileActions');
var loginActions = require('loginActions');

//<editor-fold desc="Create Account">

export var startBbzCreateAccount = (email, password) => {
    var gAuth;
    return (dispatch, getState) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
            console.log("Auth with Email and Password worked!", result);

            gAuth = {
                uid: result.uid,
                displayName: result.email,
                email: result.email,
                photoURL: result.photoURL,
                loggedIn: true
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
                            return dispatch(profileActions.startAddUserProfile(gAuth.email, gAuth.displayName));
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

