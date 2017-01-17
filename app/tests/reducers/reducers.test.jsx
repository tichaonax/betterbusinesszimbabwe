var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');

describe('Reducers', () => {
    describe('searchTextReducer', () => {
        it('should set searchText', () => {
            var action = {
                type: 'SET_SEARCH_TEXT',
                searchText: 'Welcome'
            };

            var response = reducers.searchTextReducer(df(''), df(action));
            expect(response).toEqual(action.searchText);

        });

    });


    describe('showCompletedReducer', () => {
        it('should set toggle show completed', () => {
            var action = {
                type: 'TOGGLE_SHOW_COMPLETED'
            };

            var response = reducers.showCompletedReducer(df(false), df(action));
            expect(response).toEqual(true);

        });


    });
    describe('todoItemReducer', () => {
        it('should add a new  todoItem', () => {
            var action = {
                type: 'ADD_TODO_ITEM',
                text: 'Feed the baby'
            };

            var response = reducers.todoItemsReducer(df([]), df(action));
            console.log(response);

            expect(response.length).toEqual(1);

            expect(response[0].id).toBeA('string');
            expect(response[0].text).toEqual(action.text);
            expect(response[0].createDate).toBeA('number');
            expect(response[0].completed).toBe(false);
            expect(response[0].completeDate).toBe(undefined);

        });


        it('should toggle todoItem', () => {

            var todoItems = [
                {
                    id: '84a6f82e-8420-4c9a-a6b0-51a68992c455',
                    text: 'Feed the baby',
                    completed: false,
                    createDate: 1484658469,
                    completeDate: undefined
                }
            ];

            var action = {
                type: 'TOGGLE_TODO_ITEM',
                id: '84a6f82e-8420-4c9a-a6b0-51a68992c455'
            };

            var response = reducers.todoItemsReducer(df(todoItems), df(action));
            console.log(response);

            expect(response.length).toEqual(1);
            expect(response[0].id).toEqual(action.id);
            expect(response[0].text).toEqual(todoItems[0].text);
            expect(response[0].createDate).toEqual(todoItems[0].createDate);
            expect(response[0].completed).toBe(true);
            expect(response[0].completeDate).toBeA('number');

        });

        it('should add existing todoItems', () => {

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

            var response = reducers.todoItemsReducer(df([]), df(action));
            console.log(response);

            expect(response.length).toEqual(2);

            expect(response[0].id).toEqual(todoItems[0].id);
            expect(response[1].createDate).toEqual(todoItems[1].createDate);
        });

    });
});