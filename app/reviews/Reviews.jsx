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
        this.dispatch(searchActions.setSearchButton(false));
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
                <div className="columns medium-centered">
                    <div className="container">
                        {/*<div className="bbz-general">
                            <BbzSearch/>
                        </div>*/}
                        {isLoggedIn && (

                            <div className="bbz-general">
                                <AddReview/>
                            </div>)}
                    </div>
                    <div className="bbz-general">
                        <ReviewList/>
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
        searchText: state.searchText
    }
})(Reviews);
