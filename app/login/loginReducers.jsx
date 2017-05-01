export var firebaseAuthReducer = (state = {loggedIn: false}, action) => {
    switch (action.type) {
        case 'BBZ_LOGIN':
            return {
                ...action.auth
            };
        case 'BBZ_LOGOUT':
            return {loggedIn: false};
        default:
            return state;
    };
};

export var lastLoginReducer  = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_LAST_LOGIN':
            return {
                ...action.lastLogin
            };
        default:
            return state;
    };
};