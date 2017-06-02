import React from 'react';
var {connect} = require('react-redux');
import ReactList from 'react-list';
import CompanyItem from 'CompanyItem';
var BbzAPI = require('BbzAPI');

export class CompanyList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            companies: []
        }
        this.renderCompanyItem = this.renderCompanyItem.bind(this);
    }

    componentWillReceiveProps(newProps) {
       /* if (this.props.searchText != newProps.searchText || this.props.companyItems != newProps.companyItems) {

            var {companyItems, searchOptions, searchText, auth} = newProps;

            var uid = 0;
            if (auth.loggedIn) {
                uid = auth.uid;
            }

            var filteredCompanyItems = BbzAPI.getFilteredCompanies(companyItems, searchOptions.pending, searchText, uid);


            if (filteredCompanyItems.length === 0) {
                this.setState({rowCount: filteredCompanyItems.length, companies: []}, () => {
                });

            } else {
                const companies = filteredCompanyItems.map((companyItem) => {
                    return (
                        <CompanyItem key={companyItem.companyItemId} {...companyItem} deleteCompany={this.refs.deleteCompany}
                                     updateCompany={this.refs.updateCompany}/>);
                });

                this.setState({rowCount: filteredCompanyItems.length, companies: companies}, () => {
                });
            }*/

            var filteredCompanyItems;
            var uid = 0;

            if (this.props.companyItems != newProps.companyItems || this.props.searchOptions != newProps.searchOptions ) {
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

            console.debug("filteredCompanyItems",filteredCompanyItems);
            this.setState({
                rowCount: filteredCompanyItems.length,
                companies: filteredCompanyItems
            });
        }


    renderCompanyItem=(index, key)=> {
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
            <div className="columns container">
                <h4 className="text-center">{this.state.companies.length} Companies...</h4>
                <div style={{overflow: 'auto', maxHeight: 1000, marginLeft: '10px', marginRight: '10px'}}>
                    <ReactList
                        itemRenderer={this.renderCompanyItem}
                        length={this.state.companies.length}
                    />
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
            serviceItems:state.serviceItems
        }
    }
)(CompanyList);