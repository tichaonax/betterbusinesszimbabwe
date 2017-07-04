/**
 * Created by tichaona on 7/2/17.
 */
var express = require('express');
var servicesRoutes = express.Router();              // get an instance of the express Router

// get all services
servicesRoutes.route('/services')
    .get(function (req, res) {
        var findAllServices = require('../../dao/services/findAllServices');
        return new Promise((resolve, reject) => {
            var services= findAllServices();
            return(Promise.resolve(res.json({data: services})));
        }).catch((error)=>{
            return Promise.reject(error)
        });
    });

// get service with that serviceItemId
servicesRoutes.route('/services/:serviceItemId')
    .get(function(req, res) {
        var findServiceByItemId = require('../../dao/services/findServiceByItemId');
        return new Promise((resolve, reject) => {
            var service= findServiceByItemId(req.params.serviceItemId);
            return(Promise.resolve(res.json({data: service})));
        }).catch((error)=>{
            return Promise.reject(error)
        });
    });

module.exports = servicesRoutes;