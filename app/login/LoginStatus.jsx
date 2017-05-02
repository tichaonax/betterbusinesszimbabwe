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
            userProfile,
            lastLogin
        } = this.props;

        function renderLoggedIn()
        {
            var lastLoginAt = "";

            if (userProfile && lastLogin) {
                lastLoginAt = moment.unix(lastLogin.loginAt).format('MMM Do, YYYY @ h:mm a');
            }

            var joinedAt = "";

            if (userProfile && userProfile.createDate) {
                joinedAt = moment.unix(userProfile.createDate).format('MMM Do, YYYY');
            }

            var admin = "";

            if(userProfile && userProfile.isAdmin){
                admin = "Admin";
            }

            return(
                <div className="common-div float-left">
                    <table className="common-table">
                        <tbody>
                        <tr>
                            <th>{displayName}</th>
                            <th>Member Since</th>
                            <th>Last Login</th>
                        </tr>
                        <tr>
                            <td>
                                {admin} Welcome!
                            </td>
                            <td>
                                {joinedAt}
                            </td>
                            <td>
                                {lastLoginAt}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        }

        function renderLoggedOut() {
            return null
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
        userProfile: state.userProfile,
        lastLogin: state.lastLogin
    }
}

export default connect(mapStateToProps)(LoginStats)
