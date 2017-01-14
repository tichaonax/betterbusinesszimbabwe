var React = require('react');
var TodoItem = require('TodoItem');

class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }

    renderTodoItems = (todoItems) => {

        return todoItems.map((todoItem) => {
            return (
                <TodoItem key={todoItem.id} {...todoItem}/>
            )
        });
    }

    render() {

        var {todoItems} = this.props;

        return (
            <div>
                {this.renderTodoItems(todoItems)}
            </div>
        );
    }
}

module.exports = TodoList;