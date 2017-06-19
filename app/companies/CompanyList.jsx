import React from 'react';
var {connect} = require('react-redux');
import {getMediaContainerClass, getMedia} from 'app/common/Utils';
import ReactList from 'react-list';
import CompanyItem from 'CompanyItem';
var BbzAPI = require('BbzAPI');

export class CompanyList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            companies: [],
            container: "container"
        }
    }

    componentWillReceiveProps(newProps) {
        var filteredCompanyItems;
        var uid = 0;

        if (this.props.companyItems != newProps.companyItems || this.props.searchOptions != newProps.searchOptions) {
            var {companyItems, searchOptions, searchText, auth} = newProps;

            if (auth.loggedIn) {
                uid = auth.uid;
            }
            filteredCompanyItems = BbzAPI.getFilteredCompanies(companyItems, searchOptions.pending, searchText, uid);
        } else {
            var {companyItems, searchOptions, searchText, auth} = this.props;

            if (auth.loggedIn) {
                uid = auth.uid;
            }
            filteredCompanyItems = BbzAPI.getFilteredCompanies(companyItems, searchOptions.pending, searchText, uid);
        }

        this.setState({
            rowCount: filteredCompanyItems.length,
            companies: filteredCompanyItems
        });

        let {breakpoint} = this.props;

        if (breakpoint) {
            this.setState({
                container: getMediaContainerClass(breakpoint)
            });
        }
    }

    itemSizeGetter = (index) => {
        var companyItem = this.state.companies[index];
        var divHeight = 30;
        if (companyItem.companyDesc.length > 50) {
            divHeight = 10 + Math.round((companyItem.companyDesc.length / 60)) * 30
        }
        return divHeight;
    }

    renderCompanyItem = (index, key) => {
        //the idea is you want to construct the row data on the fly from the companies list
        //this will result is less memory used than if you were to store all that rendering data with the companies object
        var companyItem = this.state.companies[index];
        var row = <CompanyItem key={companyItem.companyItemId} {...companyItem}
                               deleteReview={this.refs.deleteCompany}
                               updateReview={this.refs.updateCompany}
                               showCompanyTitle={this.state.showCompanyTitle}/>;

        return <div key={key}>{row}</div>;
    }

    render() {
        return (
            <div className={"columns " && this.state.container}>
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="text-center">{this.state.companies.length} Companies...</h4>
                    </div>
                </div>
                <div className="row">
                    <div style={{overflow: 'auto', maxHeight: 1000, marginLeft: '10px', marginRight: '10px'}}>
                        <ReactList
                            itemRenderer={this.renderCompanyItem}
                            length={this.state.companies.length}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            auth: state.auth,
            userProfile: state.userProfile,
            companyItems: state.companyItems,
            searchOptions: state.searchOptions,
            searchText: state.searchText,
            serviceItems: state.serviceItems,
            breakpoint: state.breakpoint
        }
    }
)(CompanyList);