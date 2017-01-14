var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var TodoList = require('TodoList');
var TodoItem = require('TodoItem');

describe('TodoList', () => {
    it('should exist', () => {
        expect(TodoList).toExist();
    });

    it('should render one Todo component for each todo item', () => {
        var todoItems = [
            {
                id: 1,
                text: 'Do something'
            }, {
                id: 2,
                text: 'Water the plants'
            }];

        var todoList = TestUtils.renderIntoDocument(<TodoList todoItems={todoItems}/>);

        var todoComponent = TestUtils.scryRenderedComponentsWithType(todoList, TodoItem);

        expect(todoComponent.length).toBe(todoItems.length);



    });


});