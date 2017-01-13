var React = require('react');
var TodoList = require('TodoList');
var AddTodo = require('AddTodo');

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
                },
                {
                    id: 3,
                    text: 'Update tests'
                },
                {
                    id: 4,
                    text: 'play video'
                }
            ]
        }
    }

    handleAddTodo = (text) => {
        alert('new todo item : '+ text);
    }

    render() {
        var {todos}= this.state;
        return (
            <div>
                <h1 className="text-center page-title">Todo App</h1>
                <TodoList todos={todos}/>
                <AddTodo onAddTodo={this.handleAddTodo}/>
            </div>
        );
    }
}

module.exports = TodoApp;