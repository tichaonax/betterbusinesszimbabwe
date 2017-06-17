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
                    <td colSpan={4}>
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
            <div className=" container">
                <div className="row">
                    <table className="table table-striped table-bordered table-condensed">
                        <tbody>
                        <tr>
                            <th>Delete</th>
                            <th>ServiceItemID</th>
                            <th>ServiceId</th>
                            <th>Service Title</th>
                        </tr>
                        {this.renderServiceItems()}
                        </tbody>
                    </table>
                </div>
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