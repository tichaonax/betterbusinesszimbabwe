import React from 'react';
import {connect} from 'react-redux';
import BbzItem from 'BbzItem';
var BbzAPI = require('BbzAPI');


export class BbzList extends React.Component {
    constructor(props) {
        super(props);
    }

    renderTodoItems = () => {
        var {todoItems, showCompleted, searchText} = this.props;
        var filteredTodoItems = BbzAPI.getFilteredTodoItems(todoItems, showCompleted, searchText);

        if (filteredTodoItems.length === 0) {
            return (
                <p className="container__message">No BBZ Reveiws</p>
            )
        }

        return filteredTodoItems.map((todoItem) => {
            return (
                <BbzItem key={todoItem.id} {...todoItem} />
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
)(BbzList);