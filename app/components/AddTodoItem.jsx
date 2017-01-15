var React = require('react');

class AddTodoItem extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var todoText = this.refs.todoItemText.value;
        if (todoText.length > 0) {
            this.refs.todoItemText.value = '';
            this.props.onAddTodoItem(todoText);
        } else {
            this.refs.todoItemText.focus();
        }
    }

    render() {

        return (
            <div className="container__footer">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" ref="todoItemText" placeholder="Enter task to do?"/>
                    <button className="button expanded ">Add Todo Item</button>
                </form>
            </div>
        );
    }
}

module.exports = AddTodoItem;