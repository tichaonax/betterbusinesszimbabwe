export var searchTextReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    }
    ;
};

/*
var nextTodoItemId = 1;
export var todoItemReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO_ITEM':
            return [
                //preserve original todoItems then add a new one
                ...state,
                {
                    id: nextTodoItemId++,
                    completed: action.todoItem.completed,
                    text: action.todoItem.text,
                    createDate: action.todoItem.text
                }
            ];
        case 'REMOVE_TODO_ITEM':
            return state.filter((todoItem) => {
                return todoItem.id !== action.id
            });

        default:
            return state;
    }
    ;
};*/


export var showCompletedReducer = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_SHOW_COMPLETED':
            return !state;
        default:
            return state;
    };
};