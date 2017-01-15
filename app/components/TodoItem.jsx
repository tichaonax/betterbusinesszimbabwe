var React = require('react');
var moment = require('moment');

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var {id, text, completed, onToggleItem, createDate, completeDate}=this.props;
        var todoClassName = completed ? 'todo-item todo-item-completed' : 'todo-item';


        //onToggleItem is passed down function to be called on the onClick event of the div
        //this occurs when user clicks on either text ot check box

        //Note that there is no onChange event on the checkbox beacuse the state is handled by the parent TodoApp

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
            <div className={todoClassName} onClick={() => {
                onToggleItem(id);
            }}>
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

module.exports = TodoItem;