var React = require('react');
var {connect} = require('react-redux');
import TodoItem from 'TodoItem';

export class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }

    renderTodoItems = (todoItems) => {
        if (todoItems.length === 0) {
            return (
                <p className="container__message">No Tasks To Do</p>
            )
        }

        return todoItems.map((todoItem) => {
            return (
                <TodoItem key={todoItem.id} {...todoItem} />
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

export default connect(
    (state) => {
        return {
            todoItems: state.todoItems
        }
    }
)(TodoList);