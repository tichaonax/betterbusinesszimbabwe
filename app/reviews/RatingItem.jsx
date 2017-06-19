import React from 'react';
var {connect} = require('react-redux');
var Rate = require('rc-rate');
import {Link} from 'react-router';
import Linkify from 'react-linkify';
var companiesActions = require('companiesActions');
var errorActions = require('errorActions');
var urlActions = require('urlActions');

export class RatingItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    getWords = (str) => {
        return str.split(/\s+/).slice(0, 5).join(" ") + " ...";
    }

    renderRatingItem = (rating, review, companyItemId, companyTitle, showCompanyTitle, reviewId, loggedInUser, auth, reviewItemId) => {

        const reviewHeader = this.getWords(review);

        return (
            <div >
                <Rate
                    defaultValue={rating}
                   /* onChange={(index) => {
                        //this.setState({rating: index});
                    }}*/
                    style={{fontSize: 20}}
                    allowHalf
                    value={rating}
                />
                <Link to={`/addreview?company=${companyItemId}`} activeClassName="active" onClick={()=>{
                    this.dispatch(urlActions.setRedirectUrl("reviews"));
                }}
                      activeStyle={{fontWeight: 'bold'}}>Add Review</Link>

                {showCompanyTitle == true && (
                    <div className="review-block-title">
                        <Link to={`/companyreviews?company=${companyItemId}`} activeClassName="active" onClick={()=>{
                            this.dispatch(companiesActions.startAddCompanyItems());
                        }}
                              activeStyle={{fontWeight: 'bold'}}>{companyTitle}</Link>
                    </div>)}
                <div className="review-block-title">{reviewHeader}</div>
                <div className="column">
                    <span className="bbz-review-span">ID:</span>
                    <span>&nbsp;</span>
                    {reviewId}
                </div>
                {auth.loggedIn && loggedInUser &&  loggedInUser.isSuperUser && (
                    <div>
                        <span className="label bbz-review-span">Review ID:</span>
                        <span>&nbsp;</span>
                        {reviewItemId}
                    </div>)}
                <div className="review-block-description">
                    <Linkify properties={{target: '_blank', style: {color: 'blue'}}}>
                        {review}
                    </Linkify>
                </div>
            </div>
        )
    }

    render() {
        var {showCompanyTitle,
            displayName,
            email, uid,
            companyTitle,
            companyItemId,
            loggedInUser,
            reviewItemId,
            review, rating,
            isApproved, createAt,
            updateAt, auth, deleteReview,
            updateReview, reviewId} = this.props;

        return (
            <div>
                {this.renderRatingItem(rating, review, companyItemId, companyTitle, showCompanyTitle, reviewId, loggedInUser, auth, reviewItemId)}
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        loggedInUser: state.userProfile
    }
}
export default  connect(mapStateToProps)(RatingItem);
