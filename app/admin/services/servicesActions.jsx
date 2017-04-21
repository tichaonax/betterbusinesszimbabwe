import moment from 'moment';
var errorActions = require('errorActions');

import firebase, {firebaseRef, githubProvider} from 'app/firebase/index';

export var addServiceItem = (serviceItem) => {
    return {
        type: 'ADD_SERVICE_ITEM',
        serviceItem
    };
};

export var startAddNewServiceItem = (title, description) => {
    return (dispatch, getState) => {
        var serviceItem = {
            serviceTitle: title,
            serviceDesc: description,
            createAt: moment().unix(),
            updateAt: null
        }

        //This will add a mew service item to firebase and dispatch the newly created
        var serviceItemRef = firebaseRef.child(`services`).push(serviceItem);
        return serviceItemRef.then(() => {
            dispatch(addServiceItem({
                ...serviceItem,
                serviceId: serviceItemRef.key
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
        var serviceItemRef = firebaseRef.child(`services`);
        return serviceItemRef.once('value').then((snapshot) => {
            var serviceItems = snapshot.val() || {}; //return available data or empty object

            var parsedServiceItems = [];

            Object.keys(serviceItems).forEach((serviceItemId) => {
                parsedServiceItems.push({
                    serviceItemId: serviceItemId,
                    ...serviceItems[serviceItemId]
                });
            });

            dispatch(addServiceItems(parsedServiceItems));
        }, (error) => {
            console.log("Unable to fetch services", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(errorActions.bbzReportError(errorObj));
        });
    };
};

export var deleteServiceItem = (serviceItem) => {
    return {
        type: 'DELETE_SERVICE_ITEM',
        serviceItem
    };
};

export var startDeleteServiceItem = (serviceItemId) => {
    return (dispatch, getState) => {
        var serviceItemRef = firebaseRef.child(`services/${serviceItemId}`); //ES6 syntax

        return serviceItemRef.remove().then(() => {
            dispatch(deleteServiceItem(serviceItemId));
        }, (error) => {
            console.log("Unable to fetch services", error);
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

export var startUpdateServiceItem = (serviceItemId, title, description) => {
    return (dispatch, getState) => {
        var serviceItemRef = firebaseRef.child(`services/${serviceItemId}`); //ES6 syntax

        var updates = {
            updateAt: moment().unix(),
            serviceTitle: title,
            serviceDesc: description
        };

        return serviceItemRef.update(updates).then(() => {  //return needed to chain our tests
            dispatch(updateServiceItem(serviceItemId, updates));
        }, (error) => {
            console.log("Unable to update service", error);
            var errorObj = {
                errorCode: error.code,
                errorMessage: error.message
            };
            return dispatch(errorActions.bbzReportError(errorObj));
        });
    };
};