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
        it('should getTodoItems for valid array data', () => {
            var todoItems = [
                {
                    id: 276,
                    text: 'Test files',
                    completed: false
                }
            ];

            //call localstorage directly we are not testing TodoAPI.setTodoItems
            localStorage.setItem('todoItems', JSON.stringify(todoItems));

            var actualTodoItems = TodoAPI.getTodoItems('todoItems');

            expect(actualTodoItems).toEqual(todoItems)

        });


        it('should return empty arrau for bad localstorage data', () => {
            var storedTodoItems = TodoAPI.getTodoItems();
            expect(storedTodoItems).toEqual([]);
        })

    });


    describe('getFilteredTodoItems', () => {

        //create setup data common to this descibe

        var todoItems = [
            {
                id: 121,
                text: 'Clean the garage',
                completed: false
            },
            {
                id: 135,
                text: 'Fix 401K',
                completed: true
            },
            {
                id: 145,
                text: 'Update tests',
                completed: false
            },
            {
                id: 146,
                text: 'play video',
                completed: true
            }
        ];


        it('should return all items if showCompleted is checked', () => {
            var filteredTodoItems = TodoAPI.getFilteredTodoItems(todoItems, true, '');
            expect(filteredTodoItems.length).toBe(4);
        });


        it('should return only items that are not completed when showCompleted is not checked', () => {
            var filteredTodoItems = TodoAPI.getFilteredTodoItems(todoItems, false, '');
            expect(filteredTodoItems.length).toBe(2);
        });


        it('should sort by completed status, completed at the bottom', () => {
            var filteredTodoItems = TodoAPI.getFilteredTodoItems(todoItems, true, '');
            expect(filteredTodoItems.length).toBe(4);
            expect(filteredTodoItems[1].completed).toBe(false);
        });

        it('should return all if searchText is empty', () => {
            var filteredTodoItems = TodoAPI.getFilteredTodoItems(todoItems, true, '');
            expect(filteredTodoItems.length).toBe(4);
        });

        it('should filter by searchText', () => {
            var filteredTodoItems = TodoAPI.getFilteredTodoItems(todoItems, true, '401k');
            expect(filteredTodoItems.length).toBe(1);
        });
    });
});