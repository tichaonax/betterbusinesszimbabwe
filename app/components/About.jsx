var React = require('react');
var {connect} = require('react-redux');
var navActions = require('navActions');

class About extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    componentDidMount() {
        this.dispatch(navActions.setNavPage("About"));
    }

    render() {
        return (
            <div className="row">
                <div className="columns medium-centered">
                    <div className="container">
                        <h1 className="text-center page-title">About</h1>
                        <div className="columns small-centered small-10 medium-6 large-4">
                            <div className="callout callout-auth">
                                <p>Better Business Zimbabwe is dedicated to promoting good business practices in
                                    Zimbabwe.
                                    This is achieved by reporting of both good and bad experiences consumers encounter
                                    when
                                    conducting their business.
                                    The end result is a win-win situation for good businesses and their consumers.
                                    Checkout out these resources that I have used to create this website!</p>
                                <ol>
                                    <li>
                                        <a href="https://facebook.github.io/react" target="_blank">React</a> - React
                                        JavaScript framework
                                    </li>
                                    <li>
                                        <a href="https://github.com/tichaonax/betterbusinesszimbabwe"
                                           target="_blank">GitHub</a> - This codebase is
                                        stored in GitHub.
                                    </li>
                                    <li>
                                        <a href="https://firebase.google.com/" target="_blank">Firebase</a> - Firebase
                                        helps you build better mobile apps and grow your business.
                                    </li>
                                    <li>
                                        <a href="https://certbot.eff.org/"
                                           target="_blank">Certbot</a> - Automatically enable HTTPS on your website with
                                        EFF's Certbot.
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(About);