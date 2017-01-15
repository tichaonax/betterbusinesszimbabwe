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

    it('should render one TodoItem component for each todo item', () => {
        var todoItems = [
            {
                id: 1,
                text: 'Do something'
            }, {
                id: 2,
                text: 'Water the plants'
            }];

        var todoList = TestUtils.renderIntoDocument(<TodoList todoItems={todoItems}/>);


        var todoListComponent = TestUtils.scryRenderedComponentsWithType(todoList, TodoItem);

        expect(todoListComponent.length).toBe(todoItems.length);


    });


    it('should render message if there are todo items', () => {
        var todoItems = [];

        var todoList = TestUtils.renderIntoDocument(<TodoList todoItems={todoItems}/>);

        var $el = $(ReactDOM.findDOMNode(todoList));

        expect($el.find('.container__message').length).toBe(1);

    });

});