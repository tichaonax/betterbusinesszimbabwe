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
                <div className="alert alert-warning" role="alert">
                    No Services Defined
                </div>
            )
        } else {
            return serviceItems.map((serviceItem) => {
                return (<ServiceItem key={serviceItem.serviceItemId} {...serviceItem} />);
            });
        }
    }

    render() {
        return (
            <div>
                {this.renderServiceItems()}
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