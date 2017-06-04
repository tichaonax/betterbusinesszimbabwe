import React from 'react';
var {connect} = require('react-redux');

import ServiceList from 'ServiceList'
import AddServiceItem from 'AddServiceItem';
var servicesActions = require('servicesActions');
var searchActions = require('searchActions');

export class Services extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    componentDidMount() {
        this.dispatch(servicesActions.startAddServiceItems());
    }

    componentWillUnmount() {
        this.dispatch(searchActions.setSearchText(""));
    }

    render() {

        var {isLoggedIn, userProfile} = this.props;

        if (isLoggedIn && userProfile && userProfile.isAdmin) {
            return (
                <div className="columns container">
                    <div>
                        <AddServiceItem/>
                    </div>
                    <div>
                        <ServiceList/>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="columns container">
                    <div>
                        <label>You must be admin to update services</label>
                    </div>
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
})(Services);
