export var searchTextReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    };
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

export var firebaseAuthReducer = (state = {loggedIn: false}, action) => {
    switch (action.type) {
        case 'BBZ_LOGIN':
            return {
                ...action.auth
            };
        case 'BBZ_LOGOUT':
            return {loggedIn: false};
        default:
            return state;
    };
};


export var showCompletedReducer = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_SHOW_COMPLETED':
            return !state;
        default:
            return state;
    };
};


export var setRedirectUrlReducer = (state = '/', action) => {
    switch (action.type) {
        case 'SET_REDIRECT_URL':
            return action.currentURL;
        default:
            return state;
    };
};


export var navigateToReducer = (state = '/', action) => {
    switch (action.type) {
        case 'NAVIGATE_TO_URL':
            return action.navigateToUrl;
        default:
            return state;
    };
};

export var bbzErrorReducer = (state = null, action) => {
    switch (action.type) {
        case 'BBZ_REPORT_ERROR':
            return action.error;
        case 'BBZ_CLEAR_ERROR':
            return null;
        default:
            return state;
    }
};

export var userProfileReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_USER_PROFILE':
            return action.profile;
        case 'ADD_USER_PROFILE':
            return action.profile;
        default:
            return state;
    };
};
