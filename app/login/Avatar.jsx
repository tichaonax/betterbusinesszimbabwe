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
                            <img src={auth.photoURL} alt="Smiley face" height="44" width="44" className="avatar"/>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <img src="images/no-image.png" alt="Smiley face" height="44" width="44" className="img-rounded"/>
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
