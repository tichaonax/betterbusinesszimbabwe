import React from 'react';
var {connect} = require('react-redux');
var servicesActions = require('servicesActions');

export class ServiceItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnButtonClick = this.handleOnButtonClick.bind(this);
    }

    handleOnButtonClick = (e) => {
        e.preventDefault();
        var {serviceItemId, dispatch} = this.props;
        console.debug("serviceItemId", serviceItemId);
        dispatch(servicesActions.startDeleteServiceItem(serviceItemId));
    }

    render() {
        var {serviceItemId, serviceTitle, serviceDesc, createAt, updateAt, dispatch} = this.props;

        return (
              <tr>
                  <td>{serviceTitle}</td>
                  <td>{serviceDesc} <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.handleOnButtonClick}>
                      <span aria-hidden="true">&times;</span>
                  </button>
                  </td>
              </tr>
        );
    }
}

export default  connect()(ServiceItem);
