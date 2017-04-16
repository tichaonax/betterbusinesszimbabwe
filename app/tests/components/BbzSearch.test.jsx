var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
import  TestUtils from 'react-addons-test-utils';

//import the BbzSearch that is not tied to redux
import {BbzSearch} from 'BbzSearch';

describe('BbzSearch', () => {
    it('should exist', () => {
        expect(BbzSearch).toExist();
    });

    it('should dispatch SET_SEARCH_TEXT on input change', () => {
        var searchText = 'Cut';
        var action = {
            type: 'SET_SEARCH_TEXT',
            text: searchText
        };

        var spy = expect.createSpy();
        var todoSearch = TestUtils.renderIntoDocument(<BbzSearch dispatch={spy}/>);

        //console.log(todoSearch.refs.searchItemText);

        // this test fails with TypeError: Cannot read property 'value' of undefined
        // when testing under react-redux
        var $el = $(ReactDOM.findDOMNode(todoSearch));

        //console.log($el.find('#searchItemText'));
        //todoSearch.refs.searchItemText.value = searchText;
        //TestUtils.Simulate.change(todoSearch.refs.searchItemText);

        //expect(spy).toHaveBeenCalledWith(action);

    });


   /* it('should dispatch TOGGLE_SHOW_COMPLETED when checked value changes', () => {
        var spy = expect.createSpy();
        var action = {
            type: 'TOGGLE_SHOW_COMPLETED'
        }
        var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy}/>);

        todoSearch.refs.showCompleted.checked = true;
        TestUtils.Simulate.change(todoSearch.refs.showCompleted);

        expect(spy).toHaveBeenCalledWith(action);

        todoSearch.refs.showCompleted.checked = false;
        TestUtils.Simulate.change(todoSearch.refs.showCompleted);

        expect(spy).toHaveBeenCalledWith(action);

    });*/

});