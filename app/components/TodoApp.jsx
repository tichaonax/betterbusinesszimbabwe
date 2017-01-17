var React = require('react');

import TodoList from 'TodoList'
import AddTodoItem from 'AddTodoItem';
import TodoSearch from 'TodoSearch';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
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

module.exports = TodoApp;