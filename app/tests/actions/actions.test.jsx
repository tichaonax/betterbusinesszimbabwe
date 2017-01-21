import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

var expect = require('expect');

var actions = require('actions');

var createMockStore = configureMockStore([thunk]);

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
            todoItem: {
                id: '45567ffa23',
                text: 'Feed the dod=g',
                createDate: 1484658469,
                completed: false
            }
        };

        var response = actions.addTodoItem(action.todoItem);
        expect(response).toEqual(action);
    });

    it('should create a todoItem and dispatch ADD_TODO_ITEM', (done) => {

        const store = createMockStore({});
        const todoItemText = 'My todoItem text';

        store.dispatch(actions.startAddTodoItems(todoItemText)).then(() => {
            const actions = store.getActions();
            console.log(actions);
            expect(actions[0]).toInclude({
                type: 'ADD_TODO_ITEM'
            });
            expect(actions[0].todoItem).toInclude({
                text: todoItemText
            });
            done(); //test is done--- increase timeout in karma configuration file if needed
        }).catch(done)
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
