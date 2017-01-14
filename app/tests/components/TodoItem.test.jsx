var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var TodoItem = require('TodoItem');

describe('TodoItem', () => {
    it('should exist', () => {
        expect(TodoItem).toExist();
    });

    it('should call onToggleItem prop function with correct id on click', () => {
        var todoItem = {
            id: 23,
            text: 'Toggle test feature',
            completed: false
        };

        var spy = expect.createSpy();
        var todoItem = TestUtils.renderIntoDocument(<TodoItem {...todoItem} onToggleItem={spy}/>);

        var $el = $(ReactDOM.findDOMNode(todoItem));

        //the div is the first component
        TestUtils.Simulate.click($el[0]);

        expect(spy).toHaveBeenCalledWith(23);


    });


});