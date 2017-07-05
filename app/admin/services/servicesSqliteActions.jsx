import moment from 'moment';
var errorActions = require('errorActions');
var companiesActions = require('companiesActions');
var loadingActions = require('loadingActions');
var ServicesApi = require('../../api/servicesApi');
const api = new ServicesApi();

export var addServiceItem = (serviceItem) => {
    return {
        type: 'ADD_SERVICE_ITEM',
        serviceItem
    };
};

export var startAddNewServiceItem = (serviceCategory, userId) => {
    return (dispatch, getState) => {
        return api.addServiceCategory(serviceCategory, userId).then((services) => {
            let serviceItem = services.data;
            dispatch(addServiceItem(serviceItem));
           // console.debug("services",services.data);
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
        //console.log("ServicesApi",api);
        return api.findAllServices().then((services) => {
            //console.debug("services",services.data);
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

export var startDeleteServiceItem = (serviceId, userId) => {
    return (dispatch, getState) => {
        dispatch(loadingActions.setLoadingStatus(true));
        return api.deleteServiceCategory(serviceId, userId).then((services) => {
            console.debug("services", services.data);
            dispatch(updateServiceItem(services.data));
            dispatch(loadingActions.setLoadingStatus(false));
            //dispatch(deleteServiceItem(serviceItemId));
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

export var startUpdateServiceItem = (serviceId, serviceCategory, userId) => {
    return (dispatch, getState) => {
        dispatch(loadingActions.setLoadingStatus(true));
        return api.updateServiceCategory(serviceId, serviceCategory, userId).then((services) => {
            dispatch(updateServiceItem(serviceId, services.data));
            dispatch(loadingActions.setLoadingStatus(false));
            //start the process to update all the companies that reference this service
            //  dispatch(companiesActions.startUpdateCompaniesCategory(serviceId, serviceCategory));
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