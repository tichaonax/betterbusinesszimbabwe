export var userItemsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_USER_ITEM':
            return [
                //preserve original userItems then add a new one
                ...state,
                action.userItem
            ];

        case 'ADD_USER_ITEMS':
            return action.userItems;

        default:
            return state;
    };
};