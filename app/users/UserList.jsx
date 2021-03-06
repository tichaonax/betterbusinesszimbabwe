import React from 'react';
var {connect} = require('react-redux');
import {getMediaContainerClass, setListCounts} from 'app/common/Utils';
import {USERS_TITLE} from 'pageTitles';
import ReactList from 'react-list';
import UserItem from 'UserItem';
var navActions = require('navActions');
var BbzSqliteAPI = require('BbzSqliteAPI');

export class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
        this.state = {
            rowCount: 0,
            users: [],
            container: "container"
        }
    }

    componentWillReceiveProps(newProps) {
        this.dispatch(navActions.setNavPage(USERS_TITLE));
        var {userItems, searchOptions, searchText, userProfile, auth} = newProps;
        var userId = 0;

        if (auth.loggedIn && userProfile) {
            userId = userProfile.userId;
        }
        var filteredUserItems = BbzSqliteAPI.getFilteredUsers(userItems, searchOptions.pending, searchText, userId);

        this.setState({
                rowCount: filteredUserItems.length,
                users: filteredUserItems
            },

            setListCounts(this.dispatch, filteredUserItems)
        );

        let {breakpoint} = this.props;

        if (breakpoint) {
            this.setState({
                container: getMediaContainerClass(breakpoint)
            });
        }
    }

    itemSizeGetter = (index) => {
        var userItem = this.state.users[index];
        var divHeight = 30;
        if (userItem.displayName.length > 50) {
            divHeight = 10 + Math.round((userItem.displayName.length / 60)) * 30
        }
        return divHeight;
    }

    renderUserItem = (index, key) => {
        var userItem = this.state.users[index];
        var row = <UserItem key={userItem.userId} {...userItem}/>;

        return <div key={key}>{row}</div>;
    }

    render() {
        return (
            <div className={"columns " && this.state.container}>
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="text-center hidden-xs">{this.state.users.length} {USERS_TITLE}...</h4>
                    </div>
                </div>
                <div className="row">
                    <div style={{overflow: 'auto', maxHeight: 1000, marginLeft: '10px', marginRight: '10px'}}>
                        <ReactList
                            itemRenderer={this.renderUserItem}
                            length={this.state.users.length}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            auth: state.auth,
            userProfile: state.userProfile,
            userItems: state.userItems,
            searchText: state.searchText,
            searchOptions: state.searchOptions,
            breakpoint: state.breakpoint
        }
    }
)(UserList);