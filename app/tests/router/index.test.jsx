import React from 'react';
import {Provider} from 'react-redux';
var expect = require('expect');

import TestUtils from 'react-addons-test-utils';

var configureStore = require('configureStore');
//import {TodoApp} from 'TodoApp';
//import TodoList from 'TodoList';
import router from 'app/router/';


describe('router', () => {
    it('should exist', () => {
        expect(router).toExist();
    });

/*    it('should render TodoList', () => {
        var store = configureStore.configure();
        var provider = TestUtils.renderIntoDocument(
            <Provider store={store}>
                {router}
            </Provider>
        );

        var router = TestUtils.scryRenderedComponentsWithType(provider, router)[0];
        var todoList = TestUtils.scryRenderedComponentsWithType(router, TodoList);

        expect(todoList.length).toEqual(1);
    });*/

});