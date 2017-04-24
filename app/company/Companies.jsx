import React from 'react';
var {connect} = require('react-redux');

import CompnayList from 'CompnayList'
import AddCompanyItem from 'AddCompanyItem';
var companiesActions = require('companiesActions');

export class Companies extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    componentDidMount() {
        this.dispatch(servicesActions.startAddCompanyItems());
    }

    render() {

        var {isLoggedIn, userProfile} = this.props;

        if(isLoggedIn && userProfile){
            return (
                <div className="container ">
                    <AddCompanyItem/>
                    <CompnayList/>
                </div>
            );
        }else{
            return (
                <div className="container ">
                    You must be logged in to manage companies
                </div>
            );
        }
    }
}

export default connect((state) => {
    return {
        isLoggedIn: state.auth.loggedIn,
        userProfile: state.userProfile
    }
})(Companies);
