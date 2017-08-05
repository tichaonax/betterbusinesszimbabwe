import moment from 'moment';
import requestip from 'clientIpAddress';
import firebase, {firebaseRef, githubProvider} from 'app/firebase/index';

var errorActions = require('errorActions');
var profileSqliteActions = require('profileSqliteActions');
var servicesSqliteActions = require('servicesSqliteActions');
var loadingActions = require('loadingActions');

var LastLoginApi = require('../api/lastLoginApi');
var lastLoginApi = new LastLoginApi();
var UsersApi = require('../api/usersApi');
var userApi = new UsersApi();


//<editor-fold desc="Login">

export var bbzLogin = (auth) => {
    return {
        type: 'BBZ_LOGIN',
        auth
    };
};

//</editor-fold>

//<editor-fold desc="Provider Login">

function isUserProfileUpdateNeeded(getState, auth) {
    //console.debug("isUserProfileUpdateNeeded->auth", auth);
    if (auth.email != getState().userProfile.email ||
        auth.providerId != getState().userProfile.providerId ||
        auth.uid != getState().userProfile.uid ||
        auth.displayName != getState().userProfile.displayName ||
        auth.photoURL != getState().userProfile.photoURL) {
        //console.debug("isUserProfileUpdateNeeded", true);
        return (true);
    } else {
        //console.debug("isUserProfileUpdateNeeded", false);
        return (false);
    }
}


function getUserAvatar(avatar) {
    let photoURL = "images/no-image.png";
    if (avatar) {
        photoURL = avatar;
    }
    return (photoURL);
}

function setPostLoginUserProfile(dispatch, getState, auth) {
    return dispatch(profileSqliteActions.startSetUserProfile()).then(
        () => {
            var timestamp = getState().userProfile.createAt;
            console.log("timestamp", timestamp);
            if (timestamp) {
                console.log("Update User Profile");
                if (isUserProfileUpdateNeeded(getState, auth)) {
                    return dispatch(profileSqliteActions.startUpdateUserProfile(auth.firebaseId,
                        auth.email, auth.displayName, auth.providerId, auth.uid, auth.photoURL));
                }
            } else {
                console.log("Add New User Profile");
                return dispatch(profileSqliteActions.startAddUserProfile(auth.firebaseId, auth.email,
                    auth.displayName, auth.providerId, auth.uid, auth.photoURL));
            }
        }
    )
}


export var startBbzLogin = (provider) => {
    var gAuth;
    return (dispatch, getState) => {
        dispatch(loadingActions.setLoadingStatus(true));
        return firebase.auth().signInWithPopup(provider).then((result) => {
            console.debug("Auth worked!", result);

            let user = result.user;

            gAuth = {
                firebaseId: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: getUserAvatar(user.photoURL),
                loggedIn: true,
                providerId: user.providerData[0].providerId,
                uid: user.providerData[0].uid,
            };

            //console.debug("Auth data!", gAuth);
            dispatch(errorActions.bbzClearError());
            dispatch(loadingActions.setLoadingStatus(false));
            return dispatch(bbzLogin(gAuth));
        }, (error) => {
            console.debug("Unable to auth", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            dispatch(loadingActions.setLoadingStatus(false));
            return dispatch(errorActions.bbzReportError(errorObj));
        }).then(
            () => {
                return setPostLoginUserProfile(dispatch, getState, gAuth);
            }
        ).then(
            () => {
                dispatch(loadingActions.setLoadingStatus(false));
                return dispatch(startLastLogin());
            }
        ).catch((error) => {
            dispatch(loadingActions.setLoadingStatus(false));
            console.debug("firebase-login-error", error);
        })
    };
};

//</editor-fold>

//<editor-fold desc="Email Login">

export var startBbzEmailLogin = (email, password) => {
    var gAuth;
    return (dispatch, getState) => {
        dispatch(loadingActions.setLoadingStatus(true));
        return firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
            console.debug("Auth with Email and Password worked!", result);
            let user = result;
            gAuth = {
                firebaseId: user.uid,
                displayName: email,
                email: user.email,
                photoURL: getUserAvatar(user.photoURL),
                loggedIn: true,
                providerId: (user.providerData[0].providerId) ? user.providerData[0].providerId : 'password',
                uid: (user.providerData[0].uid) ? user.providerData[0].uid : email
            }

            console.debug("Auth data!", gAuth);
            dispatch(loadingActions.setLoadingStatus(false));
            dispatch(errorActions.bbzClearError());
            return dispatch(bbzLogin(gAuth));
        }, (error) => {
            console.debug("Unable to auth", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            dispatch(loadingActions.setLoadingStatus(false));
            return dispatch(errorActions.bbzReportError(errorObj));
        }).then(
            () => {
                return setPostLoginUserProfile(dispatch, getState, gAuth);
            }
        ).then(
            () => {
                dispatch(loadingActions.setLoadingStatus(false));
                return dispatch(startLastLogin());
            }
        ).catch((error) => {
            dispatch(loadingActions.setLoadingStatus(false));
            console.debug("firebase-email-login-error", error);
        })
    };
};

//</editor-fold>

//<editor-fold desc="Logout">

export var bbzLogout = () => {
    return {
        type: 'BBZ_LOGOUT'
    };
};


export var startBbzLogout = () => {
    return (dispatch, getState) => {
        return firebase.auth().signOut().then(() => {
            //console.debug("Logggedout!");
            return dispatch(bbzLogout());
        }).then(
            () => {
                return dispatch(profileSqliteActions.resetUserProfile());
            }
        );
    };
};

//</editor-fold>

//<editor-fold desc="lastLogins">
export var lastLogin = (lastLogin) => {
    //console.debug("lastLogin", lastLogin);
    return {
        type: 'ADD_LAST_LOGIN',
        lastLogin
    };
};

export var startLastLogin = () => {
    return (dispatch, getState) => {

        var gClientIp;

        console.log("current user profile:", getState().auth);

        return requestip.getClientIpAddress().then(
            (clientIp) => {
                gClientIp = clientIp.trim();

                //console.debug("Cleint IP: ", gClientIp);

                let ipInfoPromise = requestip.getClientLocationByIpAddress(gClientIp).then((response) => {
                    var newLoginInfo = {};
                    newLoginInfo.ipAddress = gClientIp;
                    newLoginInfo.loginAt = moment().format("YYYY-MM-DD H:MM:SS");
                    //console.debug("ipInfoPromise", response);
                    newLoginInfo.country = response.country;
                    newLoginInfo.city = response.city;
                    Promise.resolve();
                    return (newLoginInfo);
                }).catch((error) => {
                    console.log("ipInfoPromise", error);
                });

                let gUser;
                var firebaseId = getState().auth.firebaseId;
                let firebasePromise = userApi.findUserByFirebaseId(firebaseId).then((user) => {
                    gUser = user.data;
                    return lastLoginApi.moveLastLogin(gUser.userId,
                        gUser.city, gUser.country, gUser.ipAddress,
                        gUser.loginAt).then((login) => {
                        let lastLoginInfo = (login.data) ? login.data : {};
                        Promise.resolve();
                        return (lastLoginInfo);
                    }).catch((error) => {
                        console.log("lastlogin move", error);
                    })
                });

                Promise.all([ipInfoPromise, firebasePromise]).then((values) => {
                        const newLogin = values[0];
                        const oldLogin = values[1];
                        console.debug("Promise.all-1", newLogin);
                        console.debug("Promise.all-2", oldLogin);


                        return userApi.updateUserLastLogin(gUser.userId, newLogin.city,
                            newLogin.country, newLogin.ipAddress)
                            .then((result) => {
                            console.log("updated user", result.data);
                                if (oldLogin.city) {
                                    //user's last login
                                    return dispatch(lastLogin(oldLogin));
                                } else {
                                    //this is the user's first login
                                    return dispatch(lastLogin(newLogin));
                                }
                            });
                    }
                );
            }).catch((error) => {
            console.debug("Error getClientIpAddress", error);
        });
    }
};

export var startGetLastLogin = () => {
    return (dispatch, getState) => {
        var firebaseId = getState().auth.firebaseId;
        return userApi.findUserByFirebaseId(firebaseId).then((response) => {
            //console.log("startGetLastLogin-response", response);
            let user = response.data;
            if (user && user.userId) {
                return lastLoginApi.findLastloginByUserId(user.userId).then((login) => {
                    let lastLoginInfo = (login.data) ? login.data : {};
                    dispatch(lastLogin(lastLoginInfo));
                });
            }else{
                dispatch(lastLogin({}));
            }
        }, (error) => {
            console.debug("Unable to fetch lastLogin", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(errorActions.bbzReportError(errorObj));
        });
    };
};

//</editor-fold>