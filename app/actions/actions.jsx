import moment from 'moment';
import firebase, {firebaseRef, githubProvider} from 'app/firebase/index';

export var todoLogin = (auth) => {
    return {
        type: 'TODO_LOGIN',
        auth
    };
};

export var todoLogout = () => {
    return {
        type: 'TODO_LOGOUT'
    };
};

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

export var starTodotLogin = () => {
    return (dispatch, getState) => {
        return firebase.auth().signInWithPopup(githubProvider).then((result) => {
            console.log("Auth worked!", result);

            var auth = {
                uid: result.user.uid,
                displayName: result.user.displayName
            };

            //call dispatch here to set the state
            return dispatch(todoLogin(auth));
        }, (error) => {
            console.log("Unable to auth", error);
        });
    };
};


export var startTodoLogout = () => {
    return (dispatch, getState) => {
        return firebase.auth().signOut().then(() => {
            console.log("Logggedout!")
        });
    };
};



