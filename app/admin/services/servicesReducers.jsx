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
            //remove deleted item
            let toRemoveServiceItem = state.findIndex((serviceItem) => serviceItem.serviceItemId === action.serviceItemId);
            return [
                ...state.slice(0, toRemoveServiceItem),
                ...state.slice(toRemoveServiceItem + 1)
            ];

        case 'ADD_SERVICE_ITEMS':
            /*return [
                //preserve original serviceItems then add a new ones passed in
                ...state,
                ...action.serviceItems
            ];*/
            return action.serviceItems;

        default:
            return state;
    };
};

export var serviceOperationReducer = (state = {operation: 'ADD'}, action) => {
    switch (action.type) {
        case 'SET_SERVICE_OPERATION':
            return {
                data: action.data,
                operation: action.operation
            };
        default:
            return state;
    }
}

