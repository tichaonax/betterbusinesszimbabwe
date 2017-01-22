var React = require('react');
var {connect} = require('react-redux');
import TodoItem from 'TodoItem';
var TodoAPI = require('TodoAPI');

export class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }

    renderTodoItems = () => {
        var {todoItems, showCompleted, searchText} = this.props;
        var filteredTodoItems = TodoAPI.getFilteredTodoItems(todoItems, showCompleted, searchText);

        if (filteredTodoItems.length === 0) {
            return (
                <p className="container__message">No Tasks To Do</p>
            )
        }

        return filteredTodoItems.map((todoItem) => {
            return (
                <TodoItem key={todoItem.id} {...todoItem} />
            )
        });
    }

    render() {

        return (
            <div>
                {this.renderTodoItems()}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            todoItems: state.todoItems,
            showCompleted: state.showCompleted,
            searchText: state.searchText
        }
    }
)(TodoList);