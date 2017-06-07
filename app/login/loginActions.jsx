import moment from 'moment';
import requestip from 'clientIpAddress';
import firebase, {firebaseRef, githubProvider} from 'app/firebase/index';

var errorActions = require('errorActions');
var profileActions = require('profileActions');

//<editor-fold desc="Login">

export var bbzLogin = (auth) => {
    return {
        type: 'BBZ_LOGIN',
        auth
    };
};

//</editor-fold>

//<editor-fold desc="Provider Login">

export var startBbzLogin = (provider) => {
    var gAuth;
    return (dispatch, getState) => {
        return firebase.auth().signInWithPopup(provider).then((result) => {
            console.debug("Auth worked!", result);

            gAuth = {
                uid: result.user.uid,
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                loggedIn: true
            };
            console.debug("Auth data!", gAuth);
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
                            console.debug("User profile created on: ", moment.unix(timestamp).format('MMM Do, YYYY @ h:mm a'));
                        } else {
                            return dispatch(profileActions.startAddUserProfile(gAuth.email, gAuth.displayName));
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

            gAuth = {
                uid: result.uid,
                displayName: email,
                email: result.email,
                photoURL: null,
                loggedIn: true,
            };

            console.debug("Auth data!", gAuth);

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
                            console.debug("User profile created on: ", moment.unix(timestamp).format('MMM Do, YYYY @ h:mm a'));
                        } else {
                            return dispatch(profileActions.startAddUserProfile(gAuth.email, gAuth.displayName));
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
            console.debug("Logggedout!");
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
    console.debug("lastLogin", lastLogin);
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

                console.debug("Cleint IP: ", gClientIp);

                let ipInfoPromise = requestip.getClientLocationByIpAddress(gClientIp).then((response) => {
                    var newLoginInfo = {};
                    newLoginInfo.ipAddress = gClientIp;
                    newLoginInfo.loginAt = moment().unix();
                    console.debug("ipInfoPromise", response);
                    newLoginInfo.country = response.country;
                    newLoginInfo.city = response.city;
                    Promise.resolve();
                    return (newLoginInfo);
                });

                var lastLoginRef = firebaseRef.child(`users/${gUid}/userProfile/lastLogins`);

                let firebasePromise = lastLoginRef.once('value').then(
                    (snapshot) => {
                        var lastLogins = snapshot.val() || {};

                        console.debug("lastLogins,", lastLogins);
                        const lastLoginsSize = Object.keys(lastLogins).length;
                        console.debug("lastLoginsSize:", lastLoginsSize);

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

                        parsedLastLogins = null;
                        console.debug("dispatch lastLoginInfo:", lastLoginInfo);
                        Promise.resolve();
                        return (lastLoginInfo);
                    });

                Promise.all([ipInfoPromise, firebasePromise]).then((values) => {
                        const newLogin = values[0];
                        const oldLogin = values[1];
                        console.debug("Promise.all-1", newLogin);
                        console.debug("Promise.all-2", oldLogin);
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

