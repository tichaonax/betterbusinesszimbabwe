import React from 'react';
var $ = require('jquery');
var {connect} = require('react-redux');
var searchActions = require('searchActions');

export class BbzSearch extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    render() {
        var {isLoggedIn, userProfile, showApprovalPending, searchText} = this.props;

        return (
            <div className="container__header bbz-general">
                <div>
                    <input id="searchItemText" type="text"  value={searchText} placeholder="Enter text to search?"
                           onChange={() => {
                               var searchText = $('#searchItemText').val();
                               this.dispatch(searchActions.setSearchText(searchText));
                           }}/>
                </div>
                {isLoggedIn && userProfile && userProfile.isAdmin && (<div>
                    <label>
                        <input type="checkbox" ref="showCompleted" checked={showApprovalPending} onChange={() => {
                            this.dispatch(searchActions.togggleshowApprovalPendingItem());
                        }}/>
                        Show Approval Pending
                    </label>
                </div>)}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            isLoggedIn: state.auth.loggedIn,
            userProfile: state.userProfile,
            showApprovalPending: state.showApprovalPending
        }
    }
)(BbzSearch);