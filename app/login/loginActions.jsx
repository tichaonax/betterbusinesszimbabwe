import moment from 'moment';
import requestip from 'clientIpAddress';
import firebase, {firebaseRef, githubProvider} from 'app/firebase/index';

var errorActions = require('errorActions');
var profileActions = require('profileActions');
var servicesActions = require('servicesActions');

//<editor-fold desc="Login">

export var bbzLogin = (auth) => {
    return {
        type: 'BBZ_LOGIN',
        auth
    };
};

//</editor-fold>

//<editor-fold desc="Provider Login">

function isUserProfileUpdateNeeded(getState, gAuth) {
    //console.debug("isUserProfileUpdateNeeded->gAuth", gAuth);
    if (gAuth.email != getState().userProfile.email ||
        gAuth.providerId != getState().userProfile.providerId ||
        gAuth.userId != getState().userProfile.userId ||
        gAuth.displayName != getState().userProfile.displayName ||
        gAuth.photoURL != getState().userProfile.photoURL) {
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

export var startBbzLogin = (provider) => {
    var gAuth;
    return (dispatch, getState) => {
        return firebase.auth().signInWithPopup(provider).then((result) => {
            console.debug("Auth worked!", result);

            let user = result.user;

            gAuth = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: getUserAvatar(user.photoURL),
                loggedIn: true,
                providerId: user.providerData[0].providerId,
                userId: user.providerData[0].uid
            };

            //console.debug("Auth data!", gAuth);
            dispatch(errorActions.bbzClearError());
            return dispatch(bbzLogin(gAuth));
        }, (error) => {
            console.debug("Unable to auth", error);
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
                           // console.debug("User profile created on: ", moment.unix(timestamp).format('MMM Do, YYYY @ h:mm a'));
                            if (isUserProfileUpdateNeeded(getState, gAuth)) {
                                return dispatch(profileActions.startUpdateUserProfile(gAuth.uid,
                                    gAuth.email, gAuth.displayName, gAuth.providerId, gAuth.userId, gAuth.photoURL));
                            }
                        } else {
                            return dispatch(profileActions.startAddUserProfile(gAuth.email, gAuth.displayName,
                                gAuth.providerId, gAuth.userId, gAuth.photoURL));
                        }
                    }
                )
            }
        ).then(
            () => {
                return dispatch(startLastLogin());
            }
        ).catch((error)=>{
            console.debug("firebase-login-error", error);
        })
    };
};

//</editor-fold>

//<editor-fold desc="Email Login">

export var startBbzEmailLogin = (email, password) => {
    var gAuth;
    return (dispatch, getState) => {
        return firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
            console.debug("Auth with Email and Password worked!", result);
            let user = result;
            //console.debug("Email user:", user);
            //console.debug("userId: user.providerData[0]",user.providerData[0]);
            gAuth = {
                uid: user.uid,
                displayName: email,
                email: user.email,
                photoURL: getUserAvatar(user.photoURL),
                loggedIn: true,
                providerId: (user.providerData[0].providerId) ? user.providerData[0].providerId : 'password',
                userId: (user.providerData[0].uid) ? user.providerData[0].uid : email
            }

            console.debug("Auth data!", gAuth);
            dispatch(errorActions.bbzClearError());
            return dispatch(bbzLogin(gAuth));
        }, (error) => {
            console.debug("Unable to auth", error);
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
                            //console.debug("User profile created on: ", moment.unix(timestamp).format('MMM Do, YYYY @ h:mm a'));
                            if (isUserProfileUpdateNeeded(getState, gAuth)) {
                                return dispatch(profileActions.startUpdateUserProfile(gAuth.uid, gAuth.email,
                                    gAuth.displayName, gAuth.providerId, gAuth.userId, gAuth.photoURL));
                            }
                        } else {
                            return dispatch(profileActions.startAddUserProfile(gAuth.email, gAuth.displayName,
                                gAuth.providerId, gAuth.userId, gAuth.photoURL));
                        }
                    }
                )
            }
        ).then(
            () => {
                return dispatch(startLastLogin());
            }
        )
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
                return dispatch(profileActions.resetUserProfile());
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

        var gUid = getState().auth.uid;

        return requestip.getClientIpAddress().then(
            (clientIp) => {
                gClientIp = clientIp.trim();

                //console.debug("Cleint IP: ", gClientIp);

                let ipInfoPromise = requestip.getClientLocationByIpAddress(gClientIp).then((response) => {
                    var newLoginInfo = {};
                    newLoginInfo.ipAddress = gClientIp;
                    newLoginInfo.loginAt = moment().unix();
                    //console.debug("ipInfoPromise", response);
                    newLoginInfo.country = response.country;
                    newLoginInfo.city = response.city;
                    Promise.resolve();
                    return (newLoginInfo);
                }).catch((error) => {
                    console.log("ipInfoPromise", error);
                });

                var lastLoginRef = firebaseRef.child(`users/${gUid}/userProfile/lastLogins`);

                let firebasePromise = lastLoginRef.once('value').then(
                    (snapshot) => {
                        var lastLogins = snapshot.val() || {};

                        const lastLoginsSize = Object.keys(lastLogins).length;

                        var parsedLastLogins = [];

                        Object.keys(lastLogins).forEach((lastLogin) => {
                            parsedLastLogins.push({
                                id: lastLogin,
                                ...lastLogins[lastLogin]
                            });
                        })

                        var lastLoginInfo = {};

                        if (lastLoginsSize > 0) {
                            const obj = parsedLastLogins[lastLoginsSize - 1];
                            lastLoginInfo.loginAt = obj.loginAt;
                            lastLoginInfo.city = obj.city;
                            lastLoginInfo.country = obj.country;
                        }

                        //we need to keep only two logins history

                        if (lastLoginsSize > 1) {
                            for (var i = 0; i < (lastLoginsSize - 1); i++) {
                                var deletItem = parsedLastLogins[i].id;
                                lastLoginRef.child(`${deletItem}`).remove().then(() => {
                                });
                            }
                        }

                        parsedLastLogins = null;
                        //console.debug("dispatch lastLoginInfo:", lastLoginInfo);
                        Promise.resolve();
                        return (lastLoginInfo);
                    }).catch((error) => {
                    console.log("firebasePromise", error);
                });

                Promise.all([ipInfoPromise, firebasePromise]).then((values) => {
                        const newLogin = values[0];
                        const oldLogin = values[1];
                        //console.debug("Promise.all-1", newLogin);
                        //console.debug("Promise.all-2", oldLogin);

                        return lastLoginRef.push(newLogin).then(() => {
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
            }).catch((error)=>{
            console.debug("Error getClientIpAddress", error);
        });
    }
};

export var startGetLastLogin = () => {
    return (dispatch, getState) => {
        var uid = getState().auth.uid;
        var lastLoginRef = firebaseRef.child(`users/${uid}/userProfile/lastLogins`);
        return lastLoginRef.once('value').then((snapshot) => {
            var lastLogins = snapshot.val() || {}; //return available data or empty object

            var parsedLastLogins = [];

            Object.keys(lastLogins).forEach((lastLogin) => {
                parsedLastLogins.push({
                    id: lastLogin,
                    ...lastLogins[lastLogin]
                });
            });

            var lastLoginInfo = {};

            const lastLoginsSize = Object.keys(lastLogins).length;

            if (lastLoginsSize > 0) {
                const obj = parsedLastLogins[lastLoginsSize - 1];
                lastLoginInfo.loginAt = obj.loginAt;
                lastLoginInfo.city = obj.city;
                lastLoginInfo.country = obj.country;
            }

            dispatch(lastLogin(lastLoginInfo));

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