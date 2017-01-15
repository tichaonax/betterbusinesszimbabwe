var React = require('react');
var moment = require('moment');

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var {id, text, completed, onToggleItem, createDate, completeDate}=this.props;
        //onToggleItem is passed down function to be called on the onClick event of the div
        //this occurs when user clicks on either text ot check box

        //Note that there is no onChange event on the checkbox beacuse the state is handled by the parent TodoApp

        var renderDate =()=>{
            var message = 'Created ';
            var timestamp = createDate;

            if(completed){
                message ='Completed ';
                timestamp = completeDate;
            }

            return message + moment.unix(timestamp).format('MMM Do, YYYY @ h:mm a')
        }
        return (
            <div onClick={() => {
                onToggleItem(id);
            }}>
                <input type="checkbox" checked={completed}/>
                <p>{text}</p>
                <p>{renderDate()}</p>

            </div>
        );
    }
}

module.exports = TodoItem;