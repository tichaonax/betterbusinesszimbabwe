import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import {githubProvider, facebookProvider, googleProvider, userEamilProvider}  from 'app/firebase/'

export class BbzLogin extends React.Component {
    constructor(props) {
        super(props);

        this.onBbzLogin = this.onBbzLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.state =  { email: "", password: ""};
    }

    onBbzLogin = (e) => {
        e.preventDefault();
debugger;
        var {dispatch} = this.props;

        switch ($(e.target).attr('id')) {
            case 'google':
                dispatch(actions.starTodotLogin(googleProvider));
                break;
            case 'facebook':
                dispatch(actions.starTodotLogin(facebookProvider));
                break;
            case 'github':
                dispatch(actions.starTodotLogin(githubProvider));
                break;
            case 'email':
                alert("email");
                //dispatch(actions.starTodotLoginWithEmailPassword(githubProvider, this.state.email, this.state.password));
                break;
            case 'create-account':
                alert("create-account")
                //dispatch(actions.starTodotLoginWithEmailPassword(githubProvider, this.state.email, this.state.password));
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

    render() {
        return (
            <div>
                <h1 className="page-title">Better Business Zimbabwe</h1>
                <div className="row">
                    <div className="columns small-centered small-10 medium-6 large-4">
                        <div className="callout callout-auth">
                            <h3>Login</h3>
                            <p>Login with GitHub account</p>
                            <button id="github" className="button" onClick={this.onBbzLogin}>Login with GitHub
                            </button>
                            <p>Login with Facebook account</p>
                            <button id="facebook" className="button" onClick={this.onBbzLogin}>Login with
                                Facebook
                            </button>
                            <p>Login with Google account</p>
                            <button id="google" className="button" onClick={this.onBbzLogin}>Login with Google
                            </button>

                            {/*<Error error={this.state.error}/>*/}
                            <div className="callout callout-auth">
                                <label htmlFor="email">Email:</label>
                                <input id="email" placeholder="Enter email address" type="text" value={this.state.email}
                                       onChange={this.onChangeEmail}/>
                            </div>
                            <div className="callout callout-auth">
                                <label htmlFor="password">Password:</label>
                                <input id="password" placeholder="Enter password" type="password"
                                       value={this.state.password} onChange={this.onChangePassword}/>
                            </div>
                            <div className="callout callout-auth">
                                <button id="email" className="button" onClick={this.onBbzLogin}>Login wit Email and
                                    Password
                                </button>
                            </div>
                            <div className="callout callout-auth">
                                <button id="create-account" className="button" onClick={this.onBbzLogin}>Create Account
                                    with Email and Password
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Redux.connect()(BbzLogin);