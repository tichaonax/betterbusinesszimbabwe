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
    console.log("Start Login !");
    return (dispatch, getState) => {
        return firebase.auth().signInWithPopup(provider).then((result) => {
            console.log("Auth worked!", result);

             var auth = {
                 uid: result.user.uid,
                 displayName: result.user.displayName,
                 email: result.user.email,
                 photoURL: result.user.photoURL,
                 loggedIn: true
             };
            console.log("Auth data!", auth);
            return dispatch(bbzLogin(auth));
        }, (error) => {
            console.log("Unable to auth", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(bbzReportError(errorObj));
        });
    };
};

export var startBbzEmailLogin = (email, password) => {
    console.log("Start Email Login !");
    return (dispatch, getState) => {
        return firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
            console.log("Auth with Email and Password worked!", result);

            var auth = {
                uid: result.uid,
                displayName: result.email,
                email: result.email,
                photoURL: null,
                loggedIn: true
            };

            console.debug("Auth data!", auth);

            return dispatch(bbzLogin(auth));
        }, (error) => {
            console.log("Unable to auth", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(bbzReportError(errorObj));
        });
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
    console.log("Start Create New Account !");
    return (dispatch, getState) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
            console.log("Auth with Email and Password worked!", result);

            var auth = {
                uid: result.user.uid,
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                loggedIn: true
            };
            console.log("Auth data!", auth);
            return dispatch(bbzLogin(auth));
        }, (error) => {
            console.log("Unable to create new Account", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(bbzReportError(errorObj));
        });
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
