import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {actions} from 'actions';

//export so that when testing we do use the connect version that needs the store
export class AddBbzItem extends React.Component {
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
        var {isLoggedIn} = this.props;
        if (!isLoggedIn) {
            const errorMessage = "To add a review you must be logged in";
            console.debug(errorMessage);
            return (
                <div className="container__footer">
                    <ul className="menu">
                        <li>
                            {errorMessage}
                        </li>
                        <li>
                            <Link to="/login" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Click to login</Link>
                        </li>
                    </ul>
                </div>
            );
        }
        else {
            return (
                <div className="container__footer">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" ref="todoItemText" placeholder="Enter Reiew?"/>
                        <button className="button expanded ">Add BBZ Review</button>
                    </form>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.loggedIn
    }
}
export default connect(mapStateToProps)(AddBbzItem);
