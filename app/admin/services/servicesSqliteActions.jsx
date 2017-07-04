import moment from 'moment';
var errorActions = require('errorActions');
var companiesActions = require('companiesActions');
var loadingActions = require('loadingActions');
var ServicesApi = require('../../api/servicesApi');

import firebase, {firebaseRef, githubProvider} from 'app/firebase/index';

export var addServiceItem = (serviceItem) => {
    return {
        type: 'ADD_SERVICE_ITEM',
        serviceItem
    };
};

export var startAddNewServiceItem = (serviceCategory, userId) => {
    return (dispatch, getState) => {
        var api = new ServicesApi();
        return api.addServiceCategory(serviceCategory, userId).then((services) => {
            let serviceItem = services.data;
            dispatch(addServiceItem(serviceItem));
            console.debug("services",services.data);
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
        var api = new ServicesApi();
        console.log("ServicesApi",api);
        return api.findAllServices().then((services) => {

            console.debug("services",services.data);

            dispatch(addServiceItems(services.data));
            dispatch(loadingActions.setLoadingStatus(false));

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

export var deleteServiceItem = (serviceId) => {
    return {
        type: 'DELETE_SERVICE_ITEM',
        serviceId
    };
};

export var startDeleteServiceItem = (serviceId) => {
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

export var updateServiceItem = (serviceId, updates) => {
    return {
        type: 'UPDATE_SERVICE_ITEM',
        serviceId,
        updates
    };
};

export var startUpdateServiceItem = (serviceId, title) => {
    return (dispatch, getState) => {
        var serviceItemRef = firebaseRef.child(`services/${serviceId}`); //ES6 syntax

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