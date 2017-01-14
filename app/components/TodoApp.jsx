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
                    text: 'Clean the garage',
                    completed: false
                },
                {
                    id: uuid(),
                    text: 'Fix 401K',
                    completed: true
                },
                {
                    id: uuid(),
                    text: 'Update tests',
                    completed: false
                },
                {
                    id: uuid(),
                    text: 'play video',
                    completed: true
                }
            ]
        }
    }

    handleToggleItem = (id) => {

        var updatedTodoItems = this.state.todoItems.map((todoItem) => {
            //toggle the completed status of the matching id
            if (todoItem.id === id) {
                todoItem.completed = !todoItem.completed;
            }
            return todoItem;
        });

        //updatedTodoItems holds the original todoItems with the matching items completed status changed
        this.setState({
            todoItems: updatedTodoItems
        });

    }

    handleAddTodoItem = (text) => {
        //use the spread operator to set the state to the old state and then add a new objecct attached at the end
        //
        this.setState({
            todoItems: [
                ...this.state.todoItems, {
                    id: uuid(),
                    text: text,
                    completed: false
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
                <TodoList todoItems={todoItems} onToggleItem={this.handleToggleItem}/>
                <AddTodoItem onAddTodoItem={this.handleAddTodoItem}/>
            </div>
        );
    }
}

module.exports = TodoApp;