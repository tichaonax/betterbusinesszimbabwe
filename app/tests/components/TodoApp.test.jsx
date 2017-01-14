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

    });


    it('should toggle completed value when handleToggleItem is called', () => {
        var todoItem = {
            id: 23,
            text: 'Toggle test feature',
            completed: false
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




    });


});