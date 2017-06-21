export var navigationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NAV_PAGE':
            //console.debug("navigationReducer", action.navPage);
            return action.navPage;
        default:
            return state;
    };
};