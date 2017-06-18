import React from 'react';
var {connect} = require('react-redux');
import {getRatingsAverage, getRatingRoundedToHalf} from 'app/common/reviewUtils';

var BbzAPI = require('BbzAPI');
import CompanyRatingItem from 'app/companies/CompanyRatingItem';
var Rate = require('rc-rate');
import ReviewList from 'app/reviews/ReviewList';
import {Link} from 'react-router';
import Linkify from 'react-linkify';
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
        this.dispatch(searchActions.setApprovalPendingItem(false));
        this.loadData(this.props);
    }

    componentWillUnmount() {
        this.dispatch(searchActions.setSearchText(""));
    }

    componentWillReceiveProps(newProps) {
        var {isLoggedIn, userProfile} = newProps;
        if(isLoggedIn && userProfile && userProfile.isAdmin){
            this.dispatch(searchActions.setApprovalPendingItem(true));
        }
    }


    render() {

        var {reviewItems, showApprovalPending, searchText, auth, companyItems} = this.props;

        //console.debug("companyItems",companyItems);
        function getCompanyDescription(companyItemId) {
            if (companyItemId == undefined) return {companyDesc: ''};
            function getText(companyItem) {
                return companyItem.companyItemId == companyItemId;
            }

            return companyItems.find(getText);
        }

        var uid = 0;
        if (auth.loggedIn) {
            uid = auth.uid;
        }

        var filteredReviewItems = BbzAPI.getFilteredReviews(reviewItems, showApprovalPending, searchText, uid);

        let companyTitle = '';
        let companyItemId ='';
        let companyDesc = '';

        if (filteredReviewItems.length > 0) {
            companyTitle = filteredReviewItems[0].companyTitle;
            companyItemId = filteredReviewItems[0].companyItemId;
            companyDesc = getCompanyDescription(companyItemId).companyDesc;
        }

        var rating = getRatingRoundedToHalf(getRatingsAverage(filteredReviewItems));

        return (
            <div className="row">
                <div className="columns container">
                    <div className="row">
                    <div className="rating-block col-sm-5">
                        <h3>{companyTitle}</h3>
                        <div>
                            <Link to={`/addreview?company=${companyItemId}`} activeClassName="active"
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
                                    onChange={()=>{}}
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
                        <ReviewList reviewItems={filteredReviewItems} showCompanyTitle={false}/>
                    </div>
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
        searchText: state.searchText,
        companyItems: state.companyItems,
    }
})(CompanyReviews);
