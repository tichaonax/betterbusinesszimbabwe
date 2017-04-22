import React from 'react';
var {connect} = require('react-redux');

import ServiceList from 'ServiceList'
import AddServiceItem from 'AddServiceItem';
var servicesActions = require('servicesActions');

export class Services extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    componentDidMount() {
        this.dispatch(servicesActions.startAddServiceItems());
    }

    render() {

        var {isLoggedIn, userProfile} = this.props;

        if(isLoggedIn && userProfile && userProfile.isAdmin){
            return (
                <div>
                    <div className="container ">
                        <AddServiceItem/>
                        <ServiceList/>
                    </div>
                </div>
            );
        }else{
            return (
                <div>
                    <div className="container ">
                        You must be admin to update services
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
