export var userItemsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_USER_ITEM':
            return [
                //preserve original userItems then add a new one
                ...state,
                action.userItem
            ];
            break;

        case 'UPDATE_USER_ITEM':
            return state.map((userItem) => {
                //replace with updated item
                if (userItem.userItemId === action.userItemId) {
                    //console.debug("MATCH",action.updates);
                    return {
                        ...userItem,
                        ...action.updates
                    }

                } else {
                    //no match return unmodified
                    return userItem;
                }
            });
            break;
        case 'ADD_USER_ITEMS':
            return action.userItems;
            break;
        default:
            return state;
    };
};