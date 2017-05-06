import React from 'react';
var {connect} = require('react-redux');
import VirtualList from 'react-tiny-virtual-list';
import ReactTooltip from 'react-tooltip'
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
                        No Reviews Match Search Criteria
                    </td>
                </tr>
            )
        } else {
            return filteredReviewItems.map((reviewItem) => {
                return (
                    <ReviewItem key={reviewItem.reviewItemId} {...reviewItem} deleteReview={this.refs.deleteReview}
                                updateReview={this.refs.updateReview}/>);
            });
        }
    }


    render() {

        var {auth, userProfile}=this.props;
        const data =this.renderReviewItems();
        console.debug("data", data);
        return (
            <div>
                <ReactTooltip />
                <table className="common-table">
                    <tbody>

                    <tr>
                        <th>Review ID</th>
                        {auth.loggedIn &&
                        (<th>
                            <div ref='deleteReview' data-tip='Delete Review'></div>
                            Action
                            <div ref='updateReview' data-tip='Update Review'></div>
                        </th>)}
                        <th>Rating</th>
                        {auth.loggedIn && userProfile && userProfile.isAdmin && ( <th>Status</th>)}
                        <th>Company Name</th>
                        <th>Reviewer</th>
                        {auth.loggedIn && userProfile && userProfile.isAdmin && ( <th>Reviewer Email</th>)}
                        <th>Review Comment</th>
                    </tr>





             {/*       {this.renderReviewItems()}*/}

                    </tbody>
                </table>
                <VirtualList className="VirtualList"
                    height={300}
                    itemCount={data.length}
                    itemSize={50}
                    renderItem={({style, index}) =>
                        <div className="Row" style={style} key={index}>
                            {data[index]}
                        </div>
                    }
                />
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