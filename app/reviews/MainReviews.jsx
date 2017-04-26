import React from 'react';
var {connect} = require('react-redux');

import ReviewList from 'ReviewList'
import AddReviewItem from 'AddReviewItem';
var reviewsActions = require('reviewsActions');

export class MainReviews extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    componentDidMount() {
        this.dispatch(reviewsActions.startAddReviewItems());
    }

    render() {
        return (
            <div className="container ">
                <ReviewList/>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        isLoggedIn: state.auth.loggedIn,
        userProfile: state.userProfile
    }
})(MainReviews);
