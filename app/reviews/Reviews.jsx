import React from 'react';
var {connect} = require('react-redux');

import {getMediaContainerClass, getMedia} from 'app/common/Utils';
import ReviewList from 'ReviewList';
import AddReview from 'AddReview';
var reviewsActions = require('reviewsActions');
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
        var uid = props.location.query.user;
        var company = props.location.query.company;
        var myreviews = props.location.query.myreviews;

        //console.debug("uid--", uid);
        //console.debug("company--", company);

        if (company && company.length > 0) {
            console.debug("searchActions.setSearchText(company)", company);
            this.dispatch(searchActions.setSearchText(company));
        } else if (uid && uid.length > 0) {
            if (myreviews == 'true') {
                this.dispatch(searchActions.setMyReviews(true));
            }
            //console.debug("searchActions.setSearchText(uid)", uid);
            this.dispatch(searchActions.setSearchText(uid));
        }

        this.dispatch(reviewsActions.startAddReviewItems());
        this.dispatch(urlActions.setRedirectUrl('/reviews'));
    }

    componentDidMount() {
        this.dispatch(navActions.setNavPage("Reviews"));
        this.dispatch(searchActions.setMyReviews(false));
        this.loadData(this.props);
        this.dispatch(searchActions.setApprovalPendingItem(false));
        this.dispatch(searchActions.setSearchButton(false));
        //this.dispatch(searchActions.setLoadingStatus(true));
    }

    componentWillUnmount() {
        this.dispatch(searchActions.setSearchText(""));
    }

    componentWillReceiveProps(newProps) {
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
                <div className= {"columns " && this.state.container}>
                    {isLoggedIn && (
                        <div>
                            <AddReview/>
                        </div>
                    )}
                    <div>
                        <ReviewList showCompanyTitle={true}  reviewItems={this.props.reviewItems} auth={this.props.auth}/>
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
