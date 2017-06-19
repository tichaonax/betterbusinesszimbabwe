import React from 'react';
var {connect} = require('react-redux');
import ReactList from 'react-list';
import UserItem from 'UserItem';
var BbzAPI = require('BbzAPI');

export class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            container: "container"
        }
    }

    componentWillReceiveProps(newProps) {
        var filteredUserItems = BbzAPI.getFilteredUsers(newProps.userItems, newProps.searchText);

        //console.debug("filteredUserItems",filteredUserItems);
        this.setState({
            rowCount: filteredUserItems.length,
            users: filteredUserItems
        });

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
        var row = <UserItem key={userItem.userItemId} {...userItem}/>;

        return <div key={key}>{row}</div>;
    }

    render() {
        return (
            <div className={"columns " && this.state.container}>
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="text-center">{this.state.users.length} Users...</h4>
                    </div>
                </div>
                <div className="row">
                    <div style={{overflow: 'auto', maxHeight: 600, marginLeft: '10px', marginRight: '10px'}}>
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
            userItems: state.userItems,
            searchText: state.searchText,
            breakpoint: state.breakpoint
        }
    }
)(UserList);