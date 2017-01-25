var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

//export so that when testing we do use the connect version that needs the store
export class AddTodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var {dispatch} = this.props;
        var todoText = this.refs.todoItemText.value;
        if (todoText.length > 0) {
            this.refs.todoItemText.value = '';
            dispatch(actions.startAddTodoItems(todoText));
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

//AddTodoItem does not need properties off of the state we do not pass the state
export default connect()(AddTodoItem);