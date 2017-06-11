import React from 'react';
var {connect} = require('react-redux');

import ReviewList from 'ReviewList';
import AddReview from 'AddReview';
var reviewsActions = require('reviewsActions');
var searchActions = require('searchActions');
var urlActions = require('urlActions');

export class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    loadData(props) {
        var uid = props.location.query.user;
        var company = props.location.query.company;
        var myreviews = props.location.query.myreviews;

        //console.debug("uid--", uid);
        //console.debug("company--", company);

        if (company && company.length > 0) {
            console.debug("searchActions.setSearchText(company)", company);
            this.dispatch(searchActions.setSearchText(company));
        } else if (uid && uid.length > 0) {
            if (myreviews == 'true') {
                this.dispatch(searchActions.setMyReviews(true));
            }
            //console.debug("searchActions.setSearchText(uid)", uid);
            this.dispatch(searchActions.setSearchText(uid));
        }
        //else {
        //    this.dispatch(reviewsActions.startAddReviewItems());
        //}
        this.dispatch(reviewsActions.startAddReviewItems());
        this.dispatch(urlActions.setRedirectUrl('/reviews'));
    }

    componentDidMount() {
        this.dispatch(searchActions.setMyReviews(false));
        this.loadData(this.props);
        this.dispatch(searchActions.setApprovalPendingItem(false));
        this.dispatch(searchActions.setSearchButton(false));
    }

    componentWillUnmount() {
        this.dispatch(searchActions.setSearchText(""));
    }

    componentWillReceiveProps(newProps) {
        //this.loadData(newProps);
        var {isLoggedIn, userProfile} = newProps;
        if (isLoggedIn && userProfile && userProfile.isAdmin) {
            this.dispatch(searchActions.setApprovalPendingItem(true));
        }
    }

    render() {
        var {isLoggedIn} = this.props;
        return (
            <div className="row">
                <div className="columns container">
                    {isLoggedIn && (
                        <div>
                            <AddReview/>
                        </div>
                    )}
                    <div>
                        <ReviewList showCompanyTitle={true} reviewItems={this.props.reviewItems} auth={this.props.auth}/>
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
        searchText: state.searchText,
        auth: state.auth,
        reviewItems: state.reviewItems,
    }
})(Reviews);
