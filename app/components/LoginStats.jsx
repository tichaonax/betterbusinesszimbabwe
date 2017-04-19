import React from 'react';
import {connect} from 'react-redux';

class LoginStats extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var {
            avator,
            isLoggedIn,
            displayName,
            userProfile
        } = this.props;

        function renderLoggedIn()
        {
            return(
            <div class="panel callout radius">
                <h5>This is a callout panel.</h5>
                <p>It's a little ostentatious.</p>
            </div>)

        }

        function renderLoggedOut()
        {
return(
            <div class="panel callout radius">
                <h5>This is a callout panel.</h5>
                <p>You are Logged out.</p>
            </div>)
        }

        if (isLoggedIn) {
            return (
                <div>
                    {renderLoggedIn()}
                </div>
            );
        }
        else {
            return (
                <div>
                    {renderLoggedOut()}
                </div>
            );
        }
    }
}


function mapStateToProps(state) {
    return {
        avator: state.auth.photoURL,
        isLoggedIn: state.auth.loggedIn,
        displayName: state.auth.displayName,
        userProfile: state.userProfile
    }
}

export default connect(mapStateToProps)(LoginStats)
