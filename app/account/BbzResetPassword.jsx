import React from 'react';
import {connect} from 'react-redux';
var accountActions = require('accountActions');
var loginActions = require('loginActions');
var errorActions = require('errorActions');
var urlActions = require('urlActions');
import Error from '../error/Error';

export class BbzResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.onBbzResetPassword = this.onBbzResetPassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onInputFocus = this.onInputFocus.bind(this);
        this.state = {email: ""};
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

    onBbzResetPassword = (e) => {
        e.preventDefault();
        var {dispatch} = this.props;
        dispatch(accountActions.startSendPasswordResetEmail(this.state.email));
    };

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
                <h3 className="page-title">Password Reset</h3>
                <div className="review-block">
                    <div className="row">
                        <div className="col-sm-12">
                            <Error/>
                            <p/>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input id="email" placeholder="Enter email address" type="text"
                                       value={this.state.email}
                                       className="form-control"
                                       maxLength={100}
                                       onChange={this.onChangeEmail} onFocus={this.onInputFocus}/>
                                <p/>
                                <button id="email" className="btn btn-primary btn-lg btn-block"
                                        onClick={this.onBbzResetPassword}>Reset Password
                                </button>
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
export default connect(mapStateToProps)(BbzResetPassword);