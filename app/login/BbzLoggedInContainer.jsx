var React = require('react');
var {connect} = require('react-redux');
var urlActions = require('urlActions');

export class BbzLoggedInContainer extends React.Component {
    componentDidMount() {
        const {dispatch, currentURL, isLoggedIn, router} = this.props
        const redirectUrl = currentURL.pathname + currentURL.search;
        //console.debug("BbzLoggedInContainer redirectUrl", redirectUrl);
        if (!isLoggedIn) {
            // set the current url/path for future redirection (we use a Redux action)
            dispatch(urlActions.setRedirectUrl(redirectUrl));
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
        currentURL: ownProps.location,
        error: state.error
    }
}

export default connect(mapStateToProps)(BbzLoggedInContainer)