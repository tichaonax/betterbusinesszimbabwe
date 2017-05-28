import React from 'react';
var {connect} = require('react-redux');
var Rate = require('rc-rate');
import {Link} from 'react-router';
import {findDOMNode} from 'react-dom'
import ReactTooltip from 'react-tooltip'
import Linkify from 'react-linkify';
var reviewsActions = require('reviewsActions');
var companiesActions = require('companiesActions');
var errorActions = require('errorActions');

export class ReviewItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    itemSizeGetter = (review) => {
        var divHeight = 30;
        if (review.length > 50) {
            divHeight = 10 + Math.round((review.length / 60)) * 30
        }
        return divHeight;
    }

    render() {
        var {displayName, email, uid, companyTitle, companyItemId, userProfile, reviewItemId, review, rating, isApproved, createAt, updateAt, auth, deleteReview, updateReview} = this.props;

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

        const reviewId = createAt;

        var divHeight = "50px";
        if (review) {
            divHeight = this.itemSizeGetter(review) + 'px';
        }

        return (
            <div className="row align-top" style={{height: divHeight}}>
                <div className="column">
                    <span className="bbz-review-span">Company:</span>
                    <span>&nbsp;</span>
                    <Link to={`/companies?company=${companyItemId}`} activeClassName="active"
                          activeStyle={{fontWeight: 'bold'}}>{companyTitle}</Link>
                </div>
                <div className="column">
                    <span className="label bbz-review-span">Rating:</span>
                    <span>&nbsp;</span>
                    <Rate
                        defaultValue={rating}
                        style={{fontSize: 15}}
                        allowHalf
                        value={rating}
                    />
                </div>
                <div className="column">
                    <span className="bbz-review-span">ID:</span>
                    <span>&nbsp;</span>
                    {reviewId}
                </div>
                <div className="column">
                    <span className="bbz-review-span">Reviewer:</span>
                    <span>&nbsp;</span>
                    {reviewer}</div>
                <div className="column">
                    <span className="bbz-review-span">Review:</span>
                    <span>&nbsp;</span>
                    <Linkify properties={{target: '_blank', style: {color: 'blue'}}}>
                        {review}
                    </Linkify>
                </div>
                {auth.loggedIn && (
                    <form>
                        <div className="column">
                            <span className="bbz-review-span">Delete:</span>
                            <span>&nbsp;</span>
                            <img className="bbz-general-pointer" type="image" value="submit" height="15" width="15" src="images/delete-blue-x-64.png"
                                 alt="Delete Review"
                                 onMouseOver={() => {
                                     ReactTooltip.show(findDOMNode(deleteReview));
                                 }}
                                 onMouseOut={() => {
                                     ReactTooltip.hide(findDOMNode(deleteReview));
                                 }}
                                 onClick={() => {
                                     if (userProfile && userProfile.isAdmin) {
                                         this.dispatch(reviewsActions.startDeleteReviewItem(reviewItemId));
                                     } else {
                                         var error = {};
                                         error.errorMessage = "You must be admin to delete this review information";
                                         this.dispatch(errorActions.bbzReportError(error));
                                     }
                                 }}/>
                        </div>
                        <div className="column">
                            <span className="bbz-review-span">Update:</span>
                            <span>&nbsp;</span>
                            <img className="bbz-general-pointer" type="image" value="submit" height="20" width="20" src="images/update-blue-64.png"
                                 alt="Update Review"
                                 onMouseOver={() => {
                                     ReactTooltip.show(findDOMNode(updateReview));
                                 }}
                                 onMouseOut={() => {
                                     ReactTooltip.hide(findDOMNode(updateReview));
                                 }}
                                 onClick={() => {

                                     if (auth.uid === uid || userProfile.isAdmin) {
                                         var data = {
                                             uid,
                                             reviewItemId,
                                             companyItemId,
                                             rating,
                                             review
                                         }

                                        // console.debug("ReviewItems Data:", data);

                                         this.dispatch(reviewsActions.setUpdateReviewOperation(data));
                                     }
                                     else {
                                         var error = {};
                                         error.errorMessage = "You must be the owner or admin to update this review information";
                                         this.dispatch(errorActions.bbzReportError(error));
                                     }
                                 }}/>
                        </div>
                    </form>)}
                {auth.loggedIn && userProfile && userProfile.isAdmin && (
                    <div className="column">
                        <span className="bbz-review-span">{approveMessage}:</span>
                        <span>&nbsp;</span>
                        <img className="bbz-general-pointer" type="image" value="submit" height="20" width="20" src={approveImageSource}
                             onClick={() => {
                                 this.dispatch(errorActions.bbzClearError());
                                 if (userProfile.isAdmin) {
                                     this.dispatch(reviewsActions.startApproveUpdateReviewItem(reviewItemId,!isApproved,companyItemId));
                                     //this.dispatch(companiesActions.startUpdateCompanyItemReviewCount(companyItemId, !isApproved, rating))
                                 } else {
                                     var error = {};
                                     error.errorMessage = "You must be admin to approve";
                                     this.dispatch(errorActions.bbzReportError(error));
                                 }
                             }}/>
                    </div>
                )}
                {auth.loggedIn && userProfile && userProfile.isAdmin && (
                    <div className="column">
                        <span className="bbz-review-span">Email:</span>
                        <span>&nbsp;</span>
                        {email}
                    </div>)}
                    <div>
                        <hr/>
                    </div>
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
export default  connect(mapStateToProps)(ReviewItem);
