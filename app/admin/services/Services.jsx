import React from 'react';
var {connect} = require('react-redux');

import {getMediaContainerClass, getMedia} from 'app/common/Utils';
import {SERVICES_TITLE} from 'pageTitles';
import ServiceList from 'ServiceList'
import AddServiceItem from 'AddServiceItem';
var servicesSqliteActions = require('servicesSqliteActions');
var servicesActions = require('servicesActions');
var searchActions = require('searchActions');
var loadingActions = require('loadingActions');
var navActions = require('navActions');
var Loader = require('react-loader');


export class Services extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
        this.state = {
            loaded: false,
            serviceItems: [],
            container: "container"
        }
    }

    componentDidMount() {
        this.dispatch(navActions.setNavPage(SERVICES_TITLE));
        //this.dispatch(servicesActions.startAddServiceItems());
        this.dispatch(servicesSqliteActions.startAddServiceItems());
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            loaded: !newProps.loading.loaded,
            serviceItems: newProps.serviceItems
        });

        let {breakpoint} = this.props;

        if (breakpoint) {
            this.setState({
                container: getMediaContainerClass(breakpoint)
            });
        }
    }


    componentWillUnmount() {
        this.dispatch(searchActions.setSearchText(""));
        this.dispatch(servicesActions.startAddServiceItems());
    }

    render() {

        var {isLoggedIn, userProfile} = this.props;


        if (isLoggedIn && userProfile && userProfile.isAdmin) {
            return (
                <div className={"columns " && this.state.container}>

                    <div>
                        <button id="update-panel" type="button" className="btn btn-info btn-lg btn-block" data-toggle="collapse"
                                data-target="#update-panel-target">Service Panel
                        </button>
                    </div>
                    <p/>
                    <div id="update-panel-target" className="collapse">
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
        loading: state.loading,
        serviceItems: state.serviceItems,
        breakpoint: state.breakpoint
    }
})(Services);
