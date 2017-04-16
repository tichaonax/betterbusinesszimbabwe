var React = require('react');

class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1 className="text-center page-title">About</h1>
                <div className="row">
                    <div className="columns small-centered small-10 medium-6 large-4">
                        <div className="callout callout-auth">
                            <p>Better Business Zimbabwe is dedicated to promote good business practices in Zimbabwe.
                                This is achieved by both reporting good and bad experiences consumers get when conducting business.
                                The end result is a win-win sitution for good businesses and their consumers.
                                Checkout out these resources</p>
                            <ol>
                                <li>
                                    <a href="https://facebook.github.io/react" target="_blank">React</a> - React JavaScript framework
                                    that I used.
                                </li>
                                <li>
                                    <a href="https://github.com/tichaonax/betterbusinesszimbabwe" target="_blank">GitHub</a> - This codebase is
                                    stored in GitHub.
                                </li>
                                <li>
                                    <a href="http://www.openweathermap.org/" target="_blank">Open Weather Map</a> - I used Open Weather
                                    Map to search
                                    for weather by city name.
                                </li>
                           </ol>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = About;