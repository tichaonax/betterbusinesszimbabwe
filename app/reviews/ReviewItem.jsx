import React from 'react';
var {connect} = require('react-redux');
import moment from 'moment';
import {findDOMNode} from 'react-dom'
import ReactTooltip from 'react-tooltip'
import RatingItem from 'RatingItem';
var reviewsActions = require('reviewsActions');
var companiesActions = require('companiesActions');
var errorActions = require('errorActions');

export class ReviewItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }


    renderCompanyRating = (rating, review, companyItemId, companyTitle, showCompanyTitle, reviewId) => {
        return (<RatingItem rating={rating} review={review} companyItemId={companyItemId} companyTitle={companyTitle} showCompanyTitle={showCompanyTitle} reviewId={reviewId}/>);
    }

    render() {
        var {showCompanyTitle, displayName, email, uid, companyTitle, companyItemId, userProfile, reviewItemId, review, rating, isApproved, createAt, updateAt, auth, deleteReview, updateReview} = this.props;

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

        const reviewDate = moment.unix(createAt).format('MMM Do, YYYY');

        return (
                <div className="col-sm-12">
                    <div className="review-block">
                        <div className="row">
                            <div className="col-sm-4">
                                <img src="images/no-image.png" className="img-rounded"/>
                                <div className="review-block-name">{reviewer}</div>
                                {auth.loggedIn && userProfile && userProfile.isAdmin && (
                                    <div className="review-block-name">
                                        <span className="bbz-review-span">Email:</span>
                                        <span>&nbsp;</span>
                                        {email}
                                        <span>&nbsp;</span>
                                    </div>)}
                                <div className="review-block-date">{reviewDate}<br/>1 year ago</div>

                                {auth.loggedIn && (
                                    <form className="form-inline">
                                        <div className="form-group">
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
                                                         window.scrollTo(0, 0);
                                                     }
                                                 }}/>
                                        </div>
                                        <div className="form-group">
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
                                                          //console.debug("ReviewItems Data:", data);
                                                         this.dispatch(reviewsActions.setUpdateReviewOperation(data));
                                                     }
                                                     else {
                                                         var error = {};
                                                         error.errorMessage = "You must be the owner or admin to update this review information";
                                                         this.dispatch(errorActions.bbzReportError(error));
                                                     }
                                                     window.scrollTo(0, 0);
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
                                                     window.scrollTo(0, 0);
                                                 }
                                             }}/>
                                    </div>
                                )}
                            </div>
                            <div className="col-sm-8">
                                {this.renderCompanyRating(rating, review, companyItemId, companyTitle, showCompanyTitle, reviewId)}
                            </div>
                        </div>
                    </div>
                </div>

        );
    }
}

/* <div className="row align-top" style={{height: divHeight}}>
 <div className="column">
 <span className="bbz-review-span">Company:</span>
 <span>&nbsp;</span>
 <Link to={`/companyreviews?company=${companyItemId}`} activeClassName="active"
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
 <div className="column">
 <hr/>
 </div>
 </div>*/

function mapStateToProps(state) {
    return {
        auth: state.auth,
        userProfile: state.userProfile
    }
}
export default  connect(mapStateToProps)(ReviewItem);
