import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import {githubProvider, facebookProvider, googleProvider}  from 'app/firebase/';
import {Link, IndexLink} from 'react-router';

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
                <h1 className="page-title">Login</h1>
                <div className="row">
                    <div className="columns small-centered small-10 medium-6 large-4">
                        <div className="callout callout-auth">
                            <div className="callout callout-auth">
                                <button id="github" className="button" onClick={this.onBbzLogin}>Login with GitHub
                                </button>
                            </div>
                            <div className="callout callout-auth">
                                <button id="facebook" className="button" onClick={this.onBbzLogin}>Login with
                                    Facebook
                                </button>
                            </div>
                            <div className="callout callout-auth">
                                <button id="google" className="button" onClick={this.onBbzLogin}>Login with Google
                                </button>
                            </div>
                            <div className="callout callout-auth">
                                <ul className="menu">
                                    <li>
                                        <Link to="/emaillogin" activeClassName="active"
                                              activeStyle={{fontWeight: 'bold'}}>Login With email and passord</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="callout callout-auth">
                                <ul className="menu">
                                    <li>
                                        <Link to="/resetpassword" activeClassName="active"
                                              activeStyle={{fontWeight: 'bold'}}>Create a new account</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Redux.connect()(BbzLogin);