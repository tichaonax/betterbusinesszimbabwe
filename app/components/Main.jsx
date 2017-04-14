import React from 'react';
import {connect} from 'react-redux';
import Nav from 'Nav';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidUpdate(prevProps) {
        const { dispatch, redirectUrl } = this.props
        const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn
        const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn

        if (isLoggingIn) {
            console.debug("redirectUrl:",redirectUrl);
            //dispatch(actions.navigateTo(redirectUrl));
            this.props.router.push(redirectUrl);
        } else if (isLoggingOut) {
            // do any kind of cleanup or post-logout redirection here
        }
    }

    render() {
        console.debug("Main");
        return (
            <div>
                <div>
                    <Nav/>
                    <div className="row">
                        <div className="columns medium-6 large-4 small-centered">
                            {this.props.children}
                        </div>
                    </div>
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




