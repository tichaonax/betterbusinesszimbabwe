var React = require('react');
var TodoItem = require('TodoItem');

class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }

    renderTodoItems = (todoItems, onToggleItem) => {
        if (todoItems.length === 0) {
            return (
                <p className="container__message">No Tasks To Do</p>
            )
        }

        return todoItems.map((todoItem) => {
            return (
                <TodoItem key={todoItem.id} {...todoItem} onToggleItem={onToggleItem}/>
            )
        });
    }

    render() {

        var {todoItems, onToggleItem} = this.props;

        return (
            <div>
                {this.renderTodoItems(todoItems, onToggleItem)}
            </div>
        );
    }
}

module.exports = TodoList;