var React = require('react');

class WeatherMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        var {temperature, location}=this.props;

        return (
            <div>
                <h3 className="text-center"> Its {temperature} &#8451; here in {location}</h3>
            </div>
        );
    }
}

module.exports = WeatherMessage;