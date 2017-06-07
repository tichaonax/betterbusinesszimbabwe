import React from 'react';
import {connect} from 'react-redux';
var {Link} = require('react-router');

export class AdminNavigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var {isLoggedIn, userProfile} = this.props;

            return (
                <div>
                    {isLoggedIn && userProfile && userProfile.isAdmin && (
                        <Link to="/services" activeClassName="active" className="links"
                              onClick={() => this.props.closeNav}
                              activeStyle={{fontWeight: 'bold'}}>Services</Link>)}

                </div>
            );

    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.loggedIn,
        userProfile: state.userProfile
    }
}

export default connect(mapStateToProps)(AdminNavigation)
