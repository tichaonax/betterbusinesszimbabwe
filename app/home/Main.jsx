import React from 'react';
import {connect} from 'react-redux';
import Nav from '../navigation/Nav';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps) {
        const {redirectUrl} = this.props;
        const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn;
        const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn;

        if (isLoggingIn) {
            this.props.router.push(redirectUrl);
        } else if (isLoggingOut) {
            // cleanup and post-logout redirection here
            this.props.router.push("/");
        }
    }

    render() {
        return (
            <div>
                <Nav/>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.loggedIn,
        redirectUrl: state.redirectUrl
    }
}

export default connect(mapStateToProps)(Main)
