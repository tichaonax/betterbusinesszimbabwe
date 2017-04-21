import React from 'react';
import * as actions from 'actions';
import {connect} from 'react-redux';
var {Link} = require('react-router');

export class LoginControl extends React.Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }


    onLogout = (e) => {
        var {dispatch} = this.props;
        e.preventDefault();
        dispatch(actions.startBbzLogout());
    }

    render() {
        var {isLoggedIn} = this.props;

        if (isLoggedIn) {
            return (
                <a href="#" onClick={this.onLogout}>Logout</a>
            );
        } else {
            return (
                <Link to="/login" activeClassName="active"
                      activeStyle={{fontWeight: 'bold'}}>Login</Link>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps)(LoginControl)
