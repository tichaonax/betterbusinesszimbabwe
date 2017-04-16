var React = require('react');
var {Link} = require('react-router');
var {connect} = require('react-redux');

export class Examples extends React.Component {
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
                                    <Link to="weather?location=Gutu">Gutu, Zimbabwe</Link>
                                </li>
                                <li>
                                    <Link to="weather?location=Harare">Harare, Zimbabwe</Link>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        isLoggedIn: state.auth.loggedIn,
        currentURL: ownProps.location.pathname,
        error: state.error
    }
}

export default connect(mapStateToProps)(Examples)