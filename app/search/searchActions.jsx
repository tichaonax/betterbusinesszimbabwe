
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
//</editor-fold>
