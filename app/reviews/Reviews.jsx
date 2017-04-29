import React from 'react';
var {connect} = require('react-redux');

import ReviewList from 'ReviewList'
//import AddReviewItem from 'AddReviewItem';
import {BbzSearch} from "BbzSearch";
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
        //clear searchText
        this.dispatch(searchActions.setSearchText(""));
    }

    componentWillReceiveProps(newProps) {
        this.loadData(newProps);
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
