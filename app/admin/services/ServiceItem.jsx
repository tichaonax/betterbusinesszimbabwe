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
        dispatch(servicesActions.startDeleteServiceItem(serviceItemId));
    }

    render() {
        var {serviceItemId, serviceTitle, serviceDesc, createAt, updateAt, dispatch} = this.props;

        return (
            <tr>
                <td>
                    <form>
                        <input type="submit" value="&times;" onClick={this.handleOnButtonClick}/>
                        <input type="submit" value={serviceItemId} onClick={() => {

                            var data = {
                                serviceItemId,
                                serviceTitle,
                                serviceDesc
                            }

                            console.debug("ServiceItems Data:", data);

                            dispatch(servicesActions.setUpdateServiceOperation(data));
                        }}/>
                    </form>
                </td>
                <td>{serviceTitle}</td>
                <td>{serviceDesc}
                </td>
            </tr>
        );
    }
}

export default  connect()(ServiceItem);
