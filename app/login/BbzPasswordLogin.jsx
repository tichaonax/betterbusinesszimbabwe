import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
var loginActions = require('loginActions');
var errorActions = require('errorActions');
var urlActions = require('urlActions');
var Loader = require('react-loader');
import Error from 'Error';

export class BbzPasswordLogin extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
        this.state = {
            email: "",
            password: "",
            loaded: false
        };
    }

    componentDidMount() {
        const {currentURL, isLoggedIn, error} = this.props;
        if (!isLoggedIn) {
            // set the current url/path for future redirection if login fails
            this.dispatch(urlActions.setRedirectUrl(currentURL));
        }else{
            this.dispatch(loginActions.startBbzLogout());
        }

        if (error) {
            this.dispatch(errorActions.bbzClearError());
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            loaded: !newProps.loading.loaded
        });
    }

    onBbzPasswordLogin = (e) => {
        e.preventDefault();
        this.dispatch(loginActions.startBbzEmailLogin(this.state.email, this.state.password));
    };

    onChangePassword = (e) => {
        this.setState({password: e.target.value});
    }

    onChangeEmail = (e) => {
        this.setState({email: e.target.value});
    }

    onInputFocus = (e) => {
        const {error} = this.props;
        if (error) {
            this.dispatch(errorActions.bbzClearError());
        }
    }

    render() {
        return (
            <div>
                <h1 className="page-title">Login</h1>
                <div className="row">
                    <div className="columns small-centered small-10 medium-6 large-4">
                        <div className="callout callout-auth">
                            <Error/>
                            <p/>
                            <div className="callout callout-auth">
                                <label htmlFor="email">Email:</label>
                                <input id="email" placeholder="Enter email address" type="text" value={this.state.email}
                                       onChange={this.onChangeEmail} onFocus={this.onInputFocus}/>
                                <p/>
                                <label htmlFor="password">Password:</label>
                                <input id="password" placeholder="Enter password" type="password"
                                       value={this.state.password} onChange={this.onChangePassword}
                                       onFocus={this.onInputFocus}/>
                                <p/>
                                <button id="email" className="button" onClick={this.onBbzPasswordLogin}>Login</button>
                            </div>
                            <div className="callout callout-auth">
                                <ul className="menu">
                                    <li>
                                        <Link to="/resetpassword" activeClassName="active"
                                              activeStyle={{fontWeight: 'bold'}}>Forgot My Password :-)</Link>
                                    </li>
                                </ul>
                                <ul className="menu">
                                    <li>
                                        <Link to="/createaccount" activeClassName="active"
                                              activeStyle={{fontWeight: 'bold'}}>Create New Account</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <Loader loaded={this.state.loaded}>
                </Loader>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isLoggedIn: state.auth.loggedIn,
        currentURL: ownProps.location.pathname,
        error: state.error,
        loading: state.loading
    }
}
export default connect(mapStateToProps)(BbzPasswordLogin);