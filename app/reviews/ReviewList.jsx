import React from 'react';
var {connect} = require('react-redux');
import ReviewItem from 'ReviewItem';
var BbzAPI = require('BbzAPI');


export class ReviewList extends React.Component {
    constructor(props) {
        super(props);
    }

    renderReviewItems = () => {
        var {reviewItems, showApprovalPending, searchText, auth} = this.props;

        var uid = 0;
        if (auth.loggedIn) {
            uid = auth.uid;
        }

        var filteredReviewItems = BbzAPI.getFilteredReviews(reviewItems, showApprovalPending, searchText, uid);
        if (filteredReviewItems.length === 0) {
            return (
                <tr>
                    <td colSpan={4}>
                        No Reviews Added
                    </td>
                </tr>
            )
        } else {
            return filteredReviewItems.map((reviewItem) => {
                return (
                    <ReviewItem key={reviewItem.reviewItemId} {...reviewItem} />);
            });
        }
    }

    render() {
        var {auth}=this.props;
        return (
            <div>
                <table className="common-table">
                    <tbody>
                    <tr>
                        <th>Review ID</th>
                        {auth.loggedIn && (<th>Rating ID</th>)}
                        <th>Rating</th>
                        <th>Company Name</th>
                        <th>Review Comment</th>
                    </tr>

                    {this.renderReviewItems()}
                    </tbody>
                </table>
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