import React from 'react';
var loginActions = require('loginActions');
import {connect} from 'react-redux';
var {Link} = require('react-router');

export class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }


    onLogout = (e) => {
        e.preventDefault();
        console.debug("start log out");
        this.props.dispatch(loginActions.startBbzLogout());
        //this.props.closeNav;
    }

    render() {
        var {isLoggedIn} = this.props;

        if (isLoggedIn) {
            return (
               <li className="upper-links"><a className="links" href="#" onClick={this.onLogout}>Logout</a>
               </li>
            );
        } else {
            return (
                <Link to="/login" activeClassName="active" className="links" onClick={()=>this.props.closeNav}
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
