import React from 'react';
var {connect} = require('react-redux');

import CompanyList from 'CompanyList'
import AddCompanyItem from 'AddCompanyItem';
import BbzSearch from "BbzSearch";
var searchActions = require('searchActions');
var companiesActions = require('companiesActions');
var servicesActions = require('servicesActions');

export class Companies extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    componentDidMount() {
        this.dispatch(searchActions.setApprovalPendingItem(true));
        this.dispatch(companiesActions.startAddCompanyItems());
        this.dispatch(servicesActions.startAddServiceItems());
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
