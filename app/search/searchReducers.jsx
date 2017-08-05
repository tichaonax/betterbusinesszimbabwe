export var searchTextReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_SEARCH_TEXT':
            //console.debug("searchTextReducer",action.searchText);
            return action.searchText;
        default:
            return state;
    };
};

export var countsReducer = (state = {pendingCount: 0, listCount: 0}, action) => {
    switch (action.type) {
        case 'SET_PENDING_COUNT':
            return {
                ...state,
                pendingCount: action.pendingCount
            }
        case 'SET_LIST_COUNT':
            return {
                ...state,
                listCount: action.listCount
            }
        default:
            return state;
    };
};

export var searchOptionsReducer = (state = {
    pending: false,
    showButton: false,
    showUserReviews: false,
    loading: false,
    userId: 0
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
        case 'SET_USER_REVIEWS':
            return ({
                ...state,
                showUserReviews: action.showUserReviews,
                userId: action.userId
            });

        default:
            return state;
    };
};