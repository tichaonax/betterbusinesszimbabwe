var React = require('react');
var {connect} = require('react-redux');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');
var ErrorModal = require('ErrorModal');
var searchActions = require('searchActions');

export class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;

        this.state = {
            temperature: undefined,
            isLoading: true,
            errorMessage: undefined
        }

        this.handleSearch = this.handleSearch.bind(this);
    }

    loadData(props){
        //debugger;
        var location = props.location.query.location;
        if (location && location.length > 0) {
            this.handleSearch(location);
            //window.location.hash = '#/';
        }
        else {
            //load my home city
            //this.handleSearch("Gutu, Zimbabwe");
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.searchText != newProps.searchText) {
            this.setState({locationSearch: newProps.searchText});
        }
    }

    componentDidMount() {
        this.dispatch(searchActions.setSearchButton(true));
        this.loadData(this.props);
    }

    componentWillUnmount(){
        this.dispatch(searchActions.setSearchButton(false));
        this.dispatch(searchActions.setSearchText(""));
    }

    componentWillReceiveProps(newProps){
        this.loadData(newProps);
    }

    handleSearch(location) {
        console.debug("handleSearch", location);
        if (location && location.length == 0) {
            return;
        }
        var that = this;

        this.setState({
            isLoading: true,
            errorMessage: undefined,
            location: undefined,
            temp: undefined
        })

       openWeatherMap.getTemperature(location).then(function (temperatue) {
            that.setState({
                location: location,
                temperature: temperatue,
                isLoading: false
            });
        }, function (e) {
            that.setState({
                isLoading: false,
                errorMessage: e.message
            });
        })
    }

    render() {

        var {searchText} = this.props;
        var {isLoading, temperature, location, errorMessage} = this.state;

        function renderError() {
            if (typeof errorMessage === 'string') {
                return (<ErrorModal title="Error!!!" errorMessage={errorMessage}/>);
            }
        }

        function rendeMessage() {
            if (isLoading &&  searchText.length > 0) {
                return (<div><h3 className="text-center">Fetching weather ...</h3></div>);
            } else if (temperature && location) {
                return (<WeatherMessage temperature={temperature} location={location}/>);
            }
        }

        return (
            <div>
                <h1 className="text-center page-title">Get Weather</h1>
                <div className="row">
                    <div className="columns small-centered small-10 medium-6 large-4">
                        <div className="callout callout-auth">
                            {rendeMessage()}
                            {renderError()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        isLoggedIn: state.auth.loggedIn,
        userProfile: state.userProfile,
        searchText: state.searchText,
        searchOptions: state.searchOptions
    }
})(Weather);