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
            console.log(resp);
            return resp.data;
        }, (error) => {
            throw new Error(error);
        })
    }
}

module.exports = ReviewsApi;