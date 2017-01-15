var React = require('react');

class TodoSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSearchItem = () => {
        var showCompleted = this.refs.showCompleted.checked;
        var searchText = this.refs.searchItemText.value;

        this.props.onSearchItem(showCompleted, searchText);
    }

    render() {

        return (
            <div className="container__header">
                <div>
                    <input type="text" ref="searchItemText" placeholder="Enter text to search?"
                           onChange={this.handleSearchItem}/>
                </div>
                <div>
                    <label>
                        <input type="checkbox" ref="showCompleted" onChange={this.handleSearchItem}/>
                        Show Completed tasks
                    </label>
                </div>
            </div>
        );
    }
}

module.exports = TodoSearch;