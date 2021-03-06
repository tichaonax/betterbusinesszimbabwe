import React from 'react';
import {connect} from 'react-redux';
var accountActions = require('accountActions');
var loginActions = require('loginActions');
var errorActions = require('errorActions');
var urlActions = require('urlActions');
import Error from 'Error';
import {hashHistory} from 'react-router';

export class CreateNewAccount extends React.Component {
    constructor(props) {
        super(props);
        this.onCreateNewAccount = this.onCreateNewAccount.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onInputFocus = this.onInputFocus.bind(this);
        this.state = {email: "", password: ""};
    }


    componentDidMount() {
        const {dispatch, currentURL, isLoggedIn, error} = this.props;
        if (!isLoggedIn) {
            dispatch(urlActions.setRedirectUrl(currentURL));
        } else {
            dispatch(loginActions.startBbzLogout());
        }

        if (error) {
            dispatch(errorActions.bbzClearError());
        }
    }

    onCreateNewAccount = (e) => {
        e.preventDefault();
        var {dispatch} = this.props;
        dispatch(accountActions.startBbzCreateAccount(this.state.email, this.state.password));
    };

    componentWillReceiveProps(nextProps) {
        var {isLoggedIn} = nextProps;
        if (isLoggedIn) {
            hashHistory.push('/reviews');
        }
    }

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
                <h3 className="page-title">Create New Account</h3>
                <div className="review-block">
                    <div className="row">
                        <div className="col-sm-12">
                            <Error/>
                            <p/>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input id="email" placeholder="Enter email address" type="text"
                                           className="form-control"
                                           maxLength={100}
                                           value={this.state.email}
                                           onChange={this.onChangeEmail} onFocus={this.onInputFocus}/>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input id="password" placeholder="Enter password" type="password"
                                           className="form-control" maxLength={100}
                                           value={this.state.password} onChange={this.onChangePassword}
                                           onFocus={this.onInputFocus}/>
                                </div>
                                <button id="email" className="btn btn-primary btn-lg btn-block"
                                        onClick={this.onCreateNewAccount}>Submit
                                </button>
                            </form>
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
export default connect(mapStateToProps)(CreateNewAccount);
