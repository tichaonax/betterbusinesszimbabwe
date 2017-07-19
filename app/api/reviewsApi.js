/**
 * Created by tichaona on 7/2/17.
 */
import {Utils} from 'app/common/Utils';
var BbzApiBase = require('app/api/BbzApiBase');
class ReviewsApi extends BbzApiBase {
    constructor() {
        super(Utils.getUrlAddress(window.location.href));
    }

    findAllReviews = () => {
        var resource = '/api/reviews';
        return this.GET(resource).then((resp) => {
            //console.log(JSON.stringify(resp.data));
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    addNewReview = (userId, companyId, review, rating) => {
        var resource = `/api/reviews/save/${userId}`;
        let isApproved = 0;
        var data = {companyId, review, rating, isApproved};
        return this.POST(resource, data).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    updateReviewItem(reviewId, review, rating, userId) {
        var resource = `/api/reviews/update/info/${userId}`;
        var data = {reviewId, review, rating};
        return this.POST(resource, data).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    updateReviewIsApprovedFlag = (reviewId, isApproved, adminUserId) => {
        var resource = `/api/reviews/update/isapproved/${reviewId}/${adminUserId}`;
        var data = {isApproved};
        return this.POST(resource, data).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    findCompanyReviewsById = (companyId) => {
        var resource = `/api/reviews/company/${companyId}`;
        return this.GET(resource).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    getUserReviewCount = (userId) => {
        var resource = `/api/reviews/count/${userId}`;
        return this.GET(resource).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }

    getReviewById = (reviewId) => {
        var resource = `/api/reviews/${reviewId}`;
        return this.GET(resource).then((resp) => {
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }
}

module.exports = ReviewsApi;