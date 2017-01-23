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
                todoItem: {
                    id: '4556723',
                    text: 'Feed the baby',
                    createDate: 1484658469,
                    completed: false
                }
            };

            var response = reducers.todoItemsReducer(df([]), df(action));

            expect(response.length).toEqual(1);

            expect(response[0]).toEqual(action.todoItem);

        });


        it('should toggle todoItem', () => {

            var todoItems = [
                {
                    id: '2345',
                    text: 'Feed the baby',
                    completed: false,
                    createDate: 1484658469,
                    completeDate: undefined
                }
            ];

            var updates = {
                completed: true,
                completeDate: 1484658800
            }

            var action = {
                type: 'UPDATE_TODO_ITEM',
                id: todoItems[0].id,
                updates
            };

            var response = reducers.todoItemsReducer(df(todoItems), df(action));
            //console.log(response);
            expect(response.length).toEqual(1);
            expect(response[0].completeDate).toBeA('number');
            expect(response[0].completeDate).toEqual(updates.completeDate);
            expect(response[0].completed).toEqual(updates.completed);

            //test for not loosing original values
            expect(response[0].text).toEqual(todoItems[0].text);
            expect(response[0].createDate).toEqual(todoItems[0].createDate);

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

            expect(response.length).toEqual(2);

            expect(response[0].id).toEqual(todoItems[0].id);
            expect(response[1].createDate).toEqual(todoItems[1].createDate);
        });

    });

    describe('firebaseAuthReducer', () => {
        it('should login to firebase', () => {

            var uid = 'KYZCgUasdqGdfdf9KZaM797iYUnIA2'
            var displayName = "Tichaona Hwandaza";

            var auth = {
                uid: uid,
                displayName: displayName
            };

            var action = {
                type: 'TODO_LOGIN',
                uid: uid
            };

            var response = reducers.firebaseAuthReducer(df(auth), df(action));
            console.log(JSON.stringify(response));
            expect(response.uid).toEqual(action.uid);
            expect(response.displayName).toEqual(auth.displayName);

        });

        it('should logout from firebase', () => {
            var auth = {};
            var action = {
                type: 'TODO_LOGOUT',
            };

            var response = reducers.firebaseAuthReducer(df(auth), df(action));

            expect(response).toEqual(auth);

        });

    });
});