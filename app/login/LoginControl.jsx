import React from 'react';
var loginActions = require('loginActions');
import {connect} from 'react-redux';
var {Link} = require('react-router');
var navActions = require('navActions');

export class LoginControl extends React.Component {
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

    onLogout = (e) => {
        e.preventDefault();
        this.dispatch(loginActions.startBbzLogout());
    }

    render() {
        var {isLoggedIn} = this.props;
        let loginTitle ="Login";
        let logoutTitle ="Logout";

        if (isLoggedIn) {
            return (
                <div className="upper-links"><a className="links" href="#" onClick={() => {
                    this.onLogout(event);
                    this.closeNavigation();
                    this.dispatch(navActions.setNavPage(logoutTitle));
                }}>{logoutTitle}</a>
                </div>
            );
        } else {
            return (
                <Link to="/login" activeClassName="active" className="links"
                      onClick={() => {
                          this.dispatch(navActions.setNavPage(loginTitle));
                          this.closeNavigation();
                      }}
                      activeStyle={{fontWeight: 'bold'}}>{loginTitle}</Link>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps)(LoginControl)
