export var searchTextReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_SEARCH_TEXT':
            //console.debug("searchTextReducer",action.searchText);
            return action.searchText;
        default:
            return state;
    };
};

export var searchOptionsReducer = (state = {
    pending: false,
    showButton: false,
    showMyReviews: false,
    loading: false
}, action) => {
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
            return ({
                ...state,
                showButton: action.showButton
            });
        case 'SET_MY_REVIEWS':
            return ({
                ...state,
                showMyReviews: action.showMyReviews
            });

        default:
            return state;
    };
};