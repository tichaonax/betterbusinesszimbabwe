import React from 'react';
var {connect} = require('react-redux');

import ReviewList from 'ReviewList'
//import AddReviewItem from 'AddReviewItem';
import {BbzSearch} from "BbzSearch";
var reviewsActions = require('reviewsActions');

export class Reviews extends React.Component {
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
                <BbzSearch/>
                <ReviewList/>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        isLoggedIn: state.auth.loggedIn,
        userProfile: state.userProfile,
        showApprovalPending: state.showApprovalPending,
        searchText: state.searchText
    }
})(Reviews);
