import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

export class BbzResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.onBbzResetPassword = this.onBbzResetPassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.state =  { email: ""};
    }

    onBbzResetPassword = (e) => {
        e.preventDefault();
        var {dispatch} = this.props;
        //dispatch(actions.starTodotLoginWithEmailPassword(githubProvider, this.state.email, this.state.password));
    };

    onChangeEmail = (e) => {
        this.setState({email: e.target.value});
    }

    render() {
        return (
            <div>
                <h1 className="page-title">Passwword Reset</h1>
                <div className="row">
                    <div className="columns small-centered small-10 medium-6 large-4">
                        <div className="callout callout-auth">
                            {/*<Error error={this.state.error}/>*/}
                            <div className="callout callout-auth">
                                <label htmlFor="email">Email:</label>
                                <input id="email" placeholder="Enter email address" type="text" value={this.state.email}
                                       onChange={this.onChangeEmail}/>
                            </div>
                            <div className="callout callout-auth">
                                <button id="email" className="button" onClick={this.onBbzResetPassword}>Reset Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Redux.connect()(BbzResetPassword);