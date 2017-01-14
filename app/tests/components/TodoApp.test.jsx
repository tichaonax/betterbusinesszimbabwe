var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var TodoApp = require('TodoApp');

describe('TodoApp',()=>{
    it('should exist', ()=>{
        expect(TodoApp).toExist();
    });

    it('shoould add todo item to the todos state on handleAddTodo',()=>{
        var todoText = 'test text';
        var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);

        // set initial empty array
        todoApp.setState({
            todoItems: []
        });

        todoApp.handleAddTodoItem(todoText);

        expect(todoApp.state.todoItems[0].text).toBe(todoText);

    })





});