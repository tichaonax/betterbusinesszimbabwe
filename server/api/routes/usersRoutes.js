/**
 * Created by tichaona on 7/2/17.
 */
var Promise = require("bluebird");
var express = require('express');
var usersRoutes = express.Router();
var ServerUtils = require('../../ServerUtils');
const API = require('../../constants/API');

// get all users
usersRoutes.route('/users')
    .get(function (req, res) {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }
        var findAllUsers = require('../../dao/users/findAllUsers');
        return new Promise(() => {
            var users= findAllUsers();
            return Promise.resolve(res.json({data: users}));
        }).catch((error)=>{
            return Promise.reject(error)
        });
    });

// get user by userId
usersRoutes.route('/users/:userId')
    .get((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let userId = req.params.userId;

        var findUserById = require('../../dao/users/findUserById');
        return new Promise(() => {
            var user = findUserById(userId);
            return Promise.resolve(res.json({data: user}));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

// get user by firebaseId
usersRoutes.route('/users/firebase/:firebaseId')
    .get((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let firebaseId = req.params.firebaseId;

        var findUserByFirebaseId = require('../../dao/users/findUserByFirebaseId');
        return new Promise(() => {
            var user = findUserByFirebaseId(firebaseId);
            return Promise.resolve(res.json({data: user}));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

usersRoutes.route('/users/save/:firebaseId')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let firebaseId = req.params.firebaseId;
        let displayName = req.body.displayName;
        let email = req.body.email;
        let photoURL = req.body.photoURL;
        let providerId = req.body.providerId;
        let uid = req.body.uid;
        let reviewCount = req.body.reviewCount;
        let isSuperUser = (req.body.isSuperUser) ? 1 : 0;
        let isAdmin = (req.body.isSuperUser) ? 1 : 0;

        var insertUser = require('../../dao/users/insertUser');
        return new Promise(() => {
            let newRecord = insertUser(
                firebaseId, displayName, email, photoURL,
                providerId, uid, reviewCount, isSuperUser, isAdmin);
            let findUserById = require('../../dao/users/findUserById');
            //return the newly created row
            let user = findUserById(newRecord.lastInsertROWID);
            return (Promise.resolve(res.json({data: user})));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

//update user firebase user profile
usersRoutes.route('/users/update/profile/:firebaseId')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let firebaseId = req.params.firebaseId;
        let displayName = req.body.displayName;
        let email = req.body.email;
        let photoURL = req.body.photoURL;
        let providerId = req.body.providerId;
        let uid = req.body.uid;

        var updateFirebaseUserProfile = require('../../dao/users/updateFirebaseUserProfile');
        return new Promise(() => {
            let updateRecord = updateFirebaseUserProfile(firebaseId, displayName, email, photoURL, providerId, uid);
            var findUserByFirebaseId = require('../../dao/users/findUserByFirebaseId');
            //return the updated row
            let user = findUserByFirebaseId(firebaseId);
            return (Promise.resolve(res.json({data: user})));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });


//update user profile lastlogin
usersRoutes.route('/users/profile/lastlogin/update/:userId')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let userId = req.params.userId;
        let city = req.body.city;
        let country = req.body.country;
        let ipAddress = req.body.ipAddress;

        var updateUserLastLogin = require('../../dao/users/updateUserLastLogin');
        return new Promise(() => {
            let updateRecord = updateUserLastLogin(userId, city, country, ipAddress);
            var findUserById = require('../../dao/users/findUserById');
            //return the updated row
            let user = findUserById(userId);
            return (Promise.resolve(res.json({data: user})));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });



/*
// get last login by userId
usersRoutes.route('/lastlogin/:userId')
    .get((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let userId = req.params.userId;

        var findUserById = require('../../dao/users/findUserById');
        return new Promise(() => {
            var user = findUserById(userId);
            return Promise.resolve(res.json({data: user}));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });
*/

/*
// update user record by admin
usersRoutes.route('/users/update/:userId/:adminUid')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

//        let userId = req.params.userId;
        let userId = req.params.userId;

        var updateUser = require('../../dao/users/updateUser');
        return new Promise(() => {
            var user = updateUser(userId, userItemId, userCategory, userId);
            return Promise.resolve(res.json({data: user}));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });
*/



// register insert user
usersRoutes.route('/users/save')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let firebaseId = req.body.firebaseId;
        let displayName = req.body.displayName;
        let email = req.body.email;
        let photoURL = req.body.photoURL;
        let providerId = req.body.providerId;
        let uid = req.body.uid;
        let reviewCount = req.body.reviewCount;
        let isSuperUser = (req.body.isSuperUser) ? 1 : 0;
        let isAdmin = (req.body.isAdmin) ? 1 : 0;

        var insertUser = require('../../dao/users/insertUser');
        return new Promise(() => {
            var newRecord = insertUser(firebaseId, displayName, email,
                photoURL, providerId, uid, reviewCount, isSuperUser, isAdmin);
            var findUserById = require('../../dao/users/findUserById');
            //return the newly created row
            var user = findUserById(newRecord.lastInsertROWID);
            return (Promise.resolve(res.json({data: user})));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });


// delete user category, just mark the isApproved flag
usersRoutes.route('/users/delete/:userId/:adminUid')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

    //    let userId = req.params.userId;
        let userId = req.params.userId;

        var deleteUserById = require('../../dao/users/deleteUserById');
        return new Promise(() => {
            deleteUserById(userId, userId);
            var findUserById = require('../../dao/users/findUserById');
            //return the newly created row
            var user = findUserById(userId);
            return Promise.resolve(res.json({data: user}));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

module.exports = usersRoutes;