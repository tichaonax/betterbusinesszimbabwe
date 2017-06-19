import React from 'react';
var {connect} = require('react-redux');

import {getMediaContainerClass, getMedia} from 'app/common/Utils';
import CompanyList from 'CompanyList'
import AddCompanyItem from 'AddCompanyItem';
var searchActions = require('searchActions');
var companiesActions = require('companiesActions');
var reviewsActions = require('reviewsActions');
var servicesActions = require('servicesActions');
var urlActions = require('urlActions');
var errorActions = require('errorActions');
var Loader = require('react-loader');
import Categories from 'serviceCategories';

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

        this.dispatch(companiesActions.startAddCompanyItems());

        if (props.isLoggedIn) {
            this.dispatch(servicesActions.addServiceItems(Categories.getServices()));
        }
        this.dispatch(urlActions.setRedirectUrl('/companies'));
    }

    componentDidMount() {
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
                           <AddCompanyItem/>
                        </div>
                    )}
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
