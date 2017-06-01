import React from 'react';
var {connect} = require('react-redux');
import moment from 'moment';
import {Link} from 'react-router';
import StarRatingItem from 'StarRatingItem';
import Linkify from 'react-linkify';
var companiesActions = require('companiesActions');
var errorActions = require('errorActions');

export class RatingItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    getWords = (str) => {
        return str.split(/\s+/).slice(0, 5).join(" ") + " ...";
    }

    renderRatingItem = (rating, review, companyItemId, companyTitle, showCompanyTitle, reviewId) => {

        const reviewHeader = this.getWords(review);

        return (
            <div>
                <StarRatingItem rating={rating}/>
                {showCompanyTitle == true && (
                    <div className="review-block-title">
                        <Link to={`/companyreviews?company=${companyItemId}`} activeClassName="active"
                              activeStyle={{fontWeight: 'bold'}}>{companyTitle}</Link>
                    </div>)}
                <div className="review-block-title">{reviewHeader}</div>
                <div className="column">
                    <span className="bbz-review-span">ID:</span>
                    <span>&nbsp;</span>
                    {reviewId}
                </div>
                <div className="review-block-description">
                    <Linkify properties={{target: '_blank', style: {color: 'blue'}}}>
                        {review}
                    </Linkify>
                </div>
            </div>
        )
    }

    render() {
        var {showCompanyTitle, displayName, email, uid, companyTitle, companyItemId, userProfile, reviewItemId, review, rating, isApproved, createAt, updateAt, auth, deleteReview, updateReview, reviewId} = this.props;

        var reviewer = displayName;

        if (displayName) {
            reviewer = displayName.split('@')[0];
        }

        var approveImageSource = "images/like-64.png";
        var approveMessage ="Approval Pending";

        if (isApproved) {
            approveImageSource = "images/check-blue-64.png";
            approveMessage ="Approved";
        }

        const reviewDate = moment.unix(createAt).format('MMM Do, YYYY');

        return (
            <div>
                {this.renderRatingItem(rating, review, companyItemId, companyTitle, showCompanyTitle, reviewId)}
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        userProfile: state.userProfile
    }
}
export default  connect(mapStateToProps)(RatingItem);
