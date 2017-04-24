import React from 'react';
var {connect} = require('react-redux');
import CompanyItem from 'CompanyItem';


export class CompanyList extends React.Component {
    constructor(props) {
        super(props);
    }

    renderServiceItems = () => {
        var {companyItems} = this.props;
        if (companyItems.length === 0) {
            return (
                <tr>
                    <td colSpan={3}>
                    No Companies Defined
                    </td>
                </tr>
            )
        } else {
            return companyItems.map((companyItem) => {
                return (
                    <CompanyItem key={companyItem.companyItemId} {...companyItem} />);
            });
        }
    }

    render() {
        return (
            <div>
                <table className="common-table">
                    <tbody>
                    <tr>
                        <th>CompanyItemID</th>
                        <th>Company Name</th>
                        <th>Description</th>
                    </tr>

                    {this.renderServiceItems()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            companyItems: state.companyItems
        }
    }
)(CompanyList);