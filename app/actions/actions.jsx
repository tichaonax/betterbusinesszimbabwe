export var setSearchText = (searchText) => {
    return {
        type: 'SET_SEARCH_TEXT',
        searchText
    };
};

export var addTodoItem = (text) => {
    return {
        type: 'ADD_TODO_ITEM',
        text
    };
};

export var togggleShowCompletedItem = () => {
    return {
        type: 'TOGGLE_SHOW_COMPLETED'
    };
};

export var toggleTodoItem = (id) => {
    return {
        type: 'TOGGLE_TODO_ITEM',
        id
    };
};



