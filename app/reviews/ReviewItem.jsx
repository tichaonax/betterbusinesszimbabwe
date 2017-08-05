import React from 'react';
var {connect} = require('react-redux');
import moment from 'moment';
import RatingItem from 'RatingItem';
import {Link} from 'react-router';
var reviewsSqliteActions = require('reviewsSqliteActions');
var companiesActions = require('companiesActions');
var errorActions = require('errorActions');
import {openUpdatePanel} from 'app/common/Utils';

export class ReviewItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    renderCompanyRating = (rating, review, companyId, companyTitle, showCompanyTitle, reviewId) => {
        return (<RatingItem rating={rating}
                            review={review}
                            companyId={companyId}
                            companyTitle={companyTitle}
                            showCompanyTitle={showCompanyTitle}
                            reviewId={reviewId}/>);
    }

    render() {
        var {
            showCompanyTitle,
            displayName, email, userId,
            companyTitle, companyId,
            userProfile, reviewId, review,
            rating, isApproved, createAt, updateAt,
            auth, deleteReview, updateReview, photoURL,
            adminUid, reviewCount
        } = this.props;

        var reviewer = displayName;

        if (displayName) {
            reviewer = displayName.split('@')[0];
        }

        var approveImageSource = "images/like-64.png";
        var approveMessage = "Approval Pending";

        let approved = (isApproved === 1);

        if (approved) {
            approveImageSource = "images/check-blue-64.png";
            approveMessage = "Approved";
        }

        return (
            <div className="col-sm-12">
                <div className="review-block">
                    <div className="row">
                        <div className="col-sm-4">
                            <Link to={`/reviews?user=${userId}&userviews=true`} activeClassName="active bbz-review-span"
                                  activeStyle={{fontWeight: 'bold'}}>
                                <img src={photoURL} alt="Smiley face" height="43" width="43" className="img-rounded"/>
                            </Link>
                            <div>
                                <span className="label bbz-review-span">Reviews:</span>
                                <span>&nbsp;</span>
                                <Link to={`/reviews?user=${userId}&userviews=true`} activeClassName="active bbz-review-span"
                                      activeStyle={{fontWeight: 'bold'}}>{reviewCount}</Link>
                            </div>

                            <div className="review-block-name">{reviewer}</div>
                            {auth.loggedIn && userProfile && (userProfile.isAdmin == 1) && (
                                <div className="review-block-name">
                                    <span className="bbz-review-span">Email:</span>
                                    <span>&nbsp;</span>
                                    {email}
                                    <span>&nbsp;</span>
                                </div>)}
                            <div className="review-block-date">{createAt}<br/></div>

                            {((auth.loggedIn && userProfile && userProfile.isAdmin == 1) ||
                            (userProfile && userProfile.userId === userId)) && (
                                <form className="form-inline">
                                    {(auth.loggedIn && userProfile && userProfile.isAdmin == 1) && (
                                        <div className="form-group">
                                            <span className="bbz-review-span">Delete:</span>
                                            <span>&nbsp;</span>
                                            <img className="bbz-general-pointer" type="image" value="submit"
                                                 height="15"
                                                 width="15" src="images/delete-blue-x-64.png"
                                                 alt="Delete Review"

                                                 onClick={() => {
                                                     if (userProfile && userProfile.isAdmin == 1) {
                                                         //disable delete until confirm dialog is in place
                                                         //this.dispatch(reviewsSqliteActions.startDeleteReviewItem(reviewId, approved));
                                                     } else {
                                                         openUpdatePanel();
                                                         var error = {};
                                                         error.errorMessage = "You must be admin to delete this review information";
                                                         this.dispatch(errorActions.bbzReportError(error));
                                                         window.scrollTo(0, 0);
                                                     }
                                                 }}/>
                                        </div>
                                    )}
                                    {userProfile && userProfile.userId === userId && (
                                        <div className="form-group">
                                            <span className="bbz-review-span">Update:</span>
                                            <span>&nbsp;</span>
                                            <img className="bbz-general-pointer" type="image" value="submit" height="20"
                                                 width="20" src="images/update-blue-64.png"
                                                 alt="Update Review"

                                                 onClick={() => {
                                                     openUpdatePanel();
                                                     //console.debug("auth.userId", auth.userId);
                                                     //console.debug("rating userId", userId);
                                                     if (auth.loggedIn && userProfile && userProfile.userId === userId) {
                                                         var data = {
                                                             userId,
                                                             reviewId,
                                                             companyId,
                                                             rating,
                                                             review,
                                                             approved
                                                         }
                                                         //console.debug("ReviewItems Data:", data);
                                                         this.dispatch(reviewsSqliteActions.setUpdateReviewOperation(data));
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
                            {((auth.loggedIn && userProfile && userProfile.isAdmin == 1) ||
                            (userProfile && userProfile.userId === userId)) && (
                                <div className="column">
                                    <span className="bbz-review-span">{approveMessage}:</span>
                                    <span>&nbsp;</span>
                                    <img className="bbz-general-pointer" type="image" value="submit" height="20"
                                         width="20" src={approveImageSource}
                                         onClick={() => {
                                             this.dispatch(errorActions.bbzClearError());
                                             if (userProfile.isAdmin == 1) {
                                                 this.dispatch(reviewsSqliteActions.startApproveUpdateReviewItem(reviewId,
                                                     !approved,
                                                     companyId, userId, userProfile.userId));
                                             } else {
                                                 openUpdatePanel();
                                                 var error = {};
                                                 error.errorMessage = "You must be admin to change approval";
                                                 this.dispatch(errorActions.bbzReportError(error));
                                                 window.scrollTo(0, 0);
                                             }
                                         }}/>
                                </div>
                            )}
                            <div>
                                {auth.loggedIn && userProfile && (userProfile.isAdmin == 1) && adminUid && (
                                    <div>
                                        <Link to={`/users?userId=${adminUid}`} activeClassName="active"
                                              activeStyle={{fontWeight: 'bold'}}>Status By</Link>
                                    </div>)}
                            </div>
                        </div>
                        <div className="col-sm-8">
                            {this.renderCompanyRating(rating, review, companyId, companyTitle, showCompanyTitle, reviewId)}
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
