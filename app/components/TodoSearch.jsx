var React = require('react');

class TodoSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSearch = () => {
        var showCompleted = this.refs.showCompleted.checked;
        var searchText = this.refs.searchText.value;

        this.props.onSearch(showCompleted, searchText);
    }

    render() {

        return (
            <div>
                <div>
                    <input type="text" ref="searchText" placeholder="Enter text to search?"
                           onChange={this.handleSearch}/>
                </div>
                <div>
                    <label>
                        <input type="checkbox" ref="showCompleted" onChange={this.handleSearch}/>
                        Show Completed tasks
                    </label>
                </div>
            </div>
        );
    }
}

module.exports = TodoSearch;