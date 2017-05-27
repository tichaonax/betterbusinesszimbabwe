import React from 'react';
var {connect} = require('react-redux');
import ReactList from 'react-list';
import ReactTooltip from 'react-tooltip'
import ReviewItem from 'ReviewItem';
var BbzAPI = require('BbzAPI');


export class ReviewList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reviews: []
        }
        this.renderItem = this.renderItem.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (this.props.reviewItems != newProps.reviewItems) {

            var {reviewItems, showApprovalPending, searchText, auth} = newProps;

            var uid = 0;
            if (auth.loggedIn) {
                uid = auth.uid;
            }

            var filteredReviewItems = BbzAPI.getFilteredReviews(reviewItems, showApprovalPending, searchText, uid);
            if (filteredReviewItems.length === 0) {
                this.setState({rowCount: filteredReviewItems.length, reviews: []}, () => {
                });

            } else {
                const reviews = filteredReviewItems.map((reviewItem) => {
                    return (
                        <ReviewItem key={reviewItem.reviewItemId} {...reviewItem} deleteReview={this.refs.deleteReview}
                                    updateReview={this.refs.updateReview}/>);
                });

                this.setState({rowCount: filteredReviewItems.length, reviews: reviews}, () => {
                   // console.log("state-reviews", this.state.reviews);
                });
            }
        }
    }

    renderItem=(index, key)=> {
        return <div key={key}>{this.state.reviews[index]}</div>;
    }

    render() {

        var {auth, userProfile} = this.props;
        return (
            <div>
                <ReactTooltip />
                <div className="review-item-container">
                    <div className="review-item-header">
                        <div className="review-header-item review-item-id-header">Review ID</div>
                        <div className="review-header-item review-item-rating-header">Rating</div>
                        <div className="review-header-item review-item-company-header">Company Name</div>
                        <div className="review-header-item review-item-reviewer-header">Reviewer</div>
                        <div className="review-header-item review-item-description-header">Review Comment</div>
                        {auth.loggedIn &&
                        (<div className="review-header-item review-item-action-header">
                            <div ref='deleteReview' data-tip='Delete Review'></div>
                            A
                            <div ref='updateReview' data-tip='Update Review'></div>
                        </div>)}
                        {auth.loggedIn && userProfile && userProfile.isAdmin && ( <div className=" review-header-item review-item-status-header" >S</div>)}
                        {auth.loggedIn && userProfile && userProfile.isAdmin && ( <div className="review-header-item review-item-email-header">Email</div>)}
                    </div>

                    <div style={{overflow: 'auto', maxHeight: 350, marginTop: '20px'}}>
                        <ReactList
                            itemRenderer={this.renderItem}
                            length={this.state.reviews.length}
                            type='variable'
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            auth: state.auth,
            userProfile: state.userProfile,
            reviewItems: state.reviewItems,
            showApprovalPending: state.showApprovalPending,
            searchText: state.searchText
        }
    }
)(ReviewList);