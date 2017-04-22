export var bbzErrorReducer = (state = null, action) => {
    switch (action.type) {
        case 'BBZ_REPORT_ERROR':
            return action.error;
        case 'BBZ_CLEAR_ERROR':
            return null;
        default:
            return state;
    }
};
