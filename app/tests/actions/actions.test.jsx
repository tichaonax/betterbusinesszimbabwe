var expect = require('expect');

var actions = require('actions');

describe('Actions', () => {

    it('should generate a search text action', () => {
        var action = {
            type: 'SET_SEARCH_TEXT',
            searchText: 'Welcome'
        };

        var response = actions.setSearchText(action.searchText);
        expect(response).toEqual(action);
    });


    it('should generate addTodoItem action', () => {
        var action = {
            type: 'ADD_TODO_ITEM',
            text: 'Feed the children'
        };

        var response = actions.addTodoItem(action.text);
        expect(response).toEqual(action);
    });


    it('should generate addTodoItems action', () => {
        var todoItems = [
            {
                id: 1,
                text: 'Do something',
                completed: false,
                completeDate: undefined,
                createDate: 5000
            }, {
                id: 2,
                text: 'Water the plants',
                completed: false,
                completeDate: undefined,
                createDate: 6000
            }];

        var action = {
            type: 'ADD_TODO_ITEMS',
            todoItems: todoItems
        };

        var response = actions.addTodoItems(todoItems);
        expect(response).toEqual(action);
    });

    it('should generate toggle show completed action', () => {
        var action = {
            type: 'TOGGLE_SHOW_COMPLETED'
        };

        var response = actions.togggleShowCompletedItem();
        expect(response).toEqual(action);
    });


    it('should generate toggle todoItem action', () => {
        var action = {
            type: 'TOGGLE_TODO_ITEM',
            id: 4
        };

        var response = actions.toggleTodoItem(4);
        expect(response).toEqual(action);
    });


});
