import React from 'react';
var {connect} = require('react-redux');

import {getMediaContainerClass, getMedia} from 'app/common/Utils';
import {USERS_TITLE} from 'pageTitles';
import UserList from 'UserList'
var searchActions = require('searchActions');
var usersSqliteActions = require('usersSqliteActions');
var urlActions = require('urlActions');
var navActions = require('navActions');
var errorActions = require('errorActions');
var Loader = require('react-loader');

export class Users extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
        this.state = {
            loaded: false,
            container: "container"
        }
    }

    loadData(props) {
        this.dispatch(errorActions.bbzClearError());

        var userId = props.location.query.user;
        if (userId && userId.length > 0) {
            this.dispatch(searchActions.setSearchText(userId));
        }

        this.dispatch(usersSqliteActions.startAddUserItems());
        this.dispatch(urlActions.setRedirectUrl('/users'));
    }

    componentDidMount() {
        this.dispatch(navActions.setNavPage(USERS_TITLE));
        this.dispatch(searchActions.setSearchButton(false));
        this.dispatch(searchActions.setApprovalPendingItem(false));
        this.loadData(this.props);
    }

    componentWillUnmount() {
        this.dispatch(searchActions.setSearchText(""));
    }

    componentWillReceiveProps(newProps) {
        var {isLoggedIn, userProfile} = newProps;
        if (isLoggedIn && userProfile && (userProfile.isAdmin == 1)) {
            this.dispatch(searchActions.setApprovalPendingItem(true));
        }

        this.setState({
            loaded: !newProps.loading.loaded
        });

        let {breakpoint} = this.props;

        if (breakpoint) {
            this.setState({
                container: getMediaContainerClass(breakpoint)
            });
        }
    }

    render() {
        return (
            <div className="row">
                <div className={"columns " && this.state.container}>
                    <div>
                        <UserList/>
                    </div>
                    <Loader loaded={this.state.loaded}>
                    </Loader>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        isLoggedIn: state.auth.loggedIn,
        userProfile: state.userProfile,
        loading: state.loading,
        breakpoint: state.breakpoint
    }
})(Users);
