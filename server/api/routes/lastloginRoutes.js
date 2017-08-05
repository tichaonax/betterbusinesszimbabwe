/**
 * Created by tichaona on 7/2/17.
 */
var Promise = require("bluebird");
var express = require('express');
var lastLoginRoutes = express.Router();
var ServerUtils = require('../../ServerUtils');
const API = require('../../constants/API');

// get all lastLogins
lastLoginRoutes.route('/lastlogin')
    .get(function (req, res) {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }
        var findAllLastLogins = require('../../dao/lastlogin/findAllLastLogins');
        return new Promise(() => {
            var lastLogins = findAllLastLogins();
            return Promise.resolve(res.json({data: lastLogins}));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

// get lastlogin by lastloginId
lastLoginRoutes.route('/lastlogin/:lastloginId')
    .get((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let lastloginId = req.params.lastloginId;

        var findLastLoginById = require('../../dao/lastLogin/findLastLoginById');
        return new Promise(() => {
            var lastlogin = findLastLoginById(lastloginId);
            return Promise.resolve(res.json({data: lastlogin}));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

// get lastlogin by userId
lastLoginRoutes.route('/lastlogin/user/:userId')
    .get((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let userId = req.params.userId;

        var findLastLoginByUserId = require('../../dao/lastLogin/findLastLoginByUserId');
        return new Promise(() => {
            var lastlogin = findLastLoginByUserId(userId);
            return Promise.resolve(res.json({data: lastlogin}));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });


// insert lastlogin
lastLoginRoutes.route('/lastLogin/save/:userId')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let userId = req.params.userId;
        let city = req.body.city;
        let country = req.body.country;
        let ipAddress = req.body.ipAddress;
        let loginAt = req.body.loginAt;

        var insertLastLogin = require('../../dao/lastLogin/insertLastLogin');
        return new Promise(() => {
            var newRecord = insertLastLogin(userId, city, country, ipAddress, loginAt);
            var findLastLoginById = require('../../dao/lastLogin/findLastLoginById');
            //return the newly created row
            var lastlogin = findLastLoginById(newRecord.lastInsertROWID);
            return (Promise.resolve(res.json({data: lastlogin})));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

// update lastlogin record on login
lastLoginRoutes.route('/lastLogin/update/:userId')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let userId = req.params.userId;
        let city = req.body.city;
        let country = req.body.country;
        let ipAddress = req.body.ipAddress;

        var updateUserLastLogin = require('../../dao/lastlogin/updateLastLogin');
        return new Promise(() => {
            var updatedLastLogin = updateUserLastLogin(userId, city, country, ipAddress);
            let findLastLoginByUserId = require('../../dao/lastlogin/findLastLoginByUserId');
            let lastLogin = findLastLoginByUserId(userId);
            return (Promise.resolve(res.json({data: lastLogin})));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

// move to last login
lastLoginRoutes.route('/lastLogin/move/:userId')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let userId = req.params.userId;
        let city = req.body.city;
        let country = req.body.country;
        let ipAddress = req.body.ipAddress;
        let loginAt = req.body.loginAt;

        var updateLastLogin = require('../../dao/lastlogin/updateLastLogin');
        return new Promise(() => {
            var user = updateLastLogin(userId, city, country, ipAddress, loginAt);
            console.log("check if we updated", user);//we will need to insert instead
            if (user.changes == 0) {
                var insertLastLogin = require('../../dao/lastLogin/insertLastLogin');
                user = insertLastLogin(userId, city, country, ipAddress, loginAt);
            }
            return Promise.resolve(res.json({data: user}));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });


module.exports = lastLoginRoutes;