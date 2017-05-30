import React from 'react';
import {connect} from 'react-redux';
var loginActions = require('loginActions');
var urlActions = require('urlActions');
import {githubProvider, facebookProvider, googleProvider}  from 'app/firebase/';
import {Link} from 'react-router';

export class BbzLogin extends React.Component {
    constructor(props) {
        super(props);

        this.onBbzLogin = this.onBbzLogin.bind(this);
        this.onBbzPasswordLogin = this.onBbzPasswordLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onInputFocus = this.onInputFocus.bind(this);
        this.state = {email: "", password: ""};
    }

    componentDidMount() {
        const {dispatch, currentURL, isLoggedIn, error} = this.props;
        console.debug("isLoggedIn->",isLoggedIn);
        if (!isLoggedIn) {
            // set the current url/path for future redirection if login fails
            //dispatch(urlActions.setRedirectUrl(currentURL));
        } else {
            dispatch(loginActions.startBbzLogout());
        }

        if (error) {
            dispatch(errorActions.bbzClearError());
        }
    }



    onBbzPasswordLogin = (e) => {
        e.preventDefault();
        var {dispatch} = this.props;
        dispatch(loginActions.startBbzEmailLogin(this.state.email, this.state.password));
    };

    onBbzLogin = (e) => {
        e.preventDefault();
        var {dispatch} = this.props;

        switch ($(e.target).attr('id')) {
            case 'google':
                dispatch(loginActions.startBbzLogin(googleProvider));
                break;
            case 'facebook':
                dispatch(loginActions.startBbzLogin(facebookProvider));
                break;
            case 'github':
                dispatch(loginActions.startBbzLogin(githubProvider));
                break;
            default:
                break;
        }
    };

    onChangePassword = (e) => {
        this.setState({password: e.target.value});
    }

    onChangeEmail = (e) => {
        this.setState({email: e.target.value});
    }

    onInputFocus = (e) => {
        const {dispatch, error} = this.props;
        if (error) {
            dispatch(errorActions.bbzClearError());
        }
    }

    render() {
        return (
            <div className="container">
                <h1 className="well">Login</h1>
                <div className="col-lg-12 well">
                    <div className="row">
                        <div className="col-sm-6 form-group">
                            <label>User Name</label>
                            <input className="form-control" id="email" placeholder="username.." type="text"
                                   value={this.state.email}
                                   onChange={this.onChangeEmail} onFocus={this.onInputFocus}/>
                        </div>
                        <div className="col-sm-6 form-group">
                            <label>Password</label>
                            <input className="form-control" id="password" placeholder="password.." type="password"
                                   value={this.state.password} onChange={this.onChangePassword}
                                   onFocus={this.onInputFocus}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <button id="login" type="button" className="btn btn-block btn-info"
                                    onClick={this.onBbzPasswordLogin}>Login
                            </button>
                        </div>
                    </div>
                    <div className="or-text">
                        <div className="or-text-row">
                            <div className="or-text-line">
                                <button type="button" className="btn btn-default btn-circle" disabled="disabled">
                                    or
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="btn-group">
                                <button id="facebook" onClick={this.onBbzLogin} type="button"
                                        className="btn btn-primary"><i className="fa"></i>Sign in with Facebook
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="btn-group">
                                <button id="google" onClick={this.onBbzLogin} type="button"
                                        className="btn btn-danger"><i className="fa"></i>Sign in with Google
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="btn-group">
                                <button id="github" onClick={this.onBbzLogin} type="button"
                                        className="btn btn-success"><i className="fa"></i>Sign in with GitHub
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="or-text">
                        <div className="or-text-row">
                            <div className="or-text-line">
                                <button type="button" className="btn btn-default btn-circle">or</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="btn-group">
                                <Link to="/createaccount" activeClassName="active"
                                      activeStyle={{fontWeight: 'bold'}}>Create New Account</Link>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="btn-group">
                                <Link to="/resetpassword" activeClassName="active"
                                      activeStyle={{fontWeight: 'bold'}}>Forgot My Password :-)</Link>
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
        isLoggedIn: state.auth.loggedIn,
        currentURL: ownProps.location.pathname,
        error: state.error
    }
}

export default connect(mapStateToProps)(BbzLogin);