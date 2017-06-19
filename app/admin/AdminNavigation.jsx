import React from 'react';
import {connect} from 'react-redux';
var {Link} = require('react-router');
var servicesActions = require('servicesActions');
import Categories from 'serviceCategories';

export class AdminNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    render() {
        var {isLoggedIn, userProfile} = this.props;

            return (
                <div>
                    {isLoggedIn && userProfile && userProfile.isAdmin && (
                        <Link to="/services" activeClassName="active" className="profile-links"
                              onClick={() => {
                                  this.props.closeNav;
                                  this.dispatch(servicesActions.addServiceItems(Categories.getServices()));
                              }}
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
