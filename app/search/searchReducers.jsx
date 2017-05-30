export var searchTextReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    };
};

export var searchOptionsReducer = (state = {pending: false, showButton: false}, action) => {
    switch (action.type) {
        case 'TOGGLE_SHOW_APPROVAL_PENDING':
            return ({
                ...state,
                pending: !state.pending
            });
        case 'SET_SHOW_APPROVAL_PENDING':
            return ({
                ...state,
                pending: action.pending
            });
        case 'SET_SEARCH_BUTTON':
            console.debug("showButton", action.showButton);
            return ({
                ...state,
                showButton: action.showButton
            });
        default:
            return state;
    };
};