var React = require('react');

class Todo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var {id, text}=this.props;

        return (
            <div>
                {id}. {text}
            </div>
        );
    }
}

module.exports = Todo;