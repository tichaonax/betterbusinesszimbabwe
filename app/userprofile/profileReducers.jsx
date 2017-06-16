export var userProfileReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_USER_PROFILE':
            return action.profile;
        case 'ADD_USER_PROFILE':
            return action.profile;
        case 'RESET_USER_PROFILE':
            return null
        case 'ADD_LAST_LOGIN':
            return {
                ...state,
                lastLogins: {
                    ...action.lastLoginInfo
                }
            }
        case 'UPDATE_USER_PROFILE':
            return {
                ...state,
                ...action.updates
            }
        default:
            return state;
    };
};
