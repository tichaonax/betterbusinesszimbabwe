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

export var setRecentlyAddedCompany=(companyId, companyTitle)=>{
    return {
        type: 'SET_RECENT_ADD_COMPANY_ITEM',
        companyId,
        companyTitle
    };
}

export var clearRecentlyAddedCompany = () => {
    return {
        type: 'CLEAR_RECENT_ADD_COMPANY_ITEM',
    };
}

export var startAddNewCompanyItem = (userId, companyTitle, companyDesc, serviceId) => {
    return (dispatch, getState) => {
        dispatch(loadingActions.setLoadingStatus(true));
        return api.addNewCompanyInfo(userId, serviceId, companyTitle, companyDesc).then((company) => {
            let companyItem = company.data;
            dispatch(addCompanyItem(company.data));
            //dispatch recently added so you can select it from reviews
            dispatch(setRecentlyAddedCompany(companyItem.companyId, companyDesc));
            dispatch(loadingActions.setLoadingStatus(false));
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

export var updateCompanyItem = (companyId, updates) => {
    return {
        type: 'UPDATE_COMPANY_ITEM',
        companyId,
        updates
    };
};

export var startUpdateCompanyItem = (companyId, companyTitle, companyDesc, rating, serviceId, serviceCategory) => {
    return (dispatch, getState) => {
        dispatch(loadingActions.setLoadingStatus(true));
        return api.updateCompanyInfo(companyId, serviceId, companyTitle, companyDesc).then((company) => {
            console.log("updateCompanyInfo",companyId, serviceId, companyTitle, companyDesc);
            dispatch(addCompanyItems(company.data));
            dispatch(loadingActions.setLoadingStatus(false));
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