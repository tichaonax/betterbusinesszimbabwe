var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

import {configure} from 'configureStore';
import ConnectedTodoList, {TodoList} from 'TodoList';
import ConnectedTodoItem, {TodoItem} from 'TodoItem';

describe('TodoList', () => {
    it('should exist', () => {
        expect(TodoList).toExist();
    });

    it('should render one TodoItem component for each todo item', () => {
        var todoItems = [
            {
                id: 1,
                text: 'Do something',
                completed:false,
                completeDate: undefined,
                createDate:500
            }, {
                id: 2,
                text: 'Water the plants',
                completed:false,
                completeDate: undefined,
                createDate:500
            }];

        var store = configure({
            todoItems
        });

        var provider =  TestUtils.renderIntoDocument(
            <Provider store={store}>
                <ConnectedTodoList/>
            </Provider>
        );

        var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];


        var todoListComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodoItem);

        expect(todoListComponents.length).toBe(todoItems.length);

    });


    it('should render message if there are no todo items', () => {
        var todoItems = [];

        var todoList = TestUtils.renderIntoDocument(<TodoList todoItems={todoItems} showCompleted={false} searchText=''/>);

        var $el = $(ReactDOM.findDOMNode(todoList));

        expect($el.find('.container__message').length).toBe(1);

    });

});