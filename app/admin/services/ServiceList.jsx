import React from 'react';
var {connect} = require('react-redux');
import ServiceItem from 'ServiceItem';


export class ServiceList extends React.Component {
    constructor(props) {
        super(props);
    }

    renderServiceItems = () => {
        var {serviceItems} = this.props;
        if (serviceItems.length === 0) {
            return (
                <tr>
                    <td colSpan={3}>
                    No Services Defined
                    </td>
                </tr>
            )
        } else {
            return serviceItems.map((serviceItem) => {
                return (
                    <ServiceItem key={serviceItem.serviceItemId} {...serviceItem} />);
            });
        }
    }

    render() {
        return (
            <div>
                <table className="common-table">
                    <tbody>
                    <tr>
                        <th>ServiceItemID</th>
                        <th>Service Title</th>
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
            serviceItems: state.serviceItems
        }
    }
)(ServiceList);