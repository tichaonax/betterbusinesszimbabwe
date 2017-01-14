var expect = require('expect');

var TodoAPI = require('TodoAPI');

function beforeEachCleanup() {
    localStorage.removeItem('todoItems');
}


describe('TodoAPI', () => {
    //clean up before each test
    beforeEach(() => {
        beforeEachCleanup();
    });

    it('should exist', () => {
        expect(TodoAPI).toExist();
    });


    describe('setTodoItems', () => {
        it('should set valid todoItems array', () => {

            var todoItems = [
                {
                    id: 276,
                    text: 'Test files',
                    completed: false
                }
            ];

            TodoAPI.setTodoItems(todoItems);

            var actualTodoItems = JSON.parse(localStorage.getItem('todoItems'));

            expect(actualTodoItems).toEqual(todoItems);
        });

        it('should not set invalid todoItems array', () => {

            var badTodoItems =
                {
                    id: '276'
                };

            TodoAPI.setTodoItems(badTodoItems);
            expect(localStorage.getItem('todoItems')).toBe(null);
        });


    });

    describe('getTodoItems', () => {
        it('should getTodoItems', () => {
            var todoItems = [
                {
                    id: 276,
                    text: 'Test files',
                    completed: false
                }
            ];

            localStorage.setItem('todoItems', JSON.stringify(todoItems));

            var actualTodoItems = TodoAPI.getTodoItems('todoItems');

            expect(actualTodoItems).toEqual(todoItems)

        });


        it('should return empty arrau for bad localstorage data',()=>{
            var storedTodoItems = TodoAPI.getTodoItems();
            expect(storedTodoItems).toEqual([]);
        })

    });

});