import moment from 'moment';
var errorActions = require('errorActions');
var companiesActions = require('companiesActions');
var loadingActions = require('loadingActions');
//var findAllServices = require('findAllServices');
//var findAllServices = require ('app/dao/services/findAllServices.js');

import firebase, {firebaseRef, githubProvider} from 'app/firebase/index';

export var addServiceItem = (serviceItem) => {
    return {
        type: 'ADD_SERVICE_ITEM',
        serviceItem
    };
};

export var startAddNewServiceItem = (title) => {
    return (dispatch, getState) => {
        var serviceItem = {
            serviceId: 0,
            serviceTitle: title,
            createAt: moment().unix(),
            updateAt: null
        }

        //This will add a mew service item to firebase and dispatch the newly created
        var serviceItemRef = firebaseRef.child(`services`).push(serviceItem);
        return serviceItemRef.then(() => {
            dispatch(addServiceItem({
                ...serviceItem,
                serviceItemId: serviceItemRef.key
            }));
        }, (error) => {
            console.log("Unable to add new service", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(errorActions.bbzReportError(errorObj));
        });
    };
};

export var addServiceItems = (serviceItems) => {
    return {
        type: 'ADD_SERVICE_ITEMS',
        serviceItems
    };
};

export var startAddServiceItems = () => {
    return (dispatch, getState) => {
        dispatch(loadingActions.setLoadingStatus(true));
        return findAllServices.then((services) => {

            console.debug("services",services);

            //dispatch(addServiceItems(parsedServiceItems));
            //dispatch(loadingActions.setLoadingStatus(false));

         }, (error) => {
            console.log("Unable to fetch services", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            dispatch(loadingActions.setLoadingStatus(false));
            return dispatch(errorActions.bbzReportError(errorObj));
        });
    };
};

export var deleteServiceItem = (serviceItemId) => {
    return {
        type: 'DELETE_SERVICE_ITEM',
        serviceItemId
    };
};

export var startDeleteServiceItem = (serviceItemId) => {
    return (dispatch, getState) => {
        var serviceItemRef = firebaseRef.child(`services/${serviceItemId}`); //ES6 syntax

        return serviceItemRef.remove().then(() => {
            dispatch(deleteServiceItem(serviceItemId));
        }, (error) => {
            console.debug("Unable to fetch services", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(errorActions.bbzReportError(errorObj));
        });
    };
};

export var updateServiceItem = (serviceItemId, updates) => {
    return {
        type: 'UPDATE_SERVICE_ITEM',
        serviceItemId,
        updates
    };
};

export var startUpdateServiceItem = (serviceItemId, title) => {
    return (dispatch, getState) => {
        var serviceItemRef = firebaseRef.child(`services/${serviceItemId}`); //ES6 syntax

        var updates = {
            updateAt: moment().unix(),
            serviceTitle: title
        };

        return serviceItemRef.update(updates).then(() => {
            dispatch(updateServiceItem(serviceItemId, updates));
            //start the process to update all the companies that reference this service
            dispatch(companiesActions.startUpdateCompaniesCategory(serviceItemId, title));
        }, (error) => {
            console.debug("Unable to update service", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(errorActions.bbzReportError(errorObj));
        });
    };
};

export var setAddServiceOperation = (data, operation = 'ADD') => {
    return {
        type: 'SET_SERVICE_OPERATION',
        data,
        operation
    };
};

export var setUpdateServiceOperation = (data, operation = 'UPDATE') => {
    return {
        type: 'SET_SERVICE_OPERATION',
        data,
        operation
    };
};