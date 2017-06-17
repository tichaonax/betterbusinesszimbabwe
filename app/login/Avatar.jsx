import React from 'react';
import {connect} from 'react-redux';

export class Avator extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    render() {
        var {
            isLoggedIn,
            auth
        } = this.props;

       function renderAvator() {
            if (isLoggedIn) {
                if (auth.photoURL) {
                    return (
                        <div>
                            <img src={auth.photoURL} alt="Smiley face" height="43" width="43" className="avatar"/>
                            <p className="nav-profile__subtext">
                            </p>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <img src="images/no-image.png" alt="Smiley face" height="43" width="43" className="img-rounded"/>
                            <p className="nav-profile__subtext">
                            </p>
                        </div>
                    );
                }
            } else {
                return (
                    <div>
                    </div>
                )
            }
        }

        return(
          <div>
              {renderAvator()}
          </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        avator: state.auth.photoURL,
        isLoggedIn: state.auth.loggedIn,
        userProfile: state.userProfile,
        lastLogin: state.lastLogin,
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Avator)
