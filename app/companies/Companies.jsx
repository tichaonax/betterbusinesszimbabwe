import React from 'react';
var {connect} = require('react-redux');

import CompanyList from 'CompanyList'
import AddCompanyItem from 'AddCompanyItem';
import BbzSearch from "BbzSearch";
var searchActions = require('searchActions');
var companiesActions = require('companiesActions');
var reviewsActions = require('reviewsActions');
var servicesActions = require('servicesActions');
var urlActions = require('urlActions');
var errorActions = require('errorActions');

export class Companies extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    componentDidMount() {
        this.dispatch(errorActions.bbzClearError());
        this.dispatch(companiesActions.startAddCompanyItems());
        this.dispatch(reviewsActions.startAddReviewItems());
        this.dispatch(servicesActions.startAddServiceItems());
        this.dispatch(urlActions.setRedirectUrl('/companies'));
    }

    componentWillUnmount(){
        this.dispatch(searchActions.setSearchText(""));
        this.dispatch(searchActions.setApprovalPendingItem(false));
    }

    render() {

        var {isLoggedIn} = this.props;

        return (
            <div className="container ">
                <BbzSearch/>
                {isLoggedIn && (<AddCompanyItem/>)}
                <CompanyList/>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        isLoggedIn: state.auth.loggedIn,
        userProfile: state.userProfile
    }
})(Companies);
