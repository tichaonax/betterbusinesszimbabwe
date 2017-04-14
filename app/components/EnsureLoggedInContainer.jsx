var React = require('react');
var {connect} = require('react-redux');
import * as actions from 'actions';

class EnsureLoggedInContainer extends React.Component {
    componentDidMount() {
        const {dispatch, currentURL, isLoggedIn, router} = this.props
        console.debug("currentURL", currentURL);
        if (!isLoggedIn) {
            // set the current url/path for future redirection (we use a Redux action)
            dispatch(actions.setRedirectUrl(currentURL));
            // then redirect to login page
            router.push("/login");
        }
    }

    render() {
        const { isLoggedIn } = this.props;

        if (isLoggedIn) {
            return this.props.children
        } else {
            return null
        }
    }
}

// Grab a reference to the current URL from `ownProps` to find the URL.

function mapStateToProps(state, ownProps) {
    return {
        isLoggedIn: state.auth.loggedIn,
        currentURL: ownProps.location.pathname
    }
}

export default connect(mapStateToProps)(EnsureLoggedInContainer)