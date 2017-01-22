import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

export class TodoLogin extends React.Component {
    constructor(props) {
        super(props);
    }


    onTodoLogin = (e) => {
        var {dispatch} = this.props;
        e.preventDefault();
        dispatch(actions.starTodotLogin());
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
                            <button className="button" onClick={this.onTodoLogin}>Login with GitHub</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Redux.connect()(TodoLogin);