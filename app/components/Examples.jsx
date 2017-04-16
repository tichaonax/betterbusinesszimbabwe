var React = require('react');
var {Link} = require('react-router');

class Examples extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3 className="text-center page-title">Examples</h3>
                <div className="row">
                    <div className="columns small-centered small-10 medium-6 large-4">
                        <div className="callout callout-auth">

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
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Examples;