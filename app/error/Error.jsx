import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

/**
 *
 * Takes an error object.
 * error = { errorCode: "error.code", errorMessage: "error.message" }
 */
export class Error extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      var {error, redirectUrl} = this.props;
      if ( error && error.errorMessage ) {
          //console.debug("error",error);
          return (
              <div className="bbz-general-warning">
                  { error.errorMessage }
              </div>
          );
      } else {
         return ( <div></div>);
      }
   }
}

function mapStateToProps(state, ownProps) {
    return {
        isLoggedIn: state.auth.loggedIn,
        redirectUrl: state.redirectUrl,
        error: state.error
    }
}

export default connect(mapStateToProps)(Error)
