var React = require('react');
var {Link, IndexLink} = require('react-router');
import {connect} from 'react-redux';
import LoginControl from 'LoginControl';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        // this.onSearch = this.onSearch.bind(this);
    }

    // onSearch(e) {
    //     e.preventDefault();
    //     var location = this.refs.search.value;
    //     var encodedLocation = encodeURIComponent(location);
    //     if (location.length > 0) {
    //         this.refs.search.value = '';
    //         window.location.hash = '#/?location=' + encodedLocation;
    //     }
    // }

    renderLoginControl(){
        return(<LoginControl/>);
    }
    render() {
        return (
            <div className="top-bar">
                <div className="top-bar-left">
                    <ul className="menu">
                        <li className="menu-text">Better Business Zimbabwe</li>
                        <li>
                            <IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Home</IndexLink>
                        </li>
                        <li>
                            <Link to="/bbzreviews" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Reviews</Link>
                        </li>
                        <li>
                            <Link to="/weather" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Weather</Link>
                        </li>
                        <li>
                            <Link to="/examples" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Examples</Link>
                        </li>
                        <li>
                            <Link to="/about" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>About</Link>
                        </li>
                    </ul>
                </div>
                <div className="top-bar-right">
                        <ul className="menu">
                                {this.renderLoginControl()}
                        </ul>
                </div>
            </div>
        );
    }
}

export default connect()(Nav)