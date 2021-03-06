import React from 'react';
var {connect} = require('react-redux');

import {getMediaContainerClass, getMedia} from 'app/common/Utils';
import {COMPANIES_TITLE} from 'pageTitles';
import CompanyList from 'CompanyList'
import AddCompanyItem from 'AddCompanyItem';
var searchActions = require('searchActions');
var companiesSqliteActions = require('companiesSqliteActions');
var reviewsActions = require('reviewsActions');
var servicesActions = require('servicesActions');
var servicesSqliteActions = require('servicesSqliteActions');
var navActions = require('navActions');
var urlActions = require('urlActions');
var errorActions = require('errorActions');
var Loader = require('react-loader');

export class Companies extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
        this.state = {
            loaded: false,
            container: "container"
        }
    }

    loadData(props) {
        this.dispatch(errorActions.bbzClearError());

        var company = props.location.query.company;
        if (company && company.length > 0) {
            this.dispatch(searchActions.setSearchText(company));
        }

        this.dispatch(companiesSqliteActions.startAddCompanyItems());

       /* if (props.isLoggedIn) {
           // this.dispatch(servicesActions.addServiceItems(Categories.getServices()));
            //this.dispatch(servicesActions.startAddServiceItems());
            this.dispatch(servicesSqliteActions.startAddServiceItems());
        }*/
        this.dispatch(urlActions.setRedirectUrl('/companies'));
    }

    componentDidMount() {
        this.dispatch(navActions.setNavPage(COMPANIES_TITLE));
        this.dispatch(searchActions.setSearchButton(false));
        this.dispatch(searchActions.setApprovalPendingItem(false));
        this.loadData(this.props);
    }

    componentWillUnmount() {
        this.dispatch(searchActions.setSearchText(""));
    }

    componentWillReceiveProps(newProps) {
        var {isLoggedIn, userProfile} = newProps;
        if(isLoggedIn && userProfile && userProfile.isAdmin){
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
                    {isLoggedIn && (
                        <div>
                            <div>
                                <button id="update-panel" type="button" className="btn btn-info btn-lg btn-block"
                                        data-toggle="collapse" onClick={() => {
                                    this.dispatch(servicesSqliteActions.startAddServiceItems());
                                }}
                                        data-target="#update-panel-target">Click To Open/Close Company Panel
                                </button>
                            </div>
                            <div></div>
                            <div id="update-panel-target" className="collapse">
                                <AddCompanyItem/>
                            </div>
                        </div>
                    )}
                    <p/>
                    <div>
                        <CompanyList/>
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
        loading: state.loading,
        breakpoint: state.breakpoint
    }
})(Companies);
