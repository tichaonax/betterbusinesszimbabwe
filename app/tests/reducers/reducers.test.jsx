var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');

describe('Reducers', () => {

    describe('searchTextReducer', () => {
        it('should set searchText', () => {
            const action = {
                type: 'SET_SEARCH_TEXT',
                searchText: 'Welcome'
            };

            const response = reducers.searchTextReducer(df(''), df(action));
            expect(response).toEqual(action.searchText);

        });

    });


    describe('showCompletedReducer', () => {
        it('should set toggle show completed', () => {
            const action = {
                type: 'TOGGLE_SHOW_COMPLETED'
            };

            const response = reducers.showCompletedReducer(df(false), df(action));
            expect(response).toEqual(true);

        });


    });
    describe('todoItemReducer', () => {
        it('should add a new  todoItem', () => {
            const action = {
                type: 'ADD_TODO_ITEM',
                todoItem: {
                    id: '4556723',
                    text: 'Feed the baby',
                    createDate: 1484658469,
                    completed: false
                }
            };

            const response = reducers.todoItemsReducer(df([]), df(action));

            expect(response.length).toEqual(1);
            expect(response[0]).toEqual(action.todoItem);

        });


        it('should toggle todoItem', () => {

            const todoItems = [
                {
                    id: '2345',
                    text: 'Feed the baby',
                    completed: false,
                    createDate: 1484658469,
                    completeDate: undefined
                }
            ];

            const updates = {
                completed: true,
                completeDate: 1484658800
            }

            const action = {
                type: 'UPDATE_TODO_ITEM',
                id: todoItems[0].id,
                updates
            };

            const response = reducers.todoItemsReducer(df(todoItems), df(action));
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

            const todoItems = [
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


            const action = {
                type: 'ADD_TODO_ITEMS',
                todoItems: todoItems
            };

            const response = reducers.todoItemsReducer(df([]), df(action));

            expect(response.length).toEqual(2);
            expect(response[0].id).toEqual(todoItems[0].id);
            expect(response[1].createDate).toEqual(todoItems[1].createDate);
        });

        it('should wipe out todoItems on logout', () => {

            const todoItems = [
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


            const action = {
                type: 'TODO_LOGOUT',
            };

            const response = reducers.todoItemsReducer(df(todoItems), df(action));

            expect(response.length).toEqual(0);
        });

    });

    describe('firebaseAuthReducer', () => {
        it('should login to firebase', () => {

            const uid = 'KYZCgUasdqGdfdf9KZaM797iYUnIA2'
            const displayName = "Tichaona Hwandaza";

            const auth = {
                uid: uid,
                displayName: displayName
            };

            const action = {
                type: 'TODO_LOGIN',
                auth: auth
            };

            const response = reducers.firebaseAuthReducer(undefined, df(action));
            expect(response.uid).toEqual(uid);
            expect(response.displayName).toEqual(displayName);

        });

        it('should logout from firebase', () => {
            const action = {
                type: 'TODO_LOGOUT',
            };

            const response = reducers.firebaseAuthReducer(undefined, df(action));
            expect(response).toEqual({});

        });

    });
});