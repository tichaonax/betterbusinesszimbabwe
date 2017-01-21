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

export var togggleShowCompletedItem = () => {
    return {
        type: 'TOGGLE_SHOW_COMPLETED'
    };
};

export var toggleTodoItem = (id) => {
    return {
        type: 'TOGGLE_TODO_ITEM',
        id
    };
};





