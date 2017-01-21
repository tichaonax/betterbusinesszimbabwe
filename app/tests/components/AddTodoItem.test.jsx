var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

import * as actions from 'actions';
var {AddTodoItem} = require('AddTodoItem');

describe('AddTodoItem',()=>{
    it('should exist', ()=>{
        expect(AddTodoItem).toExist();
    });

    it('should dispatch ADD_TODO_ITEM with valid todoItem text', ()=>{
        var todoText = 'Cut grass';
        var action= actions.startAddTodoItems(todoText);
        var spy = expect.createSpy();
        var addTodoItem = TestUtils.renderIntoDocument(<AddTodoItem dispatch={spy}/>);
        var $el = $(ReactDOM.findDOMNode(addTodoItem));


        addTodoItem.refs.todoItemText.value = todoText;
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toHaveBeenCalledWith(action);

    });


    it('should NOT dispatch ADD_TODO_ITEM when input is Invalid', ()=>{
        var todoText = '';
        var spy = expect.createSpy();
        var addTodoItem = TestUtils.renderIntoDocument(<AddTodoItem dispatch={spy}/>);
        var $el = $(ReactDOM.findDOMNode(addTodoItem));


        addTodoItem.refs.todoItemText.value = todoText;
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toNotHaveBeenCalled();

    });

});