var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var TodoSearch = require('TodoSearch');

describe('TodoSearch',()=>{
    it('should exist', ()=>{
        expect(TodoSearch).toExist();
    });

 /*   it('should call onSearch each time text changes', ()=>{
        var searchText = 'C';
        var spy = expect.createSpy();
        var todoSearch = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);
        var $el = $(ReactDOM.findDOMNode(todoSearch));


        todoSearch.refs.searchText.value = searchText;
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toHaveBeenCalledWith(todoText);

    });*/

});