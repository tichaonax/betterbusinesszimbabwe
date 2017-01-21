import moment from 'moment';
import firebase, {firebaseRef} from 'app/firebase/index';

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

        var todoItemRef = firebaseRef.child('todoItems').push(todoItem);
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
    //debugger;
    return (dispatch, getState) => {
        var todoItemRef = firebaseRef.child("todoItems");

        return todoItemRef.once('value').then((snapshot) => {
            var todoItems = snapshot.val() || {}; //return available data or empty object
            console.log("todoItems", todoItems);
            var parsedTodoItems = [];

            Object.keys(todoItems).forEach((todoItemId) => {
                parsedTodoItems.push({
                    id: todoItemId,
                    ...todoItems[todoItemId]
                });
            });
            console.log(parsedTodoItems);
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
        //var todoItemRef = firebaseRef.child('todoItems/' + id); //ES5 syntax
        var todoItemRef = firebaseRef.child(`todoItems/${id}`); //ES6 syntaxt

        var updates = {
            completed,
            completeDate: completed ? moment().unix() : null
        };

        return todoItemRef.update(updates).then(() => {  //return needed to chain our tests
            dispatch(updateTodoItem(id, updates));
        });


    };
};


