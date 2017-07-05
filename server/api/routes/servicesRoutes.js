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
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }
        var findAllServices = require('../../dao/services/findAllServices');
        return new Promise(() => {
            var services= findAllServices();
            return Promise.resolve(res.json({data: services}));
        }).catch((error)=>{
            return Promise.reject(error)
        });
    });

// get service with that serviceId
servicesRoutes.route('/services/:serviceId')
    .get((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let serviceId = req.params.serviceId;

        var findServiceById = require('../../dao/services/findServiceById');
        return new Promise(() => {
            var service = findServiceById(serviceId);
            return Promise.resolve(res.json({data: service}));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

// update service record
servicesRoutes.route('/services/update/:serviceId/:userId')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let serviceId = req.params.serviceId;
        let userId = req.params.userId;
        let serviceCategory = req.body.serviceCategory;
        let serviceItemId = req.body.serviceItemId;

        var updateService = require('../../dao/services/updateService');
        return new Promise(() => {
            var service = updateService(serviceId, serviceItemId, serviceCategory, userId);
            return Promise.resolve(res.json({data: service}));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

// update service category
servicesRoutes.route('/services/update/category/:serviceId/:userId')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let serviceId = req.params.serviceId;
        let userId = req.params.userId;
        let serviceCategory = req.body.serviceCategory;

        var updateServiceCategory = require('../../dao/services/updateServiceCategory');
        return new Promise(() => {
            updateServiceCategory(serviceId, serviceCategory, userId);
            var findServiceById = require('../../dao/services/findServiceById');
            var service = findServiceById(serviceId);
            return Promise.resolve(res.json({data: service}));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

// insert service category
servicesRoutes.route('/services/save/:userId')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let userId = req.params.userId;
        let serviceCategory = req.body.serviceCategory;

        var insertServiceCategory = require('../../dao/services/insertServiceCategory');
        return new Promise(() => {
            var newRecord = insertServiceCategory(serviceCategory, userId);
            var findServiceById = require('../../dao/services/findServiceById');
            //return the newly created row
            var service = findServiceById(newRecord.lastInsertROWID);
            return (Promise.resolve(res.json({data: service})));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

// delete service category, just mark the isApproved flag
servicesRoutes.route('/services/delete/:serviceId/:userId')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let serviceId = req.params.serviceId;
        let userId = req.params.userId;

        var deleteServiceById = require('../../dao/services/deleteServiceById');
        return new Promise(() => {
            deleteServiceById(serviceId, userId);
            var findServiceById = require('../../dao/services/findServiceById');
            //return the newly created row
            var service = findServiceById(serviceId);
            return Promise.resolve(res.json({data: service}));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

module.exports = servicesRoutes;