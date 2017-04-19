import moment from 'moment';
import requestip from 'clientIpAddress';
import firebase, {firebaseRef, githubProvider} from 'app/firebase/index';

//<editor-fold desc="Search">

export var setSearchText = (searchText) => {
    return {
        type: 'SET_SEARCH_TEXT',
        searchText
    };
};

//</editor-fold>

//<editor-fold desc="**** Old Stuff ****>

export var addTodoItem = (todoItem) => {
    return {
        type: 'ADD_TODO_ITEM',
        todoItem
    };
};

export var startAddTodoItems = (text) => {
    return (dispatch, getState) => {
        var todoItem = {
            text: text,
            completed: false,
            createDate: moment().unix(),
            completeDate: null
        }

        var uid = getState().auth.uid;
        var todoItemRef = firebaseRef.child(`users/${uid}/todoItems`).push(todoItem);
        return todoItemRef.then(() => {
            dispatch(addTodoItem({
                ...todoItem,
                id: todoItemRef.key
            }));
        });

    };
};

export var addTodoItems = (todoItems) => {
    return {
        type: 'ADD_TODO_ITEMS',
        todoItems
    };
};

export var startTodoAddItems = () => {
    return (dispatch, getState) => {
        var uid = getState().auth.uid;
        var todoItemRef = firebaseRef.child(`users/${uid}/todoItems`);

        return todoItemRef.once('value').then((snapshot) => {
            var todoItems = snapshot.val() || {}; //return available data or empty object

            var parsedTodoItems = [];

            Object.keys(todoItems).forEach((todoItemId) => {
                parsedTodoItems.push({
                    id: todoItemId,
                    ...todoItems[todoItemId]
                });
            });

            dispatch(addTodoItems(parsedTodoItems));
        });
    };
};

export var togggleShowCompletedItem = () => {
    return {
        type: 'TOGGLE_SHOW_COMPLETED'
    };
};

export var updateTodoItem = (id, updates) => {
    return {
        type: 'UPDATE_TODO_ITEM',
        id,
        updates
    };
};

export var startToggleTodoItem = (id, completed) => {
    return (dispatch, getState) => {
        var uid = getState().auth.uid;
        //var todoItemRef = firebaseRef.child('users/'+ uid +'/todoItems/' + id); //ES5 syntax
        var todoItemRef = firebaseRef.child(`users/${uid}/todoItems/${id}`); //ES6 syntaxt

        var updates = {
            completed,
            completeDate: completed ? moment().unix() : null
        };

        return todoItemRef.update(updates).then(() => {  //return needed to chain our tests
            dispatch(updateTodoItem(id, updates));
        });


    };
};

//</editor-fold>

//<editor-fold desc="Error">

export var bbzReportError = (error) => {
    return {
        type: 'BBZ_REPORT_ERROR',
        error
    };
};

export var bbzClearError = () => {
    return {
        type: 'BBZ_CLEAR_ERROR'
    };
};

//</editor-fold>

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
            console.log("Auth worked!", result);

            gAuth = {
                uid: result.user.uid,
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                loggedIn: true
            };
            console.log("Auth data!", gAuth);
            return dispatch(bbzLogin(gAuth));
        }, (error) => {
            console.log("Unable to auth", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(bbzReportError(errorObj));
        }).then(
            () => {
                return dispatch(startSetUserProfile()).then(
                    () => {
                        var timestamp = getState().userProfile.createDate;
                        if (timestamp) {
                            console.debug("User profile created on: ", moment.unix(timestamp).format('MMM Do, YYYY @ h:mm a'));
                        } else {
                            return dispatch(startAddUserProfile(gAuth.email, gAuth.displayName));
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

//<editor-fold desc="Email Login">

export var startBbzEmailLogin = (email, password) => {
    var gAuth;
    return (dispatch, getState) => {
        return firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
            console.log("Auth with Email and Password worked!", result);

            gAuth = {
                uid: result.uid,
                displayName: email,
                email: result.email,
                photoURL: null,
                loggedIn: true
            };

            console.debug("Auth data!", gAuth);

            return dispatch(bbzLogin(gAuth));
        }, (error) => {
            console.log("Unable to auth", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(bbzReportError(errorObj));
        }).then(
            () => {
                return dispatch(startSetUserProfile()).then(
                    () => {
                        var timestamp = getState().userProfile.createDate;
                        if (timestamp) {
                            console.debug("User profile created on: ", moment.unix(timestamp).format('MMM Do, YYYY @ h:mm a'));
                        } else {
                            return dispatch(startAddUserProfile(gAuth.email, gAuth.displayName));
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
            console.log("Logggedout!");
            return dispatch(bbzLogout());
        }).then(
            () => {
                return dispatch(resetUserProfile());
            }
        );
    };
};

//</editor-fold>

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
            return dispatch(bbzLogin(gAuth));
        }, (error) => {
            console.log("Unable to create new Account", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(bbzReportError(errorObj));
        }).then(
            () => {
                return dispatch(startSetUserProfile()).then(
                    () => {
                        var timestamp = getState().userProfile.createDate;
                        if (timestamp) {
                            console.debug("User profile created on: ", moment.unix(timestamp).format('MMM Do, YYYY @ h:mm a'));
                        } else {
                            return dispatch(startAddUserProfile(gAuth.email, gAuth.displayName));
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

//<editor-fold desc="Password Reset">

export var startSendPasswordResetEmail = (email) => {
    console.log("Start Create New Account !");
    return (dispatch, getState) => {
        return firebase.auth().sendPasswordResetEmail(email).then((result) => {
            console.log("Reset Password Email Sent!", result);

            /* var auth = {
             uid: result.user.uid,
             displayName: result.user.displayName,
             email: result.user.email,
             photoURL: result.user.photoURL,
             loggedIn: true
             };*/
            // console.log("Auth data!", auth);
            return dispatch(bbzClearError());
        }, (error) => {
            console.log("Unable to sent Password reset email", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(bbzReportError(errorObj));
        });
    };
};

//</editor-fold>

//<editor-fold desc="Navigation">

export var setRedirectUrl = (currentURL) => {
    return {
        type: 'SET_REDIRECT_URL',
        currentURL
    };
}


export var navigateTo = (navigateToUrl) => {
    return {
        type: 'NAVIGATE_TO_URL',
        navigateToUrl
    };
}

//</editor-fold>

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

export var startSetUserProfile = () => {
    return (dispatch, getState) => {
        var uid = getState().auth.uid;
        var bbzProfileRef = firebaseRef.child(`users/${uid}/userProfile`);
        return bbzProfileRef.once('value').then((snapshot) => {
            var profile = snapshot.val() || {}; //return available data or empty object
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


export var startAddUserProfile = (email, displayName) => {
    console.log("Start Add User Profile!");
    return (dispatch, getState) => {
        var profile = {
            displayName: displayName,
            email: email,
            createDate: moment().unix()
        }

        var uid = getState().auth.uid;
        var profileRef = firebaseRef.child(`users/${uid}`);
        return profileRef.update({userProfile: profile}).then(() => {
                dispatch(addUserProfile(profile));
            }
        )
    };
};
//</editor-fold>

//<editor-fold desc="lastLogins">
export var lastLogin = (lastLoginInfo) => {
    console.debug("lastLogin", lastLoginInfo);
    return {
        type: 'ADD_LAST_LOGIN',
        lastLoginInfo
    };
};

export var startLastLogin = () => {
    var gAuth;
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

//</editor-fold>

//<editor-fold desc="reviews">

export var reviews = (review) => {
    return {
        type: 'ADD_REVIEW',
        review
    };
};

//</editor-fold>

//<editor-fold desc="companies">
export var companies = (company) => {
    return {
        type: 'ADD_COMPANY',
        company
    };
};
//</editor-fold>




