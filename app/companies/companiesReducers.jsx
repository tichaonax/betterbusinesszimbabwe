export var companyItemsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_COMPANY_ITEM':
            return [
                //preserve original companyItems then add a new one
                ...state,
                action.companyItem
            ];
        case 'UPDATE_COMPANY_ITEM':
            return state.map((companyItem) => {
                //replace with updated item
                if (companyItem.companyId === action.companyId) {
                    return {
                        ...companyItem,
                        ...action.updates
                    }

                } else {
                    //no match return unmodified
                    return companyItem;
                }
            });
        case 'DELETE_COMPANY_ITEM':
            //remove deleted item
            let toRemoveCompanyItem = state.findIndex((companyItem) => companyItem.companyItemId === action.companyItemId);
            return [
                ...state.slice(0, toRemoveCompanyItem),
                ...state.slice(toRemoveCompanyItem + 1)
            ];

        case 'ADD_COMPANY_ITEMS':
            return action.companyItems;

        default:
            return state;
    };
};

export var companyOperationReducer = (state = {operation: 'ADD'}, action) => {
    switch (action.type) {
        case 'SET_COMPANY_OPERATION':
            return {
                data: action.data,
                operation: action.operation
            };
        default:
            return state;
    }
}

export var recentlyAddedCompanyReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_RECENT_ADD_COMPANY_ITEM':
            return {
                companyId: action.companyId,
                companyTitle: action.companyTitle
            }
        case 'CLEAR_RECENT_ADD_COMPANY_ITEM':
            return '';
        default:
            return state;
    };
};