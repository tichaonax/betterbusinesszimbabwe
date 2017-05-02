export var searchTextReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    };
};

export var showApprovalPendingReducer = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_SHOW_APPROVAL_PENDING':
            return !state;
        case 'SET_SHOW_APPROVAL_PENDING':
            return action.flag
        default:
            return state;
    };
};;