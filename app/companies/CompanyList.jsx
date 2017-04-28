import React from 'react';
var {connect} = require('react-redux');
import CompanyItem from 'CompanyItem';
var BbzAPI = require('BbzAPI');


export class CompanyList extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCompanyItems = () => {
        var {companyItems, showApprovalPending, searchText, auth} = this.props;

        var uid = 0;
        if (auth.loggedIn) {
            uid = auth.uid;
        }

        var filteredCompanyItems = BbzAPI.getFilteredCompanies(companyItems, showApprovalPending, searchText, uid);

        if (filteredCompanyItems.length === 0) {
            return (
                <tr>
                    <td colSpan={3}>
                    No Companies Defined
                    </td>
                </tr>
            )
        } else {
            return filteredCompanyItems.map((companyItem) => {
                return (
                    <CompanyItem key={companyItem.companyItemId} {...companyItem} />);
            });
        }
    }

    render() {
        var {userProfile, auth} = this.props;

        return (
            <div>
                <table className="common-table">
                    <tbody>
                    <tr>
                        <th>CompanyItemID</th>
                        <th>Reviews</th>
                        <th>Rating</th>
                        {auth.loggedIn && userProfile && userProfile.isAdmin && ( <th>Status</th>)}
                        <th>Company Name</th>
                        <th>Description</th>
                    </tr>
                    {this.renderCompanyItems()}
                    </tbody>
                </table>
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
            searchText: state.searchText
        }
    }
)(CompanyList);