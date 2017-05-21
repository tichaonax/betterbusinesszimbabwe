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


    loadData(props) {
        this.dispatch(errorActions.bbzClearError());

        console.log("loadData startAddCompanyItems");
        this.dispatch(companiesActions.startAddCompanyItems());

        var company = props.location.query.company;
        if (company && company.length > 0) {
            this.dispatch(searchActions.setSearchText(company));
            console.log("search by query", company);
        }

        this.dispatch(reviewsActions.startAddReviewItems());
        this.dispatch(servicesActions.startAddServiceItems());
        this.dispatch(urlActions.setRedirectUrl('/companies'));

    }

    componentDidMount() {
        this.loadData(this.props);
    }

    componentWillUnmount(){
        this.dispatch(searchActions.setSearchText(""));
    }

    render() {

        var {isLoggedIn} = this.props;

        return (
            <div className="container ">
                <BbzSearch/>
                {isLoggedIn && (<AddCompanyItem/>)}
                <CompanyList perPage={2}/>
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
