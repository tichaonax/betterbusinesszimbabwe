import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';
import Error from 'Error';

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
            dispatch(actions.setRedirectUrl(currentURL));
        } else {
            dispatch(actions.startBbzLogout());
        }

        if (error) {
            dispatch(actions.bbzClearError());
        }
    }

    onBbzResetPassword = (e) => {
        e.preventDefault();
        var {dispatch} = this.props;
        dispatch(actions.startSendPasswordResetEmail(this.state.email));
    };

    onChangeEmail = (e) => {
        this.setState({email: e.target.value});
    }

    onInputFocus = (e) => {
        const {dispatch, error} = this.props;
        if (error) {
            dispatch(actions.bbzClearError());
        }
    }

    render() {
        return (
            <div>
                <h3 className="page-title">Password Reset</h3>
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
                                <button id="email" className="button" onClick={this.onBbzResetPassword}>Reset Password
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