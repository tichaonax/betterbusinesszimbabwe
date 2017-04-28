import React from 'react';
var {connect} = require('react-redux');

import CompanyList from 'CompanyList'
import AddCompanyItem from 'AddCompanyItem';
import BbzSearch from "BbzSearch";
var companiesActions = require('companiesActions');

export class Companies extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    componentDidMount() {
        this.dispatch(companiesActions.startAddCompanyItems());
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
