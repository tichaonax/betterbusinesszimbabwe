import * as redux from 'redux';
import thunk from 'redux-thunk';
import {userProfileReducer} from 'profileReducers';
import {firebaseAuthReducer, lastLoginReducer} from 'loginReducers';
import {setRedirectUrlReducer} from 'urlReducers';
import {bbzErrorReducer} from 'errorReducers';
import {searchTextReducer, searchOptionsReducer, countsReducer} from 'searchReducers';
import {serviceItemsReducer, serviceOperationReducer} from 'servicesItemsReducer';
import {companyItemsReducer, companyOperationReducer, recentlyAddedCompanyReducer} from 'companiesItemsReducer';
import {reviewItemsReducer, reviewOperationReducer} from 'reviewsItemsReducer';
import {userItemsReducer} from 'usersItemsReducer';
import {loadingReducer} from 'loadingReducers';
import syncBreakpointWithStore, {breakpointReducer} from 'redux-breakpoint';
import {navigationReducer} from 'navReducers';

export var configure = (initialState = {}) => {
    var reducers = redux.combineReducers({
        searchText: searchTextReducer,
        searchOptions: searchOptionsReducer,
        auth: firebaseAuthReducer,
        lastLogin: lastLoginReducer,
        redirectUrl: setRedirectUrlReducer,
        error: bbzErrorReducer,
        userProfile: userProfileReducer,
        serviceItems: serviceItemsReducer,
        serviceOperation: serviceOperationReducer,
        companyItems: companyItemsReducer,
        companyOperation: companyOperationReducer,
        reviewItems: reviewItemsReducer,
        reviewOperation: reviewOperationReducer,
        recentlyAddedCompany: recentlyAddedCompanyReducer,
        userItems: userItemsReducer,
        loading: loadingReducer,
        breakpoint: breakpointReducer,
        navigation: navigationReducer,
        counts: countsReducer
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

    // make your store sync with device width change.
    syncBreakpointWithStore(store);
    return store;
};