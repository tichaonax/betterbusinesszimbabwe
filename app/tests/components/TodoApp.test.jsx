import React from 'react';
import {Provider} from 'react-redux';
var expect = require('expect');

import TestUtils from 'react-addons-test-utils';

var configureStore = require('configureStore');
import {TodoApp} from 'TodoApp';
import TodoList from 'TodoList';


describe('TodoApp', () => {
    it('should exist', () => {
        expect(TodoApp).toExist();
    });

    it('should render TodoList', () => {
        var store = configureStore.configure();
        var provider = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <TodoApp/>
            </Provider>
        );

        var todoApp = TestUtils.scryRenderedComponentsWithType(provider, TodoApp)[0];
        var todoList = TestUtils.scryRenderedComponentsWithType(todoApp, TodoList);

        expect(todoList.length).toEqual(1);
    });

});