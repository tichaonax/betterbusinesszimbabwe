export var firebaseAuthReducer = (state = {}, action) => {
    switch (action.type) {
        case 'TODO_LOGIN':
            console.log(action);
            return {
                auth: action.auth
            };
        case 'TODO_LOGOUT':
            return {};
        default:
            return state;
    }
    ;
};


export var searchTextReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    }
    ;
};

export var todoItemsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO_ITEM':
            return [
                //preserve original todoItems then add a new one
                ...state,
                action.todoItem
            ];
        case 'UPDATE_TODO_ITEM':
            return state.map((todoItem) => {
                //toggle the completed status of the matching id
                if (todoItem.id === action.id) {
                    return {
                        ...todoItem,
                        ...action.updates
                    }

                } else {
                    //no match return unmodified
                    return todoItem;
                }
            });

        case 'ADD_TODO_ITEMS':
            return [
                //preserve original todoItems then add a new ones passed in
                ...state,
                ...action.todoItems
            ];

        default:
            return state;
    }
    ;
};

export var showCompletedReducer = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_SHOW_COMPLETED':
            return !state;
        default:
            return state;
    }
    ;
};

