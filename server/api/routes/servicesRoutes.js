/**
 * Created by tichaona on 7/2/17.
 */
var Promise = require("bluebird");
var express = require('express');
var servicesRoutes = express.Router();
var ServerUtils = require('../../ServerUtils');
const API = require('../../constants/API');

// get all services
servicesRoutes.route('/services')
    .get(function (req, res) {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return new Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }
        var findAllServices = require('../../dao/services/findAllServices');
        return new Promise(() => {
            var services= findAllServices();
            return(Promise.resolve(res.json({data: services})));
        }).catch((error)=>{
            return Promise.reject(error)
        });
    });

// get service with that serviceId
servicesRoutes.route('/services/:serviceId')
    .get((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return new Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }
        var findServiceById = require('../../dao/services/findServiceById');
        return new Promise(() => {
            var service = findServiceById(req.params.serviceId);
            return (Promise.resolve(res.json({data: service})));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

// update service record
servicesRoutes.route('/services/update/:serviceId')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return new Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }
        var updateService = require('../../dao/services/updateService');
        return new Promise(() => {
            var service = updateService(req.params.serviceId, req.body.serviceItemId, req.body.serviceCategory, req.body.userId);
            return (Promise.resolve(res.json({data: service})));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });


// update service category
servicesRoutes.route('/services/update/category/:serviceId')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return new Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }
        var updateServiceCategory = require('../../dao/services/updateServiceCategory');
        return new Promise(() => {
            var service = updateServiceCategory(req.params.serviceId, req.body.serviceCategory, req.body.userId);
            return (Promise.resolve(res.json({data: service})));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

// insert service category
servicesRoutes.route('/services/save')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return new Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }
        var insertServiceCategory = require('../../dao/services/insertServiceCategory');
        return new Promise(() => {
            var service = insertServiceCategory(req.body.serviceCategory, req.body.userId);
            return (Promise.resolve(res.json({data: service})));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });


// delete service category, just mark the isApproved flag
servicesRoutes.route('/services/delete/:serviceId/:userId')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return new Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }
        var deleteServiceById = require('../../dao/services/deleteServiceById');
        return new Promise(() => {
            var service = deleteServiceById(req.params.serviceId, req.params.userId);
            return (Promise.resolve(res.json({data: service})));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

module.exports = servicesRoutes;