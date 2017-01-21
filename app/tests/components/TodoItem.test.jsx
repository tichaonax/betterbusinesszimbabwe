var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var {TodoItem} = require('TodoItem');

describe('TodoItem', () => {
    it('should exist', () => {
        expect(TodoItem).toExist();
    });

    it('should dispacth TOGGLE_TODO_ITEM action with correct id on click', () => {
        var todoItem = {
            id: 23,
            text: 'Toggle test feature',
            completed: false
        };

        var spy = expect.createSpy();
        var todoItemComponent = TestUtils.renderIntoDocument(<TodoItem {...todoItem} dispatch={spy}/>);

        var $el = $(ReactDOM.findDOMNode(todoItemComponent));

        console.log($el[0]);
        //the div is the first component
        TestUtils.Simulate.click($el[0]);

        expect(spy).toHaveBeenCalledWith({
            type: 'TOGGLE_TODO_ITEM',
            id: todoItem.id
        });
    });
});