import React from 'react';
var {connect} = require('react-redux');
var servicesSqliteActions = require('servicesSqliteActions');
var errorActions = require('errorActions');
import {openUpdatePanel} from 'app/common/Utils';

export class ServiceItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    render() {
        var {userProfile, serviceItemId, serviceId, serviceCategory, createAt, updateAt, auth} = this.props;
        //TODO get the userId from userProfile
        var userId = 3;
        return (
            <div className="col-sm-12">
                <form>
                    <div className="review-block">
                        <div className="row">
                            {auth.loggedIn && (
                                <div className="col-sm-3">
                                    <input type="button" value="&times;" onClick={() => {
                                        if (userProfile.isSuperUser) {
                                            this.dispatch(servicesSqliteActions.startDeleteServiceItem(serviceId, userId));
                                        } else {
                                            openUpdatePanel();
                                            var error = {};
                                            error.errorMessage = "You must be Super User to delete this service information";
                                            this.dispatch(errorActions.bbzReportError(error));
                                        }
                                    }}/>
                                    <span>&nbsp;&nbsp;</span>
                                    <span className="label bbz-review-span">ID:</span>
                                    <span>&nbsp;&nbsp;</span>
                                    {serviceId}
                                </div>)}
                            <div className="col-sm-4">
                                <div>
                                    <input type="button" value="Update" onClick={() => {
                                        openUpdatePanel();
                                        if (userProfile.isAdmin) {
                                            var data = {
                                                serviceItemId,
                                                serviceId,
                                                serviceCategory
                                            }

                                            console.debug("ServiceItems Data:", data);

                                            this.dispatch(servicesSqliteActions.setUpdateServiceOperation(data));
                                            this.dispatch(errorActions.bbzClearError());
                                        } else {
                                            var error = {};
                                            error.errorMessage = "You must be admin to update this service information";
                                            this.dispatch(errorActions.bbzReportError(error));
                                        }

                                        window.scrollTo(0, 0);
                                    }}/>
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <div className="review-block-title">
                                    {serviceCategory}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
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