import React from 'react';
import moment from 'moment';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';
import LoginControl from 'LoginControl';

class Nav extends React.Component {
    constructor(props) {
        super(props);
    }

    renderLoginControl() {
        return (<LoginControl/>);
    }

    render() {
        var {auth, userProfile} = this.props;

        var message = "";

        if (userProfile && userProfile.createDate) {
            message = "Joined " + moment.unix(userProfile.createDate).format('MMM Do, YYYY');
        }


        function renderMessage() {
            if (auth.loggedIn) {
                console.debug("auth.loggedIn", auth, userProfile);
                var displayName = "";
                if (auth.displayName == null) {
                    displayName = userProfile.displayName;
                } else {
                    displayName = auth.displayName;
                }

                return (
                    <div className="nav-profile">
                        <p>{displayName}</p>
                        <p className="nav-profile__subtext">{message}</p>
                    </div>
                );
            } else {
                return (
                    <div/>
                )
            }
        }


        function renderAvator() {
            if (auth.loggedIn) {

                var lastLogin = "";

                if (userProfile && userProfile.lastLogins) {
                    lastLogin = "Last Login " + moment.unix(userProfile.lastLogins.loginAt).format('MMM Do, YYYY @ h:mm a');
                }

                if (auth.photoURL) {
                    return (
                        <div className="menu">
                            <img src={auth.photoURL} alt="Smiley face" height="30" width="30"/>
                            <p className="nav-profile__subtext">
                                {lastLogin}
                            </p>
                        </div>
                    );
                } else {
                    return (
                        <div className="menu">
                            <p className="nav-profile__subtext">
                                {lastLogin}
                            </p>
                        </div>
                    );
                }
            } else {
                return (
                    <div/>
                )
            }
        }

        return (
            <div className="top-bar">
                <div className="top-bar-left">
                    <ul className="menu">
                        <li className="menu-text">Better Business Zimbabwe</li>
                        <li>
                            <IndexLink to="/" activeClassName="active"
                                       activeStyle={{fontWeight: 'bold'}}>Home</IndexLink>
                        </li>
                        <li>
                            <Link to="/bbzreviews" activeClassName="active"
                                  activeStyle={{fontWeight: 'bold'}}>Reviews</Link>
                        </li>
                        <li>
                            <Link to="/weather" activeClassName="active"
                                  activeStyle={{fontWeight: 'bold'}}>Weather</Link>
                        </li>
                        <li>
                            <Link to="/examples" activeClassName="active"
                                  activeStyle={{fontWeight: 'bold'}}>Examples</Link>
                        </li>
                        <li>
                            <Link to="/about" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>About</Link>
                        </li>
                    </ul>
                </div>
                <div className="top-bar-right">
                    <ul className="menu">
                        <li>
                            {renderMessage()}
                        </li>
                        <li>
                            &nbsp;&nbsp;
                        </li>
                        <li>
                            {renderAvator()}
                        </li>
                        <li>
                            {this.renderLoginControl()}
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        auth: state.auth,
        userProfile: state.userProfile
    }
}
export default connect(mapStateToProps)(Nav);