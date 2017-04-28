import * as redux from 'redux';
import thunk from 'redux-thunk';
import {userProfileReducer} from 'profileReducers';
import {firebaseAuthReducer} from 'loginReducers';
import {setRedirectUrlReducer} from 'urlReducers';
import {bbzErrorReducer} from 'errorReducers';
import {searchTextReducer, showApprovalPendingReducer} from 'searchReducers';
import {todoItemsReducer} from 'reducers';
import {serviceItemsReducer, serviceOperationReducer} from 'servicesItemsReducer';
import {companyItemsReducer, companyOperationReducer} from 'companiesItemsReducer';
import {reviewItemsReducer, reviewOperationReducer} from 'reviewsItemsReducer';

export var configure = (initialState = {}) => {
    var reducers = redux.combineReducers({
        searchText: searchTextReducer,
        showApprovalPending: showApprovalPendingReducer,
        auth: firebaseAuthReducer,
        redirectUrl: setRedirectUrlReducer,
        error: bbzErrorReducer,
        userProfile: userProfileReducer,
        todoItems: todoItemsReducer,
        serviceItems: serviceItemsReducer,
        serviceOperation: serviceOperationReducer,
        companyItems: companyItemsReducer,
        companyOperation: companyOperationReducer,
        reviewItems: reviewItemsReducer,
        reviewOperation: reviewOperationReducer
    });

    const rootReducer = ( state, action ) => {
        if ( action.type === 'BBZ_LOGOUT' ) {
            state = undefined;
            //this will force the other reducers to return their default states
        }

        return reducers(state, action)
    }

//create store and load developer tools if they exist
//redux-thunk provides support for store configuration from functions
    var store = redux.createStore(rootReducer, initialState, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : (f) => {
                return f
            }
    ));

    return store;
};