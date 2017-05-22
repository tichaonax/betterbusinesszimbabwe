import React from 'react';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';
import LoginControl from '../login/LoginControl';
import LoginStatus from '../login/LoginStatus';
import AdminNavigation from 'app/admin/AdminNavigation';

class Nav extends React.Component {
    constructor(props) {
        super(props);
    }

    renderAdminNavigation(){
        return (<AdminNavigation/>);
    }

    renderLoginControl() {
        return (<LoginControl/>);
    }

    renderLoginStats() {
        return (<LoginStatus/>);
    }

    render() {
        var {auth} = this.props;
        function renderAvator() {
            if (auth.loggedIn) {
                if (auth.photoURL) {
                    return (
                        <div className="menu">
                            <img src={auth.photoURL} alt="Smiley face" height="60" width="60"/>
                            <p className="nav-profile__subtext">
                            </p>
                        </div>
                    );
                } else {
                    return (
                        <div className="menu">
                            <p className="nav-profile__subtext">
                            </p>
                        </div>
                    );
                }
            } else {
                return (
                    <div>
                    </div>
                )
            }
        }

        return (
            <div className="top-bar">
                <div className="top-bar-left">
                    <ul className="menu">
                        <li className="menu-text">Better Business Zimbabwe</li>
                        <li>
                            <Link to="/reviews" activeClassName="active"
                                  activeStyle={{fontWeight: 'bold'}}>Reviews</Link>
                        </li>
                        <li>
                            <IndexLink to="/companies" activeClassName="active"
                                       activeStyle={{fontWeight: 'bold'}}>Companies</IndexLink>
                        </li>
                        <li>
                            <Link to="/weather" activeClassName="active"
                                  activeStyle={{fontWeight: 'bold'}}>Weather</Link>
                        </li>
                        <li>
                            <Link to="/about" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>About</Link>
                        </li>
                    </ul>
                </div>
                <div className="top-bar-right">
                    {this.renderLoginStats()}
                        <ul className="menu">
                            <li>
                                {this.renderAdminNavigation()}
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
        avator: state.auth.photoURL,
        isLoggedIn: state.auth.loggedIn,
        displayName: state.auth.displayName,
        userProfile: state.userProfile
    }
}
export default connect(mapStateToProps)(Nav);