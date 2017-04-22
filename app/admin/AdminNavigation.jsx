import React from 'react';
import {connect} from 'react-redux';
var {Link} = require('react-router');

export class AdminNavigation extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        var {isLoggedIn, userProfile} = this.props;

        if (isLoggedIn && userProfile && userProfile.isAdmin) {
            return (
                <Link to="/services" activeClassName="active"
                      activeStyle={{fontWeight: 'bold'}}>Services</Link>
            );
        } else {
            return null;
        }
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.loggedIn,
        userProfile: state.userProfile
    }
}

export default connect(mapStateToProps)(AdminNavigation)
