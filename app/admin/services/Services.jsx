import React from 'react';
var {connect} = require('react-redux');

import {getMediaContainerClass, getMedia} from 'app/common/Utils';
import ServiceList from 'ServiceList'
import AddServiceItem from 'AddServiceItem';
var servicesActions = require('servicesActions');
var searchActions = require('searchActions');
var loadingActions = require('loadingActions');
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
    }

    render() {

        var {isLoggedIn, userProfile} = this.props;


        if (isLoggedIn && userProfile && userProfile.isAdmin) {
            return (
                <div className={"columns " && this.state.container}>
                    <div>
                        <AddServiceItem/>
                    </div>
                    <div>
                        <ServiceList serviceItems={this.state.serviceItems}/>
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
