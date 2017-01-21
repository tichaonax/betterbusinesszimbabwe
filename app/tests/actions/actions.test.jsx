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

    describe('creating a test todoItem in firebase', () => {

        var testTodoItemRef;
        var testTodoItemId;

        //nest the beforeEach and afterEach so it affects only this test
        beforeEach((done) => {
            //use this to setup test data on firebase
            //move to the next test only after successfully adding data
            done();
        });

        afterEach((done) => {
            //use this delete the test data from fire base
           // console.log(testTodoItemId);
            testTodoItemRef = firebaseRef.child('todoItems/' + testTodoItemId);
            testTodoItemRef.remove().then(() => done());
        });
        it('should create a todoItem and dispatch ADD_TODO_ITEM', (done) => {

            const store = createMockStore({});
            const todoItemText = 'My todoItem text';

            store.dispatch(actions.startAddTodoItems(todoItemText)).then(() => {
                const actions = store.getActions();
                //prepare to clean up the added todoItem
                testTodoItemId = actions[0].todoItem.id;
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

        beforeEach((done) => {
            //use this to setup test data on firebase
            var todoItemRef = firebaseRef.child('todoItems');

            todoItemRef.remove().then(()=>{
                testTodoItemRef = firebaseRef.child('todoItems').push();
                return testTodoItemRef.set(testTodoItem).then(() => done());
            }).catch(done);

            //move to the next test only after successfully adding data
        });

        afterEach((done) => {
            //use this delete the test data from fire base
            testTodoItemRef.remove().then(() => done());
        });

        it ('toggle to toItem and dispatch UPDATE_TODO_ITEM', (done) => {
                const store = createMockStore({});
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

                }, done()) //<-- just call done even in failure so we can exit

            });

        it('it should fetch data from firebase and dispatch ADD_TODO_ITEMS', (done)=>{

            const store = createMockStore({});
            const action = actions.startTodoAddItems();

            store.dispatch(action).then(()=>{
                const mockActions = store.getActions();

                //console.log(JSON.stringify(mockActions));
                expect(mockActions[0]).toInclude({
                    type: 'ADD_TODO_ITEMS',
                });

                expect(mockActions[0].todoItems[0].text).toEqual(testTodoItem.text);
                expect(mockActions[0].todoItems[0].completed).toEqual(testTodoItem.completed);
                expect(mockActions[0].todoItems[0].createDate).toEqual(testTodoItem.createDate);
                expect(mockActions[0].todoItems[0].completeDate).toNotExist();
                expect(mockActions[0].todoItems[0].id).toExist();

                done();

            }, done);

        })

    });

});
