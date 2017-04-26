import React from 'react';
var {connect} = require('react-redux');
var companiesActions = require('companiesActions');
var errorActions = require('errorActions');

export class CompanyItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    render() {
        var {uid, userProfile, companyItemId, companyTitle, companyDesc, createAt, updateAt, auth} = this.props;

        return (
            <tr>
                <td>
                    <form>
                        <input type="submit" value="&times;" onClick={() => {
                            if (userProfile.isAdmin) {
                                this.dispatch(companiesActions.startDeleteCompanyItem(companyItemId));
                            } else {
                                var error = {};
                                error.errorMessage = "You must be admin to delete this company information";
                                this.dispatch(errorActions.bbzReportError(error));
                            }
                        }}/>

                        <input type="submit" value={companyItemId} onClick={() => {

                            if (auth.uid === uid || userProfile.isAdmin) {
                                var data = {
                                    companyItemId,
                                    companyTitle,
                                    companyDesc
                                }

                                console.debug("CompanyItems Data:", data);

                                this.dispatch(companiesActions.setUpdateCompanyOperation(data));
                            }
                            else {
                                var error = {};
                                error.errorMessage = "You must be the creater or admin to update this company information";
                                this.dispatch(errorActions.bbzReportError(error));
                            }
                        }}/>
                    </form>
                </td>
                <td>{companyTitle}</td>
                <td>{companyDesc}
                </td>
            </tr>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        auth: state.auth,
        userProfile: state.userProfile
    }
}
export default  connect(mapStateToProps)(CompanyItem);
