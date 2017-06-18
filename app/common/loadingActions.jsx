export var setLoadingStatus = (loaded) => {
    return {
        type: 'SET_LOADING_STATUS',
        loaded
    };
};