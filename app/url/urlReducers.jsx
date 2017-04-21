export var setRedirectUrlReducer = (state = '/', action) => {
    switch (action.type) {
        case 'SET_REDIRECT_URL':
            return action.currentURL;
        default:
            return state;
    };
};


export var navigateToReducer = (state = '/', action) => {
    switch (action.type) {
        case 'NAVIGATE_TO_URL':
            return action.navigateToUrl;
        default:
            return state;
    };
};