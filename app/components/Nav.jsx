import React from 'react';
import moment from 'moment';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';
import LoginControl from 'LoginControl';
import LoginStatus from 'LoginStatus';

class Nav extends React.Component {
    constructor(props) {
        super(props);
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
                            {this.renderLoginStats()}
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