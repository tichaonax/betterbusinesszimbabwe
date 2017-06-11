import React from 'react';
var {connect} = require('react-redux');
import ReactList from 'react-list';
import ReviewItem from 'ReviewItem';
var BbzAPI = require('BbzAPI');

export class ReviewList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reviews: [],
            showCompanyTitle: true
        }
        this.renderReviewItem = this.renderReviewItem.bind(this);
    }

    componentWillReceiveProps(newProps) {
        var filteredReviewItems;
        var bCompanyTitle;
        var uid = 0;

        if (this.props.reviewItems != newProps.reviewItems || this.props.searchOptions != newProps.searchOptions) {
            var {reviewItems, searchOptions, searchText, auth, showCompanyTitle} = newProps;
            bCompanyTitle = showCompanyTitle;
            if (auth.loggedIn) {
                uid = auth.uid;
            }
            filteredReviewItems = BbzAPI.getFilteredReviews(reviewItems, searchOptions.pending, searchText, uid, searchOptions.showMyReviews);
        } else {
            var {reviewItems, searchOptions, searchText, auth, showCompanyTitle} = this.props;
            bCompanyTitle = showCompanyTitle;
            if (auth.loggedIn) {
                uid = auth.uid;
            }
            filteredReviewItems = BbzAPI.getFilteredReviews(reviewItems, searchOptions.pending, searchText, uid, searchOptions.showMyReviews);
        }

        this.setState({
            rowCount: filteredReviewItems.length,
            reviews: filteredReviewItems,
            showCompanyTitle: bCompanyTitle
        });
    }

    renderReviewItem = (index, key) => {
        //the idea is you want to construct the row data on the fly from the reviews
        //this will result is less memory used if you were to store all that rendering data with the reviews
        var reviewItem = this.state.reviews[index];
        var row = <ReviewItem key={reviewItem.reviewItemId} {...reviewItem}
                              deleteReview={this.refs.deleteReview}
                              updateReview={this.refs.updateReview}
                              showCompanyTitle={this.state.showCompanyTitle}/>;

        return <div key={key}>{row}</div>;
    }

    render() {
        return (
            <div className="columns container">
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="text-center">{this.state.reviews.length} Reviews...</h4>
                    </div>
                </div>
                <div className="row">
                    <div style={{overflow: 'auto', maxHeight: 500, marginLeft: '2px', marginRight: '20px'}}>
                        <ReactList
                            itemRenderer={this.renderReviewItem}
                            length={this.state.reviews.length}
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
            searchText: state.searchText,
            searchOptions: state.searchOptions,
        }
    }
)(ReviewList);