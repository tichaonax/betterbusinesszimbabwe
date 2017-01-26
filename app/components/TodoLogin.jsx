import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import {githubProvider, facebookProvider, googleProvider}  from 'app/firebase/'

export class TodoLogin extends React.Component {
    constructor(props) {
        super(props);
    }

    onTodoLogin = (e) => {
        e.preventDefault();

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

    render() {
        return (
            <div>
                <h1 className="page-title">Todo App</h1>
                <div className="row">
                    <div className="columns small-centered small-10 medium-6 large-4">
                        <div className="callout callout-auth">
                            <h3>Login</h3>
                            <p>Login with GitHub account</p>
                            <button id="github" className="button" onClick={this.onTodoLogin}>Login with GitHub
                            </button>
                            <p>Login with Facebook account</p>
                            <button id="facebook" className="button" onClick={this.onTodoLogin}>Login with
                                Facebook
                            </button>
                            <p>Login with Google account</p>
                            <button id="google" className="button" onClick={this.onTodoLogin}>Login with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Redux.connect()(TodoLogin);