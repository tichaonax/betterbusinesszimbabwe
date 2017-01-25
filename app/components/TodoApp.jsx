import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';

import TodoList from 'TodoList'
import AddTodoItem from 'AddTodoItem';
import TodoSearch from 'TodoSearch';

export class TodoApp extends React.Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout = (e) => {
        var {dispatch} = this.props;
        e.preventDefault();

        dispatch(actions.startTodoLogout());
    };


    render() {
        return (
            <div>
                <div className="page-actions">
                    <a href="#" onClick={this.onLogout}>Logout</a>
                </div>
                <h1 className="text-center page-title">Todo App</h1>
                <div className="row">
                    <div className="column small-centered small-11 medium-6 large-6">
                        <div className="container ">
                            <TodoSearch/>
                            <TodoList/>
                            <AddTodoItem/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Redux.connect()(TodoApp);