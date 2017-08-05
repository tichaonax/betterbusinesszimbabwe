/**
 * Created by tichaona on 7/22/17.
 */
var insertReview = require('../../reviews/insertReview');
var randomDecimal = require('random-decimal');
var insertTestReviews = () => {
    for (var i = 0; i < 1000; i++) {

        let reviewUserId = 6;
        let reviewAdminUserId = null;
        let companyId = 6;
        let rating = randomDecimal({min: 0.5, max: 5.0, fixed: 1});
        let review = `Professional people fast and friendly. Just make sure your papers are in order. They will not release your freight unless all paperwork is in order. Be sure to get proper paperwork and proof of payment from your shipper. They made me pay double to get my stuff and refunded later after payment proof.`
        let reviewIsApproved = 1;
        let reviewCreateAt = null;
        insertReview(reviewUserId, reviewAdminUserId,
            companyId, rating,
            review,
            reviewIsApproved, reviewCreateAt);
    }

}

module.exports = insertTestReviews;