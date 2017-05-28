import React from 'react';
var {connect} = require('react-redux');
import ReactList from 'react-list';
import ReviewItem from 'ReviewItem';
var BbzAPI = require('BbzAPI');


export class ReviewList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reviews: []
        }
        this.renderReviewItem = this.renderReviewItem.bind(this);
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
                });
            }
        }
    }

    renderReviewItem = (index, key) => {
        return <div key={key}>{this.state.reviews[index]}</div>;
    }

    render() {
     return (
            <div>
         {/*       <div className="review-item-container">*/}
                    <h4 className="text-center">{this.state.reviews.length} Reviews...</h4>
                    <div style={{overflow: 'auto', maxHeight: 1000, marginLeft: '10px', marginRight: '10px'}}>
                        <ReactList
                            itemRenderer={this.renderReviewItem}
                            length={this.state.reviews.length}
                            type='variable'
                        />
       {/*             </div>*/}
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