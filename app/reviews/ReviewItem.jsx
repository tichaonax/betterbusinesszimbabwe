import React from 'react';
var {connect} = require('react-redux');
import moment from 'moment';
import {findDOMNode} from 'react-dom'
import ReactTooltip from 'react-tooltip'
import RatingItem from 'RatingItem';
import {Link} from 'react-router';
var reviewsActions = require('reviewsActions');
var companiesActions = require('companiesActions');
var errorActions = require('errorActions');

export class ReviewItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    renderCompanyRating = (rating, review, companyItemId, companyTitle, showCompanyTitle, reviewId, reviewItemId) => {
        return (<RatingItem rating={rating}
                            review={review}
                            companyItemId={companyItemId}
                            companyTitle={companyTitle}
                            showCompanyTitle={showCompanyTitle}
                            reviewId={reviewId}
                            reviewItemId={reviewItemId}/>);
    }

    render() {
        var {
            showCompanyTitle,
            displayName, email, uid,
            companyTitle, companyItemId,
            userProfile, reviewItemId, review,
            rating, isApproved, createAt, updateAt,
            auth, deleteReview, updateReview, photoURL,
            adminUid
        } = this.props;

        var reviewer = displayName;

        if (displayName) {
            reviewer = displayName.split('@')[0];
        }

        var approveImageSource = "images/like-64.png";
        var approveMessage = "Approval Pending";

        if (isApproved) {
            approveImageSource = "images/check-blue-64.png";
            approveMessage = "Approved";
        }

        const reviewId = createAt;

        const reviewDate = moment.unix(createAt).format('MMM Do, YYYY');

        return (
            <div className="col-sm-12">
                <div className="review-block">
                    <div className="row">
                        <div className="col-sm-4">
                            <img src={photoURL} alt="Smiley face" height="43" width="43" className="img-rounded"/>
                            <div className="review-block-name">{reviewer}</div>
                            {auth.loggedIn && userProfile && userProfile.isAdmin && (
                                <div className="review-block-name">
                                    <span className="bbz-review-span">Email:</span>
                                    <span>&nbsp;</span>
                                    {email}
                                    <span>&nbsp;</span>
                                </div>)}
                            <div className="review-block-date">{reviewDate}<br/></div>

                            {((auth.loggedIn && userProfile && userProfile.isAdmin) || (auth.uid === uid)) && (
                                <form className="form-inline">
                                    {(auth.loggedIn && userProfile && userProfile.isAdmin) && (
                                        <div className="form-group">
                                            <span className="bbz-review-span">Delete:</span>
                                            <span>&nbsp;</span>
                                            <img className="bbz-general-pointer" type="image" value="submit"
                                                 height="15"
                                                 width="15" src="images/delete-blue-x-64.png"
                                                 alt="Delete Review"
                                                 onMouseOver={() => {
                                                     ReactTooltip.show(findDOMNode(deleteReview));
                                                 }}
                                                 onMouseOut={() => {
                                                     ReactTooltip.hide(findDOMNode(deleteReview));
                                                 }}
                                                 onClick={() => {
                                                     if (userProfile && userProfile.isAdmin) {
                                                         this.dispatch(reviewsActions.startDeleteReviewItem(reviewItemId, isApproved));
                                                     } else {
                                                         var error = {};
                                                         error.errorMessage = "You must be admin to delete this review information";
                                                         this.dispatch(errorActions.bbzReportError(error));
                                                         window.scrollTo(0, 0);
                                                     }
                                                 }}/>
                                        </div>
                                    )}
                                    {auth.uid === uid && (
                                        <div className="form-group">
                                            <span className="bbz-review-span">Update:</span>
                                            <span>&nbsp;</span>
                                            <img className="bbz-general-pointer" type="image" value="submit" height="20"
                                                 width="20" src="images/update-blue-64.png"
                                                 alt="Update Review"
                                                 onMouseOver={() => {
                                                     ReactTooltip.show(findDOMNode(updateReview));
                                                 }}
                                                 onMouseOut={() => {
                                                     ReactTooltip.hide(findDOMNode(updateReview));
                                                 }}
                                                 onClick={() => {
                                                     //console.debug("auth.uid", auth.uid);
                                                     //console.debug("rating uid", uid);
                                                     if (auth.loggedIn && auth.uid === uid) {
                                                         var data = {
                                                             uid,
                                                             reviewItemId,
                                                             companyItemId,
                                                             rating,
                                                             review,
                                                             isApproved
                                                         }
                                                         //console.debug("ReviewItems Data:", data);
                                                         this.dispatch(reviewsActions.setUpdateReviewOperation(data));
                                                     }
                                                     else {
                                                         var error = {};
                                                         error.errorMessage = "You must be the owner to update this review information";
                                                         this.dispatch(errorActions.bbzReportError(error));
                                                     }
                                                     window.scrollTo(0, 0);
                                                 }}/>
                                        </div>
                                    )}
                                </form>)}
                            {((auth.loggedIn && userProfile && userProfile.isAdmin) || (auth.uid === uid)) && (
                                <div className="column">
                                    <span className="bbz-review-span">{approveMessage}:</span>
                                    <span>&nbsp;</span>
                                    <img className="bbz-general-pointer" type="image" value="submit" height="20"
                                         width="20" src={approveImageSource}
                                         onClick={() => {
                                             this.dispatch(errorActions.bbzClearError());
                                             if (userProfile.isAdmin) {
                                                 this.dispatch(reviewsActions.startApproveUpdateReviewItem(reviewItemId, !isApproved, companyItemId, uid, auth.uid));
                                             } else {
                                                 var error = {};
                                                 error.errorMessage = "You must be admin to change approval";
                                                 this.dispatch(errorActions.bbzReportError(error));
                                                 window.scrollTo(0, 0);
                                             }
                                         }}/>
                                </div>
                            )}
                            <div>
                                {auth.loggedIn && userProfile && userProfile.isAdmin && adminUid && (
                                    <div>
                                        <Link to={`/users?uid=${adminUid}`} activeClassName="active"
                                              activeStyle={{fontWeight: 'bold'}}>Status By</Link>
                                    </div>)}
                            </div>
                        </div>
                        <div className="col-sm-8">
                            {this.renderCompanyRating(rating, review, companyItemId, companyTitle, showCompanyTitle, reviewId, reviewItemId)}
                        </div>
                    </div>
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
