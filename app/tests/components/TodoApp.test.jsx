var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var TodoApp = require('TodoApp');

describe('TodoApp', () => {
    it('should exist', () => {
        expect(TodoApp).toExist();
    });

    it('shoould add todo item to the todoItemss state on handleAddTodoItem', () => {
        var todoText = 'test text';
        var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);

        // set initial empty array
        todoApp.setState({
            todoItems: []
        });

        todoApp.handleAddTodoItem(todoText);

        expect(todoApp.state.todoItems[0].text).toBe(todoText);

        expect(todoApp.state.todoItems[0].createDate).toBeA('number');

        expect(todoApp.state.todoItems[0].completeDate).toBe(undefined);

    });


    it('should toggle completed value when handleToggleItem is called', () => {
        var todoItem = {
            id: 23,
            text: 'Toggle test feature',
            completed: false,
            createDate: 0,
            completeDate: undefined
        };

        var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);

        // set initial only array item
        todoApp.setState({
            todoItems: [todoItem]
        });

        //validate the todoItem has completed status of false

        expect(todoApp.state.todoItems[0].completed).toBe(false);

        //call handleToggleItem with id 23 to toggle completed status
        todoApp.handleToggleItem(23);

        //validate that the completed status changed
        expect(todoApp.state.todoItems[0].completed).toBe(true);

        expect(todoApp.state.todoItems[0].completeDate).toBeA('number');

    });

    it('should clear completeDate value when handleToggleItem is called for completedt task', () => {
        var todoItem = {
            id: 3,
            text: 'Clear completed date',
            completed: true,
            createDate: 0,
            completeDate: 0
        };

        var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);

        // set initial only array item
        todoApp.setState({
            todoItems: [todoItem]
        });

        //call handleToggleItem with id 3 to toggle completed status
        todoApp.handleToggleItem(3);

        //validate that the completed status changed
        expect(todoApp.state.todoItems[0].completed).toBe(false);

        expect(todoApp.state.todoItems[0].completeDate).toBe(undefined);

    });

});