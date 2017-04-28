
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
//</editor-fold>
