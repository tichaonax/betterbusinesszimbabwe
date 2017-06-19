import React from 'react';
import ReactList from 'react-list';
var {connect} = require('react-redux');
import ServiceItem from 'ServiceItem';
var BbzAPI = require('BbzAPI');


export class ServiceList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            services: []
        }
    }

    componentWillReceiveProps(newProps) {
        var filteredServiceItems = BbzAPI.getFilteredServices(newProps.serviceItems, newProps.searchText);

        this.setState({
            rowCount: filteredServiceItems.length,
            services: filteredServiceItems
        });
    }

    itemSizeGetter = (index) => {
        var serviceItem = this.state.reviews[index];
        var divHeight = 30;
        if (serviceItem.serviceTitle.length > 50) {
            divHeight = 10 + Math.round((serviceItem.serviceTitle.length / 60)) * 30
        }
        return divHeight;
    }

    renderServiceItem = (index, key) => {
        //the idea is you want to construct the row data on the fly from the services
        //this will result is less memory used if you were to store all that rendering data with the services
        var serviceItem = this.state.services[index];
        var row = <ServiceItem key={serviceItem.serviceItemId} {...serviceItem}/>;

        return <div key={key}>{row}</div>;
    }

    render() {
        return (
            <div className="columns container">
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="text-center">{this.state.services.length} Services...</h4>
                    </div>
                </div>
                <div className="row">
                    <div style={{overflow: 'auto', maxHeight: 500, marginLeft: '2px', marginRight: '20px'}}>
                        <ReactList
                            itemRenderer={this.renderServiceItem}
                            length={this.state.services.length}
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
            serviceItems: state.serviceItems,
            searchText: state.searchText,
        }
    }
)(ServiceList);