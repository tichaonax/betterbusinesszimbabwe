import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';
import {githubProvider, facebookProvider, googleProvider}  from 'app/firebase/';
import {Link} from 'react-router';

export class BbzLogin extends React.Component {
    constructor(props) {
        super(props);

        this.onBbzLogin = this.onBbzLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.state = {email: "", password: ""};
    }

    onBbzLogin = (e) => {
        e.preventDefault();
        var {dispatch} = this.props;

        switch ($(e.target).attr('id')) {
            case 'google':
                dispatch(actions.startBbzLogin(googleProvider));
                break;
            case 'facebook':
                dispatch(actions.startBbzLogin(facebookProvider));
                break;
            case 'github':
                dispatch(actions.startBbzLogin(githubProvider));
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

                            <button id="github" className="button" onClick={this.onBbzLogin}>Login with GitHub
                            </button>
                            <p/>
                            <button id="facebook" className="button" onClick={this.onBbzLogin}>Login with
                                Facebook
                            </button>
                            <p/>
                            <button id="google" className="button" onClick={this.onBbzLogin}>Login with Google
                            </button>
                            <ul className="menu">
                                <li>
                                    <Link to="/emaillogin" activeClassName="active"
                                          activeStyle={{fontWeight: 'bold'}}>Login with Email and Password</Link>
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