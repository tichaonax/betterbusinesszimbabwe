var React = require('react');
var TodoItem = require('TodoItem');

class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }

    renderTodoItems = (todoItems, onToggleItem) => {
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