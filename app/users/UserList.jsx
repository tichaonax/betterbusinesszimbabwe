import React from 'react';
var {connect} = require('react-redux');
import ReactList from 'react-list';
import UserItem from 'UserItem';
var BbzAPI = require('BbzAPI');

export class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
        this.renderUserItem = this.renderUserItem.bind(this);
    }

    componentWillReceiveProps(newProps) {
        var filteredUserItems;
        var uid = 0;

        if (this.props.userItems != newProps.userItems) {
            var {userItems, searchText, auth} = newProps;

            if (auth.loggedIn) {
                uid = auth.uid;
            }
            filteredUserItems = BbzAPI.getFilteredUsers(userItems, searchText, uid);
        } else {
            var {userItems, searchText, auth} = this.props;

            if (auth.loggedIn) {
                uid = auth.uid;
            }
            filteredUserItems = BbzAPI.getFilteredUsers(userItems, searchText, uid);
        }

        this.setState({
            rowCount: filteredUserItems.length,
            users: filteredUserItems
        });
    }


    renderUserItem = (index, key) => {
        var userItem = this.state.users[index];
        var row = <UserItem key={userItem.userItemId} {...userItem}/>;

        return <div key={key}>{row}</div>;
    }

    render() {
        return (
            <div className="columns container">
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="text-center">{this.state.users.length} Users...</h4>
                    </div>
                </div>
                <div className="row">
                    <div style={{overflow: 'auto', maxHeight: 400, marginLeft: '10px', marginRight: '10px'}}>
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
            searchOptions: state.searchOptions,
            searchText: state.searchText
        }
    }
)(UserList);