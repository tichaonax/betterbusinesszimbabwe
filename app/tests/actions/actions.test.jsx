import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

import firebase, {firebaseRef} from 'app/firebase';
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

    it('should generate update todoItem action', () => {
        var updates = {
            completed: false,
        }
        var action = {
            type: 'UPDATE_TODO_ITEM',
            id: 4,
            updates

        };

        var response = actions.updateTodoItem(action.id, updates);
        expect(response).toEqual(action);
    });


    describe('Tests with firebase database todoItems', () => {
        //this test requres that the data exists on the firebase database

        var testTodoItemRef;
        var testTodoItem = {
            text: 'Stuff to do at home',
            completed: false,
            createDate: 8683
        };

        var uid;
        var todoItemsRef;


        beforeEach((done) => {
            firebase.auth().signInAnonymously().then((user)=>{

                uid = user.uid;
                todoItemsRef = firebaseRef.child(`users/${uid}/todoItems`);

                return todoItemsRef.remove();
            }).then(()=>{
                testTodoItemRef = todoItemsRef.push();
                return testTodoItemRef.set(testTodoItem);
            }).then(() => done())
                .catch(done);
        });

        afterEach((done) => {
            //use this delete the test data from fire base
            todoItemsRef.remove().then(() => done());
        });

        it('toggle to todoItem and dispatch UPDATE_TODO_ITEM', (done) => {
            const store = createMockStore({auth: {uid}});
            const action = actions.startToggleTodoItem(testTodoItemRef.key, testTodoItem.completed);

            store.dispatch(action).then(() => {
                const mockActions = store.getActions();

                expect(mockActions[0]).toInclude({
                    type: 'UPDATE_TODO_ITEM',
                    id: testTodoItemRef.id
                });

                expect(mockActions[0].updates).toInclude({
                    completed: true
                });

                expect(mockActions[0].updates.completeDate).toExist();
                done();

            }, done) //<-- just call done even in failure so we can exit

            done();
        });

        it('it should fetch data from firebase and dispatch ADD_TODO_ITEMS', (done) => {

            const store = createMockStore({auth: {uid}});
            const action = actions.startTodoAddItems();

            store.dispatch(action).then(() => {
                const mockActions = store.getActions();

                //console.log(JSON.stringify(mockActions));
                expect(mockActions[0]).toInclude({
                    type: 'ADD_TODO_ITEMS',
                });

                expect(mockActions[0].todoItems.length).toEqual(1);
                expect(mockActions[0].todoItems[0].text).toEqual(testTodoItem.text);
                expect(mockActions[0].todoItems[0].completed).toEqual(testTodoItem.completed);
                expect(mockActions[0].todoItems[0].createDate).toEqual(testTodoItem.createDate);
                expect(mockActions[0].todoItems[0].completeDate).toNotExist();
                expect(mockActions[0].todoItems[0].id).toExist();

                done();

            }, done);

        });

        it('should create a todoItem and dispatch ADD_TODO_ITEM', (done) => {

            const store = createMockStore({auth: {uid}});
            const todoItemText = 'My todoItem text';

            store.dispatch(actions.startAddTodoItems(todoItemText)).then(() => {
                const actions = store.getActions();
                expect(actions[0]).toInclude({
                    type: 'ADD_TODO_ITEM'
                });
                expect(actions[0].todoItem).toInclude({
                    text: todoItemText
                });
                done(); //test is done--- increase timeout in karma configuration file if needed
            }).catch(done)
        });
    });

    describe('firebase authentication', () => {

        it('should generate a login action', () => {

            const auth = {
                uid: 'KYZCgUasdqGdfdf9KZaM797iYUnIA2',
                displayName: "Tichaona Hwandaza"
            };
            const action = {
                type: 'TODO_LOGIN',
                auth: auth
            };

            const response = actions.todoLogin(auth);
            expect(response).toEqual(action);
        });

        it('should generate a logout action', () => {

            var action = {
                type: 'TODO_LOGOUT',
            };

            const response = actions.todoLogout();
            expect(response).toEqual(action);
        });

    })

});
