import * as redux from 'redux';
import thunk from 'redux-thunk';
import {
    todoItemsReducer,
    searchTextReducer,
    showCompletedReducer,
    firebaseAuthReducer,
    setRedirectUrlReducer,
    bbzErrorReducer,
    userProfileReducer
} from 'reducers';

export var configure = (initialState ={}) => {
    var reducer = redux.combineReducers({
        searchText: searchTextReducer,
        todoItems: todoItemsReducer,
        showCompleted: showCompletedReducer,
        auth: firebaseAuthReducer,
        redirectUrl : setRedirectUrlReducer,
        error: bbzErrorReducer,
        userProfile: userProfileReducer
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