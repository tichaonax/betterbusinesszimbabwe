import React from 'react';
import {Link, IndexLink} from 'react-router';
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

    renderLoginControl() {
        return (<LoginControl/>);
    }

    render() {
        var {auth} = this.props;

        function renderAvator() {
            if (auth.photoURL) {
                return (
                    <div>
                        {auth.displayName} <img src={auth.photoURL} alt="Smiley face" height="32" width="32"/>
                    </div>
                );
            } else {
                return (
                    <div>
                        {auth.email}
                    </div>
                )
            }
        }

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
                        <li>
                            {this.renderLoginControl()}
                        </li>
                        <li>
                            {renderAvator()}
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(Nav);