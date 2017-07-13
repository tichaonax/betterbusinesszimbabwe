import moment from 'moment';
var errorActions = require('errorActions');
var loadingActions = require('loadingActions');
var CompaniesApi = require('../api/companiesApi');
const api = new CompaniesApi();

import firebase, {firebaseRef, githubProvider} from 'app/firebase/index';

export var addCompanyItem = (companyItem) => {
    return {
        type: 'ADD_COMPANY_ITEM',
        companyItem
    };
};

export var setRecentlyAddedCompany=(companyItemId, companyTitle)=>{
    return {
        type: 'SET_RECENT_ADD_COMPANY_ITEM',
        companyItemId,
        companyTitle
    };
}

export var clearRecentlyAddedCompany = () => {
    return {
        type: 'CLEAR_RECENT_ADD_COMPANY_ITEM',
    };
}

export var startAddNewCompanyItem = (uid, title, description, serviceId, category) => {
    return (dispatch, getState) => {
        var companyItem = {
            uid: uid,
            companyTitle: title,
            companyDesc: description,
            createAt: moment().unix(),
            updateAt: null,
            reviewCount: 0,
            rating: 0,
            isApproved: false,
            serviceItemId: serviceId,
            serviceCategory: category
        }

        //This will add a mew company item to firebase and dispatch the newly created
        var companyItemRef = firebaseRef.child(`companies`).push(companyItem);
        return companyItemRef.then(() => {
            dispatch(addCompanyItem({
                ...companyItem,
                companyItemId: companyItemRef.key
            }));

            //dispatch recently added so you can select it from reviews
            dispatch(setRecentlyAddedCompany(companyItemRef.key, title));

        }, (error) => {
            console.debug("Unable to add new company", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(errorActions.bbzReportError(errorObj));
        });
    };
};

export var addCompanyItems = (companyItems) => {
    return {
        type: 'ADD_COMPANY_ITEMS',
        companyItems
    };
};

export var startAddCompanyItems = () => {
    return (dispatch, getState) => {
        dispatch(loadingActions.setLoadingStatus(true));
        return api.findAllCompanies().then((companies) => {
            console.log("findAllCompanies.....",companies.data);
            dispatch(addCompanyItems(companies.data));
            dispatch(loadingActions.setLoadingStatus(false));
        }, (error) => {
            console.debug("Unable to fetch companies", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            dispatch(loadingActions.setLoadingStatus(false));
            return dispatch(errorActions.bbzReportError(errorObj));
        });
    };
};

export var deleteCompanyItem = (companyItemId) => {
    return {
        type: 'DELETE_COMPANY_ITEM',
        companyItemId
    };
};

export var startDeleteCompanyItem = (companyItemId) => {
    return (dispatch, getState) => {
        var companyItemRef = firebaseRef.child(`companies/${companyItemId}`); //ES6 syntax

        return companyItemRef.remove().then(() => {
            dispatch(deleteCompanyItem(companyItemId));
        }, (error) => {
            console.debug("Unable to fetch companies", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(errorActions.bbzReportError(errorObj));
        });
    };
};

export var updateCompanyItem = (companyId, data) => {
    return {
        type: 'UPDATE_COMPANY_ITEM',
        companyId,
        data
    };
};

export var startUpdateCompanyItem = (companyItemId, title, description, rating, serviceId, category) => {
    return (dispatch, getState) => {
        var companyItemRef = firebaseRef.child(`companies/${companyItemId}`); //ES6 syntax
        var updates = {
            updateAt: moment().unix(),
            companyTitle: title,
            companyDesc: description,
            isApproved: false,
            rating: rating,
            serviceItemId: serviceId,
            serviceCategory: category
        };

        return companyItemRef.update(updates).then(() => {  //return needed to chain our tests
            dispatch(updateCompanyItem(companyItemId, updates));
        }, (error) => {
            console.debug("Unable to update company", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(errorActions.bbzReportError(errorObj));
        });
    };
};

export var startApproveUpdateCompanyItem = (companyId, isApproved) => {
    return (dispatch, getState) => {
        console.log("companyId",companyId, isApproved);
        dispatch(loadingActions.setLoadingStatus(true));
        return api.updateCompanyIsApprovedFlag(companyId,isApproved).then((company) => {
            console.log("updateCompanyIsApprovedFlag",company);
            //dispatch(addCompanyItems(companies.data));
            let updates =company.data;
            console.log("updates",updates);
            dispatch(loadingActions.setLoadingStatus(false));
            dispatch(updateCompanyItem(companyId, updates));
        }, (error) => {
            console.debug("Unable to update company", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(errorActions.bbzReportError(errorObj));
        });
    };
};

export var startCategoryUpdateCompanyItem = (companyItemId, category) => {
    return (dispatch, getState) => {
        var companyItemRef = firebaseRef.child(`companies/${companyItemId}`);

        var updates = {
            serviceCategory: category,
        };

        return companyItemRef.update(updates).then(() => {
            dispatch(updateCompanyItem(companyItemId, updates));
        }, (error) => {
            console.debug("Unable to update company category", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(errorActions.bbzReportError(errorObj));
        });
    };
};

export var startUpdateCompaniesCategory = (serviceId, category) => {
    return (dispatch, getState) => {
        var companyItemRef = firebaseRef.child(`companies`);
        return companyItemRef.once('value').then((snapshot) => {
            var companyItems = snapshot.val() || {};
            Object.keys(companyItems).forEach((companyItemId) => {
                //update matching company with new category description
                if (companyItems[companyItemId].serviceItemId == serviceId) {
                    dispatch(startCategoryUpdateCompanyItem(companyItemId, category));
                }
            });
        }, (error) => {
            console.debug("startUpdateCompaniesCategory failed", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(errorActions.bbzReportError(errorObj));
        });
    };
}

export var setAddCompanyOperation = (data, operation = 'ADD') => {
    return {
        type: 'SET_COMPANY_OPERATION',
        data,
        operation
    };
};

export var setUpdateCompanyOperation = (data, operation = 'UPDATE') => {
    return {
        type: 'SET_COMPANY_OPERATION',
        data,
        operation
    };
};