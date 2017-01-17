var React = require('react');
var $ = require('jquery');
var {connect} = require('react-redux');
var actions = require('actions');

export class TodoSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var {showCompleted, searchText, dispatch} = this.props;

        return (
            <div className="container__header">
                <div>
                    <input id="searchItemText" type="text"  value={searchText} placeholder="Enter text to search?"
                           onChange={() => {
                               var searchText = $('#searchItemText').val();
                               dispatch(actions.setSearchText(searchText));
                           }}/>
                </div>
                <div>
                    <label>
                        <input type="checkbox" ref="showCompleted" checked={showCompleted} onChange={() => {
                            dispatch(actions.togggleShowCompletedItem());
                        }}/>
                        Show Completed tasks
                    </label>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            showCompleted: state.showCompleted,
            searchText: state.searchText
        }
    }
)(TodoSearch);