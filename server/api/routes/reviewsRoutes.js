/**
 * Created by tichaona on 7/2/17.
 */
var Promise = require("bluebird");
var express = require('express');
var reviewsRoutes = express.Router();
var ServerUtils = require('../../ServerUtils');
const API = require('../../constants/API');


// get review with that reviewId
reviewsRoutes.route('/reviews/')
    .get(function (req, res) {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }
        var findAllReviews = require('../../dao/reviews/findAllReviews');
        return new Promise(() => {
            var reviews = findAllReviews('');
            return Promise.resolve(res.json({data: reviews}));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

// get all reviews fitting criteria
reviewsRoutes.route('/reviews/criteria/:criteria')
    .get(function (req, res) {
        console.log("criteria",req.params.criteria);
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }
        var findAllReviews = require('../../dao/reviews/findAllReviews');
        return new Promise(() => {
            var reviews = findAllReviews(req.params.criteria);
            return Promise.resolve(res.json({data: reviews}));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

// get review with that reviewId
reviewsRoutes.route('/reviews/:reviewId')
    .get(function (req, res) {
        console.log("/reviews/:reviewId'",req.params.reviewId);
        var findReviewById = require('../../dao/reviews/findReviewById');
        return new Promise(() => {
            var review = findReviewById(req.params.reviewId);
            return Promise.resolve(res.json({data: review}));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });


reviewsRoutes.route('/reviews/save/:userId')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let userId = req.params.userId;
        let adminUserId = null;
        let companyId = req.body.companyId;
        let rating = req.body.rating;
        let review = req.body.review;
        let isApproved = 0;
        let createAt = undefined;

        var insertReview = require('../../dao/reviews/insertReview');
        return new Promise(() => {
            let newRecord = insertReview(userId, adminUserId, companyId, rating, review, isApproved, createAt);
            let findReviewById = require('../../dao/reviews/findReviewById');
            //return the newly created row
            let newReview = findReviewById(newRecord.lastInsertROWID);
            return (Promise.resolve(res.json({data: newReview})));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

reviewsRoutes.route('/reviews/update/info/:userId')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let userId = req.params.userId;
        let reviewId = req.body.reviewId;
        let rating = req.body.rating;
        let review = req.body.review;

        var updateReviewInfo = require('../../dao/reviews/updateReviewInfo');
        return new Promise(() => {
            let updateRecord = updateReviewInfo(reviewId, review, rating, userId);
            let findReviewById = require('../../dao/reviews/findReviewById');
            //return the newly created row
            let updatedReview = findReviewById(reviewId);
            return (Promise.resolve(res.json({data: updatedReview})));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

//update review isapproved by reviewId
reviewsRoutes.route('/reviews/update/isapproved/:reviewId/:adminUserId')
    .post((req, res) => {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }

        let adminUserId = req.params.adminUserId;
        let reviewId = req.params.reviewId;
        let isApproved = (req.body.isApproved) ? 1 : 0;

        var updateReviewIsApprovedFlag = require('../../dao/reviews/updateReviewIsApprovedFlag');
        return new Promise(() => {
            let updateRecord = updateReviewIsApprovedFlag(reviewId, isApproved, adminUserId);
            var findReviewById = require('../../dao/reviews/findReviewById');
            //return the updated row
            let review = findReviewById(reviewId);
            return (Promise.resolve(res.json({data: review})));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });


// get review with that reviewId
reviewsRoutes.route('/reviews/company/:companyId')
    .get(function (req, res) {
        var findCompanyReviewsById = require('../../dao/reviews/findCompanyReviewsById');
        return new Promise(() => {
            var reviews = findCompanyReviewsById(req.params.companyId);
            return Promise.resolve(res.json({data: reviews}));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

// get user review count
reviewsRoutes.route('/reviews/count/:userId')
    .get(function (req, res) {
        var findUserReviewCountById = require('../../dao/reviews/findUserReviewCountById');
        return new Promise(() => {
            var reviewCount = findUserReviewCountById(req.params.userId);
            return Promise.resolve(res.json({data: reviewCount}));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });


module.exports = reviewsRoutes;