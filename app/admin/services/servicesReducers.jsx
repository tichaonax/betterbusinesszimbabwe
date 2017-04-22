export var serviceItemsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_SERVICE_ITEM':
            return [
                //preserve original serviceItems then add a new one
                ...state,
                action.serviceItem
            ];
        case 'UPDATE_SERVICE_ITEM':
            return state.map((serviceItem) => {
                //replace with updated item
                if (serviceItem.serviceItemId === action.serviceItemId) {
                    return {
                        ...serviceItem,
                        ...action.updates
                    }

                } else {
                    //no match return unmodified
                    return serviceItem;
                }
            });
        case 'DELETE_SERVICE_ITEM':
            return state.map((serviceItem) => {
                //toggle the completed status of the matching id
                if (serviceItem.serviceItemId === action.serviceItemId) {
                    //do nothing
                } else {
                    //no match return unmodified
                    return serviceItem;
                }
            });

        case 'ADD_SERVICE_ITEMS':
            return [
                //preserve original serviceItems then add a new ones passed in
                ...state,
                ...action.serviceItems
            ];
        default:
            return state;
    };
};

