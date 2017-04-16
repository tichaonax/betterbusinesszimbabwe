import moment from 'moment';
import firebase, {firebaseRef, githubProvider} from 'app/firebase/index';

export var setSearchText = (searchText) => {
    return {
        type: 'SET_SEARCH_TEXT',
        searchText
    };
};

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

export var bbzLogin = (auth) => {
    return {
        type: 'BBZ_LOGIN',
        auth
    };
};

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
            ()=>{
                return dispatch(startSetUserProfile()).then(
                    ()=>{
                        var timestamp = getState().userProfile.createDate;
                        if(timestamp){
                            console.debug("User profile created on: ", moment.unix(timestamp).format('MMM Do, YYYY @ h:mm a') );
                        }else{
                            return dispatch(startAddUserProfile(gAuth.email, gAuth.displayName));
                        }
                    }
                )
            }
        )
    };
};

export var startBbzEmailLogin = (email, password) => {
    var gAuth;
    return (dispatch, getState) => {
        return firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
            console.log("Auth with Email and Password worked!", result);

            gAuth = {
                uid: result.uid,
                displayName: result.email,
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
            ()=>{
                return dispatch(startSetUserProfile()).then(
                    ()=>{
                        var timestamp = getState().userProfile.createDate;
                        if(timestamp){
                            console.debug("User profile created on: ", moment.unix(timestamp).format('MMM Do, YYYY @ h:mm a') );
                        }else{
                            return dispatch(startAddUserProfile(gAuth.email, gAuth.displayName));
                        }
                    }
                )
            }
        )
    };
};


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
        });
    };
};

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
            ()=>{
                return dispatch(startSetUserProfile()).then(
                    ()=>{
                        var timestamp = getState().userProfile.createDate;
                        if(timestamp){
                            console.debug("User profile created on: ", moment.unix(timestamp).format('MMM Do, YYYY @ h:mm a') );
                        }else{
                            return dispatch(startAddUserProfile(gAuth.email, gAuth.displayName));
                        }
                    }
                )
            }
        )
    };
};

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


//// User Profile

export var setUserProfile = (profile) => {
    return {
        type: 'SET_USER_PROFILE',
        profile
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




