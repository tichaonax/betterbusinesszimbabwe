
export var reviewItemsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_REVIEW_ITEM':
            return [
                //preserve original reviewItems then add a new one
                ...state,
                action.reviewItem
            ];
        case 'UPDATE_REVIEW_ITEM':
            return state.map((reviewItem) => {
                //replace with updated item
                if (reviewItem.reviewItemId === action.reviewItemId) {
                    return {
                        ...reviewItem,
                        ...action.updates
                    }

                } else {
                    //no match return unmodified
                    return reviewItem;
                }
            });
        case 'DELETE_REVIEW_ITEM':
            //remove deleted item
            let toRemoveReviewItem = state.findIndex((reviewItem) => reviewItem.reviewItemId === action.reviewItemId);
            return [
                ...state.slice(0, toRemoveReviewItem),
                ...state.slice(toRemoveReviewItem + 1)
            ];

        case 'ADD_REVIEW_ITEMS':
            return action.reviewItems;

        default:
            return state;
    };
};

export var reviewOperationReducer = (state = {operation: 'ADD'}, action) => {
    switch (action.type) {
        case 'SET_REVIEW_OPERATION':
            return {
                data: action.data,
                operation: action.operation
            };
        default:
            return state;
    }
}

