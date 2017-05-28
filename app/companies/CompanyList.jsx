import React from 'react';
var {connect} = require('react-redux');
import ReactList from 'react-list';
import ReactTooltip from 'react-tooltip'
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

    renderCompanyItem=(index, key)=> {
        return <div key={key}>{this.state.companies[index]}</div>;
    }

    componentWillReceiveProps(newProps) {
        if (this.props.searchText != newProps.searchText || this.props.companyItems != newProps.companyItems) {

            var {companyItems, showApprovalPending, searchText, auth} = newProps;

            var uid = 0;
            if (auth.loggedIn) {
                uid = auth.uid;
            }

            var filteredCompanyItems = BbzAPI.getFilteredCompanies(companyItems, showApprovalPending, searchText, uid);


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
            }
        }
    }


    render() {
        return (
            <div>
                <ReactTooltip />

                <div style={{overflow: 'auto', maxHeight: 350, marginTop: '20px'}}>
                    <ReactList
                        itemRenderer={this.renderCompanyItem}
                        length={this.state.companies.length}
                        type='variable'
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
            showApprovalPending: state.showApprovalPending,
            searchText: state.searchText,
            serviceItems:state.serviceItems
        }
    }
)(CompanyList);