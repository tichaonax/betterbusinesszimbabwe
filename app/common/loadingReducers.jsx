export var loadingReducer = (state = {loaded: false}, action) => {
    switch (action.type) {
        case 'SET_LOADING_STATUS':
            return ({
                ...state,
                loaded: action.loaded
            });

        default:
            return state;
    };
};