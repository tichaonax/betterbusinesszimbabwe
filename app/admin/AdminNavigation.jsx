import React from 'react';
import {connect} from 'react-redux';
var {Link} = require('react-router');
var servicesActions = require('servicesActions');
var navActions = require('navActions');
import Categories from 'serviceCategories';

export class AdminNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
        this.state = {
            sideNav: {
                width: '0px',
                backgroundColor: 'rgba(0,0,0,0)'
            }
        }
    }

    closeNavigation() {
        this.props.closeNav(this.state.sideNav);
    }

    render() {
        var {isLoggedIn, userProfile} = this.props;

        let servicesTitle = "Services";

            return (
                <div>
                    {isLoggedIn && userProfile && userProfile.isAdmin && (
                        <Link to="/services" activeClassName="active" className="profile-links"
                              onClick={()=> {
                                  this.dispatch(navActions.setNavPage(servicesTitle));
                                  this.dispatch(servicesActions.addServiceItems(Categories.getServices()));
                                  this.closeNavigation();
                              }}
                              activeStyle={{fontWeight: 'bold'}}>{servicesTitle}</Link>)}
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
