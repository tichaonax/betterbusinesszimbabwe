import React from 'react';
var {connect} = require('react-redux');

import {getMediaContainerClass} from 'app/common/Utils';
import {REVIEWS_TITLE} from 'pageTitles';
import ReviewList from 'ReviewList';
import AddReview from 'AddReview';
import {Link} from 'react-router';
var reviewsSqliteActions = require('reviewsSqliteActions');
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
            container: "container"
        }
    }

    loadData(props) {
        var userId = props.location.query.user;
        var company = props.location.query.company;
        var myreviews = props.location.query.myreviews;

        console.log("reviews->userId", userId);
        if (company && company.length > 0) {
            console.debug("searchActions.setSearchText(company)", company);
            this.dispatch(searchActions.setSearchText(company));
        } else if (userId && userId.length > 0) {
            if (myreviews == 'true') {
                this.dispatch(searchActions.setMyReviews(true));
            }
            this.dispatch(searchActions.setSearchText(userId));
        }

        this.dispatch(reviewsSqliteActions.startAddReviewItems());
        this.dispatch(urlActions.setRedirectUrl('/reviews'));
    }

    componentDidMount() {
        this.dispatch(navActions.setNavPage(REVIEWS_TITLE));
        this.dispatch(searchActions.setMyReviews(false));
        this.loadData(this.props);
        this.dispatch(searchActions.setApprovalPendingItem(false));
        this.dispatch(searchActions.setSearchButton(false));
    }

    componentWillUnmount() {
        this.dispatch(searchActions.setSearchText(""));
    }

    componentWillReceiveProps(newProps) {
        var userId = newProps.location.query.user;
        var myreviews = newProps.location.query.myreviews;

        console.log("reviews->userId", userId);
        if (userId && userId.length > 0) {
            if (myreviews == 'true') {
                this.dispatch(searchActions.setMyReviews(true));
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
                            <div>
                                <button id="update-panel" type="button" className="btn btn-info btn-lg btn-block"
                                        data-toggle="collapse"
                                        data-target="#update-panel-target">Review Panel
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
