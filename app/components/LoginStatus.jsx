import React from 'react';
import moment from 'moment';
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
            var lastLogin = "";

            if (userProfile && userProfile.lastLogins) {
                lastLogin = moment.unix(userProfile.lastLogins.loginAt).format('MMM Do, YYYY @ h:mm a');
            }

            var joined = "";

            if (userProfile && userProfile.createDate) {
                joined = moment.unix(userProfile.createDate).format('MMM Do, YYYY');
            }
            return(
                <div>
                    <aside>
                        <h6>{displayName}</h6>
                        <p>Welcome!</p>
                    </aside>
                    <aside>
                        <h6>Member Since</h6>
                        <p>{joined}</p>
                    </aside>
                    <aside>
                        <h6>Last Login</h6>
                        <p>{lastLogin}</p>
                    </aside>
                </div>
            )

        }

        function renderLoggedOut() {
            return (
                <div>
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
