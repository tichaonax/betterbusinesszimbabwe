//<editor-fold desc="Navigation">

export var setRedirectUrl = (currentURL) => {
    return {
        type: 'SET_REDIRECT_URL',
        currentURL
    };
}


export var navigateTo = (navigateToUrl) => {
    return {
        type: 'NAVIGATE_TO_URL',
        navigateToUrl
    };
}

//</editor-fold>
