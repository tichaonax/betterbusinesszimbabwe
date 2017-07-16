import React from 'react';
var {connect} = require('react-redux');
import {getRatingsAverage, getRatingRoundedToHalf} from 'app/common/Utils';

var BbzSqliteAPI = require('BbzSqliteAPI');
import CompanyRatingItem from 'app/companies/CompanyRatingItem';
var Rate = require('rc-rate');
import ReviewList from 'app/reviews/ReviewList';
import {Link, browserHistory, hashHistory} from 'react-router';
import Linkify from 'react-linkify';
var searchActions = require('searchActions');

export class CompanyReviews extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
        this.state = {
            companyId: 0
        }
    }

    loadData(props) {
        var companyId = props.location.query.company;
        if (companyId && companyId.length > 0) {
            this.dispatch(searchActions.setSearchText(companyId));
            this.setState({
                companyId: companyId
            });
        }
    }

    componentDidMount() {
        this.dispatch(searchActions.setSearchButton(false));
        this.dispatch(searchActions.setApprovalPendingItem(false));
        this.loadData(this.props);
    }

    componentWillUnmount() {
        this.dispatch(searchActions.setSearchText(""));
    }

    componentWillReceiveProps(newProps) {
        var {isLoggedIn, userProfile} = newProps;
        if (isLoggedIn && userProfile && (userProfile.isAdmin == 1)) {
            this.dispatch(searchActions.setApprovalPendingItem(true));
        }
    }

    onGoBack = (evt) => {
        browserHistory.goBack();
    }

    render() {

        var {reviewItems, companyItems, searchOptions} = this.props;
        console.log("searchOptions",searchOptions);

        function getCompanyDescription(companyId) {
            if (companyId == undefined) return {companyDesc: ''};
            function getText(companyItem) {
                return companyItem.companyId == companyId;
            }

            let match = companyItems.find(getText);

            return (match) ? match : {companyDesc: ''};
        }

        let companyTitle = '';
        let companyDesc = '';

        let filteredReviewItems = [];
        reviewItems.map((reviewItem) => {
            if (reviewItem.companyId == this.state.companyId) {
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

        console.log("filteredReviewItems",filteredReviewItems);

        if (filteredReviewItems.length > 0) {
            companyTitle = filteredReviewItems[0].companyTitle;
            companyDesc = getCompanyDescription(this.state.companyId).companyDesc;
        }

        var rating = getRatingRoundedToHalf(getRatingsAverage(filteredReviewItems));

        return (
            <div className="row">
                <div className="columns medium-centered col-sm-9">
                    <div className="container">
                        <div className="columns container">
                            <div className="form-group">
                                <button ref="cancel" type="button" className="btn btn-primary" value="Back"
                                        onClick={
                                            () => {
                                                this.onGoBack(event);
                                            }}>
                                    Back
                                </button>
                            </div>
                            <div className="row">
                                <div className="rating-block col-sm-5">
                                    <h3>{companyTitle}</h3>
                                    <div>
                                        <Link to={`/addreview?company=${this.state.companyId}`} activeClassName="active"
                                              activeStyle={{fontWeight: 'bold'}}>Add Review</Link>
                                    </div>
                                </div>
                                <div className="col-sm-7">
                                    <div>
                                        <Linkify properties={{target: '_blank', style: {color: 'blue'}}}>
                                            {companyDesc}
                                        </Linkify>
                                    </div>
                                </div>
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
                                        <Rate
                                            defaultValue={rating}
                                            style={{fontSize: 20}}
                                            onChange={() => {
                                            }}
                                            allowHalf
                                            value={rating}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <CompanyRatingItem reviewItems={filteredReviewItems}/>
                                </div>
                            </div>
                            <div>
                                <ReviewList reviewItems={filteredReviewItems} showCompanyTitle={false}
                                            companyId={this.state.companyId}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        isLoggedIn: state.auth.loggedIn,
        reviewItems: state.reviewItems,
        companyItems: state.companyItems,
        searchOptions: state.searchOptions
    }
})(CompanyReviews);
