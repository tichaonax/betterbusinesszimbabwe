/**
 * Created by tichaona on 7/8/17.
 */
var Promise = require("bluebird");
var express = require('express');
var companiesRoutes = express.Router();
var ServerUtils = require('../../ServerUtils');
const API = require('../../constants/API');

// get all companies
companiesRoutes.route('/companies')
    .get(function (req, res) {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }
        var findAllCompaniesWithServicesCategory = require('../../dao/companies/findAllCompaniesWithServicesCategory');
        return new Promise(() => {
            var companies = findAllCompaniesWithServicesCategory();
            return Promise.resolve(res.json({data: companies}));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

// get company by companyId
companiesRoutes.route('/companies/:companyId')
    .get((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let companyId = req.params.companyId;

        var findCompanyById = require('../../dao/companies/findCompanyById');
        return new Promise(() => {
            var company = findCompanyById(companyId);
            return Promise.resolve(res.json({data: company}));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

companiesRoutes.route('/companies/save/:userId')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let userId = req.params.userId;
        let serviceId = req.body.serviceId;
        let companyTitle = req.body.companyTitle;
        let companyDesc = req.body.companyDesc;
        let rating = req.body.rating;
        let reviewCount = req.body.reviewCount;
        let isApproved = (req.body.isApproved) ? 1 : 0;

        var insertCompany = require('../../dao/companies/insertCompany');
        return new Promise(() => {
            let newRecord = insertCompany(userId, serviceId, companyTitle,
                companyDesc, rating, reviewCount, isApproved);
            let findCompanyById = require('../../dao/companies/findCompanyById');
            //return the newly created row
            let company = findCompanyById(newRecord.lastInsertROWID);
            return (Promise.resolve(res.json({data: company})));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

//update company basic Info by companyId
companiesRoutes.route('/companies/update/info/:companyId')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let companyId = req.params.companyId;
        let serviceId = req.body.serviceId;
        let companyTitle = req.body.companyTitle;
        let companyDesc = req.body.companyDesc;

        var updateCompanyInfo = require('../../dao/companies/updateCompanyInfo');
        return new Promise(() => {
            let updateRecord = updateCompanyInfo(companyId, serviceId, companyTitle, companyDesc);
            var findCompanyById = require('../../dao/companies/findCompanyById');
            //return the updated row
            let company = findCompanyById(companyId);
            return (Promise.resolve(res.json({data: company})));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });


//update company by companyId
companiesRoutes.route('/companies/update/:companyId')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let companyId = req.params.companyId;
        let serviceId = req.body.serviceId;
        let companyTitle = req.body.companyTitle;
        let companyDesc = req.body.companyDesc;
        let rating = req.body.rating;
        let reviewCount = req.body.reviewCount;
        let isApproved = (req.body.isApproved) ? 1 : 0;

        var updateCompany = require('../../dao/companies/updateCompany');
        return new Promise(() => {
            let updateRecord = updateCompany(companyId, serviceId, companyTitle, companyDesc, rating, reviewCount, isApproved);
            var findCompanyById = require('../../dao/companies/findCompanyById');
            //return the updated row
            let company = findCompanyById(companyId);
            return (Promise.resolve(res.json({data: company})));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });


//update company isapproved by companyId
companiesRoutes.route('/companies/update/isapproved/:companyId')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let companyId = req.params.companyId;
        let isApproved = (req.body.isApproved) ? 1 : 0;

        var updateCompanyIsApprovedFlag = require('../../dao/companies/updateCompanyIsApprovedFlag');
        return new Promise(() => {
            let updateRecord = updateCompanyIsApprovedFlag(companyId, isApproved);
            var findCompanyById = require('../../dao/companies/findCompanyById');
            //return the updated row
            let company = findCompanyById(companyId);
            return (Promise.resolve(res.json({data: company})));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

//update company Rating Info by companyId
companiesRoutes.route('/companies/update/ratinginfo/:companyId')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let companyId = req.params.companyId;
        let rating = req.body.rating;
        let reviewCount = req.body.reviewCount;

        var updateCompanyRatingInfo = require('../../dao/companies/updateCompanyRatingInfo');
        return new Promise(() => {
            let updateRecord = updateCompanyRatingInfo(companyId, rating, reviewCount);
            var findCompanyById = require('../../dao/companies/findCompanyById');
            //return the updated row
            let company = findCompanyById(companyId);
            return (Promise.resolve(res.json({data: company})));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });


module.exports = companiesRoutes;