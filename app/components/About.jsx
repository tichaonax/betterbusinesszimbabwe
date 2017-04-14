var React = require('react');

class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1 className="text-center page-title">About</h1>
                <p>A simple weather application using react. I build this for The Complete React App Developer course.
                    Checkout out these resources</p>
                <ol>
                    <li>
                        <a href="https://facebook.github.io/react">React</a> - React JavaScript framework that I used.
                    </li>
                    <li>
                        <a href="https://github.com/tichaonax/WeatherApp">GitHub</a> - This codebase is stored in GitHub.
                    </li>
                    <li>
                        <a href="http://www.openweathermap.org/">Open Weather Map</a> - I used Open Weather Map to search
                        for weather by city name.
                    </li>
                    <li>
                        <a href="http://www.heroku.com">Heroku</a> - I used Heroku tools to deploy application to
                        the Internet.
                    </li>
                </ol>
            </div>
        );
    }
}

module.exports = About;