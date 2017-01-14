var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var AddTodoItem = require('AddTodoItem');

describe('AddTodoItem',()=>{
    it('should exist', ()=>{
        expect(AddTodoItem).toExist();
    });

    it('should call onAddTodoItem with valid data', ()=>{
        var todoText = 'Cut grass';
        var spy = expect.createSpy();
        var addTodoItem = TestUtils.renderIntoDocument(<AddTodoItem onAddTodoItem={spy}/>);
        var $el = $(ReactDOM.findDOMNode(addTodoItem));


        addTodoItem.refs.todoItemText.value = todoText;
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toHaveBeenCalledWith(todoText);

    });


    it('should NOT call onAddTodoItem when input is Invalid', ()=>{
        var todoText = '';
        var spy = expect.createSpy();
        var addTodoItem = TestUtils.renderIntoDocument(<AddTodoItem onAddTodoItem={spy}/>);
        var $el = $(ReactDOM.findDOMNode(addTodoItem));


        addTodoItem.refs.todoItemText.value = todoText;
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toNotHaveBeenCalled();

    });


});