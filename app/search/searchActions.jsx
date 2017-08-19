
//<editor-fold desc="Search">

export var setSearchText = (searchText) => {
    return {
        type: 'SET_SEARCH_TEXT',
        searchText
    };
};

export var togggleshowApprovalPendingItem = () => {
    return {
        type: 'TOGGLE_SHOW_APPROVAL_PENDING'
    };
};

export var setApprovalPendingItem = (pending) => {
    return {
        type: 'SET_SHOW_APPROVAL_PENDING',
        pending
    };
};

export var setSearchButton = (showButton) => {
    return {
        type: 'SET_SEARCH_BUTTON',
        showButton
    };
};

export var setUserReviews = (showUserReviews, userId) => {
    return {
        type: 'SET_USER_REVIEWS',
        showUserReviews,
        userId
    };
};

export var setPendingCount = (pendingCount) => {
    return {
        type: 'SET_PENDING_COUNT',
        pendingCount
    };
};

export var setListCount = (listCount) => {
    return {
        type: 'SET_LIST_COUNT',
        listCount
    };
};

export var setCompanyReviews = (showCompanyReviews, companyId) => {
    return {
        type: 'SET_COMPANY_REVIEWS',
        showCompanyReviews,
        companyId
    };
};
//</editor-fold>
