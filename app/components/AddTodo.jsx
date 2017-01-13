var React = require('react');

class AddTodo extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var todoText = this.refs.todoText.value;
        if (todoText.length > 0) {
            this.refs.todoText.value = '';
            this.props.onAddTodo(todoText);
        } else {
            this.refs.todoText.focus();
        }
    }

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" ref="todoText" placeholder="Enter task to do?"/>
                    <button className="button expanded ">Add Todo</button>
                </form>
            </div>
        );
    }
}

module.exports = AddTodo;