var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var TodoList = require('TodoList');
var Todo = require('Todo');

describe('TodoList', () => {
    it('should exist', () => {
        expect(TodoList).toExist();
    });

    it('should render one Todo component for each todo item', () => {
        var todos = [
            {
                id: 1,
                text: 'Do something'
            }, {
                id: 2,
                text: 'Water the plants'
            }];

        var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);

        var todoComponent = TestUtils.scryRenderedComponentsWithType(todoList, Todo);

        expect(todoComponent.length).toBe(todos.length);



    });


});