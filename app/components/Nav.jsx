var React = require('react');
var {Link, IndexLink} = require('react-router');

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
    }

    onSearch(e) {
        e.preventDefault();
        var location = this.refs.search.value;
        var encodedLocation = encodeURIComponent(location);
        if (location.length > 0) {
            this.refs.search.value = '';
            window.location.hash = '#/?location=' + encodedLocation;
        }
    }

    render() {
        return (
            <div className="top-bar">

                <div className="top-bar-left">

                    <ul className="menu">
                        <li className="menu-text">Weather App</li>
                        <li>
                            <IndexLink to="/">Get
                                Weather</IndexLink>
                        </li>
                        <li>
                            <Link to="/about" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>About</Link>
                        </li>
                        <li>
                            <Link to="/examples" activeClassName="active"
                                  activeStyle={{fontWeight: 'bold'}}>Examples</Link>
                        </li>
                        <li>
                            <Link to="/login" activeClassName="active"
                                  activeStyle={{fontWeight: 'bold'}}>Login</Link>
                        </li>
                    </ul>

                </div>
                <div className="top-bar-right">
                    <form onSubmit={this.onSearch}>
                        <ul className="menu">
                            <li>
                                <input type="search" ref="search" placeholder="Search Weather by city"/>
                            </li>
                            <li>
                                <input type="submit" className="button" value="Get Weather"/>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        );
    }
}

module.exports = Nav;
