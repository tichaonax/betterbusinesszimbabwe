var {connect} = require('react-redux');
import React from 'react';
import {Link} from 'react-router';
import ReactList from 'react-list';
import ReviewItem from 'ReviewItem';
import {getMediaContainerClass, getMedia, setListCounts} from 'app/common/Utils';
import {REVIEWS_TITLE} from 'pageTitles';
var navActions = require('navActions');
var BbzSqliteAPI = require('BbzSqliteAPI');

export class ReviewList extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
        this.state = {
            rowCount: 0,
            reviews: [],
            showCompanyTitle: true,
            container: "container"
        }
    }

    componentWillReceiveProps(newProps) {
        this.dispatch(navActions.setNavPage(REVIEWS_TITLE));
        var filteredReviewItems=[];
        var bCompanyTitle;
        var userId = 0;
        /*if (this.props.reviewItems != newProps.reviewItems || this.props.searchOptions != newProps.searchOptions) {
            var {reviewItems, searchOptions, searchText, auth, showCompanyTitle} = newProps;
            bCompanyTitle = showCompanyTitle;
            if (auth.loggedIn) {
                uid = auth.uid;
            }
            filteredReviewItems = BbzSqliteAPI.getFilteredReviews(reviewItems, searchOptions.pending, searchText, uid, searchOptions.showMyReviews);
        } else {*/
        var {reviewItems, searchOptions, searchText, userProfile, showCompanyTitle, companyId} = newProps;

        bCompanyTitle = showCompanyTitle;
        if (userProfile) {
            userId = userProfile.userId;
        }

        if (companyId && companyId > 0) {
            reviewItems.map((reviewItem) => {
                if (reviewItem.companyId == companyId) {
                    if (searchOptions.pending) {
                        console.log("pending reviewItem", reviewItem);
                        filteredReviewItems.push(reviewItem);
                    } else {
                        if (reviewItem.isApproved == 1) {
                            console.log("approved only reviewItem", reviewItem);
                            filteredReviewItems.push(reviewItem);
                        }
                    }
                }
            })

            //sort reviewItems with Approval Pending first

            filteredReviewItems.sort((a, b) => {
                if (a.isApproved == 0 && b.isApproved == 1) {
                    //take a first
                    return -1
                } else if (a.isApproved == 1 && b.isApproved == 0) {
                    // take b first
                    return 1;
                } else {
                    //a === b
                    //no change
                    return 0;
                }
            });
        }else{
            filteredReviewItems = BbzSqliteAPI.getFilteredReviews(reviewItems, searchOptions.pending, searchText, userId, searchOptions.showMyReviews);
        }

        this.setState({
                rowCount: filteredReviewItems.length,
                reviews: filteredReviewItems,
                showCompanyTitle: bCompanyTitle
            },

            setListCounts(this.dispatch, filteredReviewItems)
        );

        let {breakpoint} = this.props;

        if (breakpoint) {
            this.setState({
                container: getMediaContainerClass(breakpoint)
            });
        }
    }

    itemSizeGetter = (index) => {
        var reviewItem = this.state.reviews[index];
        var divHeight = 30;
        if (reviewItem.review.length > 50) {
            divHeight = 10 + Math.round((reviewItem.review.length / 60)) * 30
        }
        return divHeight;
    }

    renderReviewItem = (index, key) => {
        //the idea is you want to construct the row data on the fly from the reviews
        //this will result is less memory used if you were to store all that rendering data with the reviews
        var reviewItem = this.state.reviews[index];

        if (reviewItem) {
            var row = <ReviewItem key={reviewItem.reviewId} {...reviewItem}
                                  deleteReview={this.refs.deleteReview}
                                  updateReview={this.refs.updateReview}
                                  showCompanyTitle={this.state.showCompanyTitle}/>;

            return <div key={key}>{row}</div>;
        }
        else {
            return null
        }
    }

    render() {
        return (
            <div className= {"columns " && this.state.container}>
                <div className="row">
                    <div className="row col-sm-12">
                        <div className="col-sm-5 center-block">
                            <Link to="/help" activeClassName="active"
                                  activeStyle={{fontWeight: 'bold'}}>
                                    <span className="glyphicon glyphicon-info-sign button" data-toggle="tooltip"
                                          title="Need Help??"></span>
                            </Link>
                        </div>
                        <div className="col-sm-7">
                            <h4 className="text-center hidden-xs">&nbsp;&nbsp;{this.state.reviews.length} {REVIEWS_TITLE}...</h4>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div style={{overflow: 'auto', maxHeight: 1000, marginLeft: '2px', marginRight: '20px'}}>
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
            breakpoint: state.breakpoint
        }
    }
)(ReviewList);