import React from 'react';
var {connect} = require('react-redux');
import {Link} from 'react-router';
import {findDOMNode} from 'react-dom'
import ReactTooltip from 'react-tooltip'
var Rate = require('rc-rate');
import Linkify from 'react-linkify';
var companiesActions = require('companiesActions');
var errorActions = require('errorActions');

export class CompanyItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }


    render() {
        var {serviceItemId, serviceCategory, displayName, email,uid, userProfile, companyItemId, rating, isApproved, reviewCount, companyTitle, companyDesc, createAt, updateAt, auth, deleteCompany, updateCompany} = this.props;

        var reviewer = displayName;

        if (displayName) {
            reviewer = displayName.split('@')[0];
        }
        var approveImageSource = "images/like-64.png";

        if (isApproved) {
            approveImageSource = "images/check-blue-64.png"
        }

        const companyId = createAt;

        return (
            <tr>
                <td>{companyId}</td>
                {auth.loggedIn && (
                    <td>
                        <form>
                            {auth.loggedIn && (
                                <img type="image" value="submit" height="30" width="30" src="images/delete-blue-64.png"
                                     alt="Delete Company"
                                     onMouseOver={() => {
                                         ReactTooltip.show(findDOMNode(deleteCompany));
                                     }}
                                     onMouseOut={() => {
                                         ReactTooltip.hide(findDOMNode(deleteCompany));
                                     }}
                                     onClick={() => {
                                         this.dispatch(errorActions.bbzClearError());
                                         if (userProfile.isAdmin) {
                                             this.dispatch(companiesActions.startDeleteCompanyItem(companyItemId));
                                         } else {
                                             var error = {};
                                             error.errorMessage = "You must be admin to delete this company information";
                                             this.dispatch(errorActions.bbzReportError(error));
                                         }
                                     }}/>)}

                            {auth.loggedIn && (
                                <img type="image" value="submit" height="30" width="30" src="images/update-blue-64.png"
                                     alt="Update Company"
                                     onMouseOver={() => {
                                         ReactTooltip.show(findDOMNode(updateCompany));
                                     }}
                                     onMouseOut={() => {
                                         ReactTooltip.hide(findDOMNode(updateCompany));
                                     }}
                                     onClick={() => {
                                         this.dispatch(errorActions.bbzClearError());
                                         if (auth.uid === uid || userProfile.isAdmin) {
                                             var data = {
                                                 uid,
                                                 companyItemId,
                                                 companyTitle,
                                                 companyDesc,
                                                 rating,
                                                 selectedServiceItemId: serviceItemId,
                                                 serviceCategory
                                             }

                                             console.debug("CompanyItems Data:", data);

                                             this.dispatch(companiesActions.setUpdateCompanyOperation(data));
                                         }
                                         else {
                                             var error = {};
                                             error.errorMessage = "You must be the creater or admin to update this company information";
                                             this.dispatch(errorActions.bbzReportError(error));
                                         }
                                     }}/>)}
                        </form>
                    </td>)}
                <td>
                    <Link to={`/reviews?company=${companyItemId}`} activeClassName="active"
                          activeStyle={{fontWeight: 'bold'}}>{reviewCount}</Link>
                </td>
                <td>
                    <Rate
                        defaultValue={rating}
                        style={{fontSize: 15}}
                        allowHalf
                        value={rating}
                    />
                </td>
                {auth.loggedIn && userProfile && userProfile.isAdmin && (
                    <td>
                        <img type="image" value="submit" height="30" width="30" src={approveImageSource}
                             onClick={() => {
                                 this.dispatch(errorActions.bbzClearError());
                                 if (userProfile.isAdmin) {
                                     this.dispatch(companiesActions.startApproveUpdateCompanyItem(companyItemId,!isApproved));
                                 } else {
                                     var error = {};
                                     error.errorMessage = "You must be admin to approve";
                                     this.dispatch(errorActions.bbzReportError(error));
                                 }
                             }}/>
                    </td>
                )}
                <td>{companyTitle}</td>
                {auth.loggedIn && userProfile && userProfile.isAdmin && (
                    <td>{reviewer}</td>)}
                {auth.loggedIn && userProfile && userProfile.isAdmin && (
                    <td>
                        {email}
                    </td>)}
                <td>
                    {serviceCategory}
                </td>
                <td>
                    <Linkify properties={{target: '_blank', style: {color: 'blue'}}}>
                        {companyDesc}
                    </Linkify>
                </td>
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
export default  connect(mapStateToProps)(CompanyItem);
