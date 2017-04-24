import * as redux from 'redux';
import thunk from 'redux-thunk';
import {userProfileReducer} from 'profileReducers';
import {firebaseAuthReducer} from 'loginReducers';
import {setRedirectUrlReducer} from 'urlReducers';
import {bbzErrorReducer} from 'errorReducers';
import {searchTextReducer} from 'searchReducers';
import {todoItemsReducer, showCompletedReducer} from 'reducers';
import {serviceItemsReducer, serviceOperationReducer} from 'servicesItemsReducer';
import {companyItemsReducer, companyOperationReducer} from 'companiesItemsReducer';

export var configure = (initialState = {}) => {
    var reducer = redux.combineReducers({
        searchText: searchTextReducer,
        auth: firebaseAuthReducer,
        redirectUrl: setRedirectUrlReducer,
        error: bbzErrorReducer,
        userProfile: userProfileReducer,
        todoItems: todoItemsReducer,
        showCompleted: showCompletedReducer,
        serviceItems: serviceItemsReducer,
        serviceOperation: serviceOperationReducer,
        companyItems: companyItemsReducer,
        companyOperation: companyOperationReducer
    });

//create store and load developer tools if they exist
//redux-thunk provides support for store configuration from functions
    var store = redux.createStore(reducer, initialState, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : (f) => {
                return f
            }
    ));

    return store;
};