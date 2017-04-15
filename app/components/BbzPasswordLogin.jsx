import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

export class BbzPasswordLogin extends React.Component {
    constructor(props) {
        super(props);
        this.onBbzPasswordLogin = this.onBbzPasswordLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.state =  { email: "", password: ""};
    }

    onBbzPasswordLogin = (e) => {
        e.preventDefault();
        var {dispatch} = this.props;
        //dispatch(actions.starTodotLoginWithEmailPassword(githubProvider, this.state.email, this.state.password));
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
                                <button id="email" className="button" onClick={this.onBbzPasswordLogin}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Redux.connect()(BbzPasswordLogin);