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

            this.setState({rowCount: filteredReviewItems.length, reviews: filteredReviewItems}, () => {});
        }
    }


    renderReviewItem = (index, key) => {
        //the idea is you want to construct the row data on the fly from the reviews
        //this will result is less memory used if you were to store all that rendering data with the reviews
        var reviewItem = this.state.reviews[index];
        var row = <ReviewItem key={reviewItem.reviewItemId} {...reviewItem}
                              deleteReview={this.refs.deleteReview}
                              updateReview={this.refs.updateReview}/>;
        return <div key={key}>{row}</div>;
    }

    render() {
        return (
            <div className="container">
                <h4 className="text-center">{this.state.reviews.length} Reviews...</h4>
                <div style={{overflow: 'auto', maxHeight: 500, marginLeft: '10px', marginRight: '10px'}}>
                    <ReactList
                        itemRenderer={this.renderReviewItem}
                        length={this.state.reviews.length}
                    />
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