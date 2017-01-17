var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');

describe('Reducers', () => {
    describe('searchTextReducer', () => {
        it('should set searchText', () => {
            var action = {
                type: 'SET_SEARCH_TEXT',
                searchText: 'Welcome'
            };

            var response = reducers.searchTextReducer(df(''), df(action));
            expect(response).toEqual(action.searchText);

        });

    });


    describe('showCompletedReducer', () => {
        it('should set toggle show completed', () => {
            var action = {
                type: 'TOGGLE_SHOW_COMPLETED'
            };

            var response = reducers.showCompletedReducer(df(false), df(action));
            expect(response).toEqual(true);

        });

    });
});