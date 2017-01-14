var React = require('react');

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var {id, text, completed, onToggleItem}=this.props;
        //onToggleItem is passed down function to be called on the onClick event of the div
        //this occurs when user clicks on either text ot check box

        //Note that there is no onChange event on the checkbox beacuse the state is handled by the parent TodoApp

        return (
            <div onClick={() => {
                onToggleItem(id);
            }}>
                <input type="checkbox" checked={completed}/>
                {text}
            </div>
        );
    }
}

module.exports = TodoItem;