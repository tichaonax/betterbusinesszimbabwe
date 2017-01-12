var React = require('react');

class TodoApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <div>
                <h1 className="text-center page-title">Todo App</h1>
            </div>
        );
    }
}

module.exports = TodoApp;