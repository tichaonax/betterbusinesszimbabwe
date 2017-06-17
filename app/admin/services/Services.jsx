import React from 'react';
var {connect} = require('react-redux');

import ServiceList from 'ServiceList'
import AddServiceItem from 'AddServiceItem';
var servicesActions = require('servicesActions');
var searchActions = require('searchActions');
var Loader = require('react-loader');

export class Services extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        this.dispatch(servicesActions.startAddServiceItems());
        this.dispatch(searchActions.setLoadingStatus(true));
    }

    componentWillReceiveProps(newProps) {
        //console.debug("newProps", newProps.searchOptions);
        this.setState({
            loaded: !newProps.searchOptions.loading
        });
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
                    <Loader loaded={this.state.loaded}>
                    </Loader>
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
        userProfile: state.userProfile,
        searchOptions: state.searchOptions,
    }
})(Services);
