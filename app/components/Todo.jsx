var React = require('react');

class Todo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var {text}=this.props;

        return (
            <div>
                {text}
            </div>
        );
    }
}

module.exports = Todo;