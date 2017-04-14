var React = require('react');
var {Link} = require('react-router');

class Examples extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1 className="text-center page-title">Examples</h1>
                <p>Try out the my home towns</p>
                <ol>
                    <li>
                        <Link to="/?location=Gutu">Gutu, Zimbabwe</Link>
                    </li>
                    <li>
                        <Link to="/?location=Harare">Harare, Zimbabwe</Link>
                    </li>
                </ol>
            </div>
        );
    }
}

module.exports = Examples;