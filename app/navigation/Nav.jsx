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
                        <div>
                            <img src={auth.photoURL} alt="Smiley face" height="35" width="35"/>
                            <p className="nav-profile__subtext">
                            </p>
                        </div>
                    );
                } else {
                    return (
                        <div>
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

            <div className="row">
                <div className="columns medium-centered medium-12 large-12">
                    <div className="callout callout-auth">
                        <div className="column">
                            <div className="row">
                                <div className="menu-text">Better Business Zimbabwe</div>
                                <div>
                                    <Link to="/reviews" activeClassName="active"
                                          activeStyle={{fontWeight: 'bold'}}>Reviews</Link>
                                </div>
                                <div>
                                    <IndexLink to="/companies" activeClassName="active"
                                               activeStyle={{fontWeight: 'bold'}}>Companies</IndexLink>
                                </div>
                                <div>
                                    <Link to="/weather" activeClassName="active"
                                          activeStyle={{fontWeight: 'bold'}}>Weather</Link>
                                </div>
                                <div>
                                    <Link to="/about" activeClassName="active"
                                          activeStyle={{fontWeight: 'bold'}}>About</Link>
                                </div>
                                <div>
                                    {this.renderAdminNavigation()}
                                </div>
                                <div>
                                    {this.renderLoginControl()}
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="row">
                                <div>
                                    {renderAvator()}
                                </div>
                                <div>
                                    {this.renderLoginStats()}
                                </div>
                            </div>
                        </div>
                    </div>
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