var React = require('react');
var TodoList = require('TodoList');

class TodoApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [
                {
                    id: 1,
                    text: 'Clean the garage'
                },
                {
                    id: 2,
                    text: 'Fix 401K'
                }
            ]
        }
    }

    render() {
        var {todos}= this.state;
        return (
            <div>
                <h1 className="text-center page-title">Todo App</h1>
                <TodoList todos={todos}/>
            </div>
        );
    }
}

module.exports = TodoApp;