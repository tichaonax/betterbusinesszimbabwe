var React = require('react');
var uuid = require('node-uuid');
var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');

class TodoApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showCompleted: false,
            searchText: '',

            todos: [
                {
                    id: uuid(),
                    text: 'Clean the garage'
                },
                {
                    id: uuid(),
                    text: 'Fix 401K'
                },
                {
                    id: uuid(),
                    text: 'Update tests'
                },
                {
                    id: uuid(),
                    text: 'play video'
                }
            ]
        }
    }

    handleAddTodo = (text) => {
        this.setState({
            todos: [
                ...this.state.todos, {
                    id: uuid(),
                    text: text
                }
            ]
        })
    }


    handleSearch = (showCompleted, searchText) => {
        this.setState({
            showCompleted: showCompleted,
            searchText: searchText.toLowerCase()
        });
    }

    render() {
        var {todos}= this.state;
        return (
            <div>
                <h1 className="text-center page-title">Todo App</h1>
                <TodoSearch onSearch={this.handleSearch}/>
                <TodoList todos={todos}/>
                <AddTodo onAddTodo={this.handleAddTodo}/>
            </div>
        );
    }
}

module.exports = TodoApp;