import React from 'react';
var {connect} = require('react-redux');

import {getMediaContainerClass} from 'app/common/Utils';
import {REVIEWS_TITLE} from 'pageTitles';
import ReviewList from 'ReviewList';
import AddReview from 'AddReview';
import {Link, browserHistory, hashHistory} from 'react-router';
var reviewsSqliteActions = require('reviewsSqliteActions');
var errorActions = require('errorActions');
var searchActions = require('searchActions');
var navActions = require('navActions');
var urlActions = require('urlActions');
var Loader = require('react-loader');

export class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
        this.state = {
            loaded: false,
            container: "container",
            userReviews: false
        }
    }

    onGoBack = (evt) => {
        this.dispatch(errorActions.bbzClearError());
        this.setState({userReviews: false});
        this.dispatch(searchActions.setSearchText(""));
        this.dispatch(reviewsSqliteActions.startAddReviewItems());
        hashHistory.push('/reviews');
    }

    loadData(props) {
        var {searchText} = this.props;
        var userId = parseInt(props.location.query.user);
        var company = props.location.query.company;
        var userviews = props.location.query.userviews;

        if (company && company.length > 0) {
            console.debug("searchActions.setSearchText(company)", company);
            this.dispatch(searchActions.setSearchText(company));
        } else if (userId > 0) {
            if (userviews == 'true') {
                this.dispatch(searchActions.setUserReviews(true, userId));
            }else {
                this.dispatch(searchActions.setUserReviews(false, 0));
            }
            this.dispatch(searchActions.setSearchText(userId));
        }

        this.dispatch(reviewsSqliteActions.startAddReviewItems(searchText));
        this.dispatch(urlActions.setRedirectUrl('/reviews'));
    }

    componentDidMount() {
        this.dispatch(navActions.setNavPage(REVIEWS_TITLE));
        this.dispatch(searchActions.setUserReviews(false, 0));
        this.loadData(this.props);
        this.dispatch(searchActions.setApprovalPendingItem(false));
        this.dispatch(searchActions.setSearchButton(false));
    }

    componentWillUnmount() {
        this.dispatch(searchActions.setSearchText(""));
    }

    componentWillReceiveProps(newProps) {
        var userId = parseInt(newProps.location.query.user);
        var userviews = newProps.location.query.userviews;

        if (this.props.searchText != newProps.searchText) {
            console.log("Search Text Changed");
            this.dispatch(reviewsSqliteActions.startAddReviewItems(newProps.searchText));
        }

        if (userId > 0) {
            this.setState({userReviews: true});
            if (userviews == 'true') {
                this.dispatch(searchActions.setUserReviews(true, userId));
            } else {
                this.dispatch(searchActions.setUserReviews(false, 0));
            }
            this.dispatch(searchActions.setSearchText(userId));
        }

        var {isLoggedIn, userProfile} = newProps;

        if (isLoggedIn && userProfile && userProfile.isAdmin) {
            this.dispatch(searchActions.setApprovalPendingItem(true));
        }
        this.setState({
            loaded: !newProps.loading.loaded
        });

        let {breakpoint} = this.props;

        if (breakpoint) {
            this.setState({
                container: getMediaContainerClass(breakpoint)
            });
        }
    }

    render() {
        var {isLoggedIn} = this.props;
        return (
            <div className="row">
                <div className={"columns " && this.state.container}>
                    {!isLoggedIn && (
                        <Link to="/addreview" activeClassName="active" onClick={() => {
                            this.dispatch(urlActions.setRedirectUrl("reviews"));
                        }}
                              activeStyle={{fontWeight: 'bold'}}>Add Review</Link>)}
                    {isLoggedIn && (
                        <div>
                            {this.state.userReviews && (
                                <button ref="cancel" type="button" className="btn btn-primary" value="Back"
                                        onClick={
                                            () => {
                                                this.onGoBack(event);
                                            }}>
                                    Back
                                </button>)}
                            <div>
                                <button id="update-panel" type="button" className="btn btn-info btn-lg btn-block"
                                        data-toggle="collapse"
                                        data-target="#update-panel-target">Click To Open/Close Review Panel
                                </button>
                            </div>
                            <div></div>
                            <div id="update-panel-target" className="collapse">
                                <AddReview/>
                            </div>
                        </div>
                    )}
                    <p/>
                    <div>
                        <ReviewList showCompanyTitle={true} reviewItems={this.props.reviewItems}
                                    auth={this.props.auth}/>
                    </div>
                    <Loader loaded={this.state.loaded}>
                    </Loader>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        isLoggedIn: state.auth.loggedIn,
        userProfile: state.userProfile,
        searchText: state.searchText,
        auth: state.auth,
        reviewItems: state.reviewItems,
        loading: state.loading,
        breakpoint: state.breakpoint
    }
})(Reviews);
