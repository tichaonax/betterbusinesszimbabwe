import React from 'react';
var {connect} = require('react-redux');

import ReviewList from 'ReviewList'
import AddReview from 'AddReview';
import BbzSearch from "BbzSearch";
var reviewsActions = require('reviewsActions');
var searchActions = require('searchActions');

export class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    loadData(props) {
        this.dispatch(reviewsActions.startAddReviewItems());
        var company = props.location.query.company;
        if (company && company.length > 0) {
            this.dispatch(searchActions.setSearchText(company));
        }
    }

    componentDidMount() {
        this.loadData(this.props);
    }

    componentWillUnmount(){
        this.dispatch(searchActions.setSearchText(""));
    }

    componentWillReceiveProps(newProps) {
        this.loadData(newProps);
    }

    render() {
        var {isLoggedIn} = this.props;
        return (
            <div className="row">
                <div className="columns medium-centered small-10 medium-6 large-4">
                    <div className="container">
                        <div>
                            <BbzSearch/>
                            {isLoggedIn && (<AddReview/>)}
                            <ReviewList/>
                        </div>
                    </div>
                </div>
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
