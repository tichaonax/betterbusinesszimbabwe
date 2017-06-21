import React from 'react';
var $ = require('jquery');
var {connect} = require('react-redux');
var searchActions = require('searchActions');

export class BbzSearch extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
        this.onSearch = this.onSearch.bind(this);
    }

    onSearch(e) {
        e.preventDefault();
        var location = $('#searchItemText').val();
        if (location.length > 0) {
            this.dispatch(searchActions.setSearchText(location));
            var encodedLocation = encodeURIComponent(location);
            $('#searchItemText').val('');
            window.location.hash = '#/weather?location=' + encodedLocation;
        }
    }

    render() {
        var {isLoggedIn, userProfile, searchOptions, searchText, navigation} = this.props;
        let count = null;
        let newCount = null;
        return (
            <div>
                <div>
                    <input id="searchItemText" className="navbar-input col-xs-10" type="text"  value={searchText} placeholder="Enter text to search?"
                           onChange={() => {
                               var searchText = $('#searchItemText').val();
                               if (!searchOptions.showButton) {
                                   this.dispatch(searchActions.setSearchText(searchText));
                               }
                           }}/>
                    {(searchOptions.showButton == true) &&
                    (<button className="navbar-button col-xs-1" onClick={this.onSearch}>
                            <svg width="13px" height="13px">
                                <path
                                    d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
                            </svg>
                        </button>
                    )}
                    {isLoggedIn && userProfile && userProfile.isAdmin && (
                        <img src="images/bbz_admin.png" alt="Admin!" height="44" width="44"/>
                    )}
                </div>

                <div>
                    {isLoggedIn && userProfile && userProfile.isAdmin && (
                        <label>
                            <input type="checkbox" ref="showApproved" checked={searchOptions.pending}
                                   onChange={() => {
                                       this.dispatch(searchActions.togggleshowApprovalPendingItem());
                                   }}/>
                            <small>&nbsp;Show Approval Pending</small>
                            <label>{newCount}</label>
                        </label>)}
                    <label className="visible-xs-block">{count} {navigation}</label>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            isLoggedIn: state.auth.loggedIn,
            userProfile: state.userProfile,
            searchOptions: state.searchOptions,
            navigation: state.navigation
        }
    }
)(BbzSearch);