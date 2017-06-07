import React from 'react';
var {connect} = require('react-redux');

import UserList from 'UserList'
var searchActions = require('searchActions');
var usersActions = require('usersActions');
var urlActions = require('urlActions');
var errorActions = require('errorActions');

export class Users extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    loadData(props) {
        this.dispatch(errorActions.bbzClearError());

        var uid = props.location.query.uid;
        if (uid && uid.length > 0) {
            this.dispatch(searchActions.setSearchText(uid));
        }

        this.dispatch(usersActions.startAddUserItems());
        this.dispatch(urlActions.setRedirectUrl('/users'));
    }

    componentDidMount() {
        this.dispatch(searchActions.setSearchButton(false));
        this.dispatch(searchActions.setApprovalPendingItem(false));
        this.loadData(this.props);
    }

    componentWillUnmount() {
        this.dispatch(searchActions.setSearchText(""));
    }

    componentWillReceiveProps(newProps) {
        var {isLoggedIn, userProfile} = newProps;
        if (isLoggedIn && userProfile && userProfile.isAdmin) {
            this.dispatch(searchActions.setApprovalPendingItem(true));
        }
    }

    render() {
        return (
            <div className="row">
                <div className="columns container">
                    <div>
                        <UserList/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        isLoggedIn: state.auth.loggedIn,
        userProfile: state.userProfile
    }
})(Users);
