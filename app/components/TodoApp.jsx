var React = require('react');
var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');

class TodoApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showCompleted : false,
            searchText: '',

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


    handleSearch = (showCompleted, searchText) => {
        this.setState({
            showCompleted : showCompleted,
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