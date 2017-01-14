var React = require('react');
var uuid = require('node-uuid');
var TodoList = require('TodoList');
var AddTodoItem = require('AddTodoItem');
var TodoSearch = require('TodoSearch');

class TodoApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showCompleted: false,
            searchText: '',

            todoItems: [
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

    handleAddTodoItem = (text) => {
        this.setState({
            todoItems: [
                ...this.state.todoItems, {
                    id: uuid(),
                    text: text
                }
            ]
        })
    }


    handleSearchItem = (showCompleted, searchText) => {
        this.setState({
            showCompleted: showCompleted,
            searchText: searchText.toLowerCase()
        });
    }

    render() {
        var {todoItems}= this.state;
        return (
            <div>
                <h1 className="text-center page-title">Todo App</h1>
                <TodoSearch onSearch={this.handleSearchItem}/>
                <TodoList todoItems={todoItems}/>
                <AddTodoItem onAddTodoItem={this.handleAddTodoItem}/>
            </div>
        );
    }
}

module.exports = TodoApp;