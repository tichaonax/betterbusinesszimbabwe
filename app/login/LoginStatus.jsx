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
                                Welcome!
                            </td>
                            <td>
                                {joined}
                            </td>
                            <td>
                                {lastLogin}
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
        userProfile: state.userProfile
    }
}

export default connect(mapStateToProps)(LoginStats)
