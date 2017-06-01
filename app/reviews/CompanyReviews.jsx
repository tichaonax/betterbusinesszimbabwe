import React from 'react';
var {connect} = require('react-redux');

var BbzAPI = require('BbzAPI');
import CompanyRatingItem from 'CompanyRatingItem';
import StarRatingItem from 'StarRatingItem';
import ReviewList from 'ReviewList';
import AddReview from 'AddReview';
var searchActions = require('searchActions');

export class CompanyReviews extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    loadData(props) {
        var company = props.location.query.company;
        if (company && company.length > 0) {
            this.dispatch(searchActions.setSearchText(company));
        }
    }

    componentDidMount() {
        this.dispatch(searchActions.setSearchButton(false));
        this.loadData(this.props);
    }

    componentWillUnmount() {
        this.dispatch(searchActions.setSearchText(""));
    }

    componentWillReceiveProps(newProps) {
        this.loadData(newProps);
    }

    getRatingsAverage(reviewItems) {

        var ratingCount = reviewItems.length;
        var ratingSum = 0;

        reviewItems.map((reviewItem) => {
            ratingSum = ratingSum + reviewItem.rating;
        });

        if (ratingSum > 0) {
            return (ratingSum / ratingCount)
        }

        return (ratingCount);
    }

    render() {
        var {reviewItems, showApprovalPending, searchText, auth} = this.props;

        var uid = 0;
        if (auth.loggedIn) {
            uid = auth.uid;
        }

        var filteredReviewItems = BbzAPI.getFilteredReviews(reviewItems, showApprovalPending, searchText, uid);

        var companyTitle = "";

        if (filteredReviewItems.length > 0) {
            companyTitle = filteredReviewItems[0].companyTitle;
        }

        var rating = this.getRatingsAverage(filteredReviewItems).toFixed(1);

        return (
            <div className="row">
                <div className="columns container">
                    <div className="rating-block">
                        <h3>{companyTitle}</h3>
                    </div>
                </div>
                <div><br/></div>
                <div className="columns container">
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="rating-block">
                                <h4>Average user rating</h4>
                                <h2 className="bold padding-bottom-7">{rating}
                                    <small>/ 5</small>
                                </h2>
                                <StarRatingItem rating={rating}/>
                            </div>
                        </div>
                        <div>
                            <CompanyRatingItem reviewItems={filteredReviewItems}/>
                        </div>
                    </div>
                    <div>
                        <ReviewList reviewItems={filteredReviewItems} showCompanyTitle={false}/>
                    </div>
                    {auth.loggedIn && (
                        <div className="bbz-general">
                            <AddReview/>
                        </div>)}
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        isLoggedIn: state.auth.loggedIn,
        userProfile: state.userProfile,
        auth: state.auth,
        reviewItems: state.reviewItems,
        showApprovalPending: state.showApprovalPending,
        searchText: state.searchText
    }
})(CompanyReviews);
