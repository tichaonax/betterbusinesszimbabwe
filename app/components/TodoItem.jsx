var React = require('react');
var moment = require('moment');
var {connect} = require('react-redux');
var actions = require('actions');

export class TodoItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var {id, text, completed, createDate, completeDate, dispatch} = this.props;
        var todoClassName = completed ? 'todo-item todo-item-completed' : 'todo-item';

        var renderDate = () => {
            var message = 'Created ';
            var timestamp = createDate;

            if (completed) {
                message = 'Completed ';
                timestamp = completeDate;
            }

            return message + moment.unix(timestamp).format('MMM Do, YYYY @ h:mm a')
        }
        return (
            <div className={todoClassName} onClick={() => {dispatch(actions.toggleTodoItem(id));}}>
                <div>
                    <input type="checkbox" checked={completed}/>
                </div>
                <div>
                    <p>{text}</p>
                    <p className="todo-item__subtext">{renderDate()}</p>
                </div>
            </div>
        );
    }
}
;

export default  connect()(TodoItem);