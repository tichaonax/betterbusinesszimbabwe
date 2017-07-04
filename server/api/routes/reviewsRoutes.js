/**
 * Created by tichaona on 7/2/17.
 */
var Promise = require("bluebird");
var express = require('express');
var reviewsRoutes = express.Router();
var ServerUtils = require('../../ServerUtils');
const API = require('../../constants/API');

// get all reviews
reviewsRoutes.route('/reviews')
    .get(function (req, res) {
        if (!ServerUtils.isAuthorizeApiCall(req)) {
            return new Promise.reject(res.json({error: API.BBZ_NOT_AUTHORIZED}));
        }
        var findAllReviews = require('../../dao/reviews/findAllReviews');
        return new Promise(() => {
            var reviews = findAllReviews();
            return (Promise.resolve(res.json({data: reviews})));
        }).catch((error) => {
            return Promise.reject(error)
        });
    });

// get review with that reviewId
reviewsRoutes.route('/reviews/:reviewId')
    .get(function(req, res) {
        var findReviewById = require('../../dao/reviews/findReviewById');
        return new Promise((resolve, reject) => {
            var review= findReviewById(req.params.reviewId);
            return(Promise.resolve(res.json({data: review})));
        }).catch((error)=>{
            return Promise.reject(error)
        });
    });

module.exports = reviewsRoutes;