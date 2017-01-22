import React from 'react';
import moment from 'moment';
import * as Redux from 'react-redux';
import * as actions from 'actions';

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
            <div className={todoClassName} onClick={() => {dispatch(actions.startToggleTodoItem(id, !completed));}}>
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

export default  Redux.connect()(TodoItem);