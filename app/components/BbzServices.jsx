import React from 'react';
import {connect} from 'react-redux';

class BbzServices extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Template
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
       // isLoggedIn: state.auth.loggedIn,
       // redirectUrl: state.redirectUrl
    }
}

export default connect(mapStateToProps)(BbzServices)
