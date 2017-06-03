import React from 'react';
var {connect} = require('react-redux');

import ReviewList from 'ReviewList'
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
        this.dispatch(reviewsActions.startAddReviewItems());
        var company = props.location.query.company;
        if (company && company.length > 0) {
            this.dispatch(searchActions.setSearchText(company));
        }
        this.dispatch(urlActions.setRedirectUrl('/reviews'));
    }

    componentDidMount() {
        this.dispatch(searchActions.setApprovalPendingItem(false));
        this.dispatch(searchActions.setSearchButton(false));
        this.loadData(this.props);
    }

    componentWillUnmount() {
        this.dispatch(searchActions.setSearchText(""));
    }

    componentWillReceiveProps(newProps) {
       // this.loadData(newProps);
        var {isLoggedIn, userProfile} = newProps;
        if(isLoggedIn && userProfile && userProfile.isAdmin){
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
                        <ReviewList showCompanyTitle={true}/>
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
        searchText: state.searchText
    }
})(Reviews);
