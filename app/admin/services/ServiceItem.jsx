import React from 'react';
var {connect} = require('react-redux');
var servicesActions = require('servicesActions');
var errorActions = require('errorActions');

export class ServiceItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    render() {
        var {userProfile, serviceItemId, serviceId, serviceTitle, createAt, updateAt} = this.props;
        return (
            <tr>
                <td>
                    <div className="form-group">
                        <input type="submit" value="&times;" onClick={() => {
                            if (userProfile.isSuperUser) {
                                this.dispatch(servicesActions.startDeleteServiceItem(serviceItemId));
                            } else {
                                var error = {};
                                error.errorMessage = "You must be Super User to delete this service information";
                                this.dispatch(errorActions.bbzReportError(error));
                            }
                        }}/>
                    </div>
                </td>
                <td>
                    <div className="form-group">
                        <input type="submit" value={serviceItemId} onClick={() => {
                            if (userProfile.isAdmin) {
                                var data = {
                                    serviceItemId,
                                    serviceId,
                                    serviceTitle
                                }

                                console.debug("ServiceItems Data:", data);

                                this.dispatch(servicesActions.setUpdateServiceOperation(data));
                            } else {
                                var error = {};
                                error.errorMessage = "You must be admin to update this service information";
                                this.dispatch(errorActions.bbzReportError(error));
                            }

                            window.scrollTo(0,0);
                        }}/>
                    </div>
                </td>
                <td>{serviceId}</td>
                <td>{serviceTitle}</td>
            </tr>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        userProfile: state.userProfile
    }
}
export default connect(mapStateToProps)(ServiceItem);