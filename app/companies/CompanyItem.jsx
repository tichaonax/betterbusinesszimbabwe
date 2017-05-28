import React from 'react';
var {connect} = require('react-redux');
import {Link} from 'react-router';
import {findDOMNode} from 'react-dom'
import ReactTooltip from 'react-tooltip'
var Rate = require('rc-rate');
import Linkify from 'react-linkify';
var companiesActions = require('companiesActions');
var urlActions = require('urlActions');
var errorActions = require('errorActions');

export class CompanyItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    itemSizeGetter = (companyDesc) => {
        var divHeight = 30;
        if (companyDesc.length > 50) {
            divHeight = 10 + Math.round((companyDesc.length / 60)) * 30
        }
        return divHeight;
    }

    render() {
        var {serviceItemId, serviceCategory, uid, userProfile, companyItemId, rating, isApproved, reviewCount, companyTitle, companyDesc, createAt, updateAt, auth, deleteCompany, updateCompany} = this.props;

        var divHeight = "50px";
        if (companyDesc) {
            divHeight = this.itemSizeGetter(companyDesc) + 'px';
        }

        var approveImageSource = "images/like-64.png";
        var approveMessage ="Approval Pending";

        if (isApproved) {
            approveImageSource = "images/check-blue-64.png";
            approveMessage ="Approved";
        }

        const companyId = createAt;

        return (
            <div className="row align-top" style={{height: divHeight}}>
                <div className="column">
                    <span className="bbz-review-span">Company:</span>
                    <span>&nbsp;</span>
                    {companyTitle}
                </div>
                <div className="column">
                    <span className="bbz-review-span">Reviews:</span>
                    <span>&nbsp;</span>
                    <Link to={`/reviews?company=${companyItemId}`} activeClassName="active"
                          activeStyle={{fontWeight: 'bold'}}>{reviewCount}</Link>
                </div>
                <div className="column">
                    <span className="label bbz-review-span">Rating:</span>
                    <span>&nbsp;</span>
                    <Rate
                        defaultValue={rating}
                        style={{fontSize: 15}}
                        allowHalf
                        value={rating}
                    />
                </div>
                <div className="column">
                    <span className="bbz-review-span">ID:</span>
                    <span>&nbsp;</span>{companyId}</div>
                {auth.loggedIn && (
                    <form>
                        <div className="column">
                            {auth.loggedIn && (
                                <div className="column">
                                    <span className="bbz-review-span">Delete:</span>
                                    <span>&nbsp;</span>
                                    <img className="bbz-general-pointer" type="image" value="submit" height="30"
                                         width="30" src="images/delete-blue-64.png"
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
                                         }}/>
                                </div>)}
                            {auth.loggedIn && (
                                <div className="column">
                                    <span className="bbz-review-span">Update:</span>
                                    <span>&nbsp;</span>
                                    <img className="bbz-general-pointer" type="image" value="submit" height="30"
                                         width="30" src="images/update-blue-64.png"
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

                                                // console.debug("CompanyItems Data:", data);

                                                 this.dispatch(companiesActions.setUpdateCompanyOperation(data));
                                             }
                                             else {
                                                 var error = {};
                                                 error.errorMessage = "You must be the creater or admin to update this company information";
                                                 this.dispatch(errorActions.bbzReportError(error));
                                             }
                                         }}/>
                                </div>)}
                        </div>
                    </form>)}
                {auth.loggedIn && userProfile && userProfile.isAdmin && (
                    <div className="column">
                        <span className="bbz-review-span">{approveMessage}:</span>
                        <span>&nbsp;</span>
                        <img className="bbz-general-pointer" type="image" value="submit" height="30" width="30"
                             src={approveImageSource}
                             onClick={() => {
                                 this.dispatch(errorActions.bbzClearError());
                                 if (userProfile.isAdmin) {
                                     this.dispatch(companiesActions.startApproveUpdateCompanyItem(companyItemId, !isApproved));
                                 } else {
                                     var error = {};
                                     error.errorMessage = "You must be admin to approve";
                                     this.dispatch(errorActions.bbzReportError(error));
                                 }
                             }}/>
                    </div>
                )}
                {auth.loggedIn && userProfile && userProfile.isAdmin && (
                    <div className="column">
                        <Link to={`/users?uid=${uid}`} activeClassName="active"
                              activeStyle={{fontWeight: 'bold'}}>Reviewer</Link>
                    </div>)}
                <div className="column">
                    <span className="bbz-review-span">Servcie:</span>
                    <span>&nbsp;</span>
                    {serviceCategory}
                </div>
                <div className="column">
                    <span className="bbz-review-span">Description:</span>
                    <span>&nbsp;</span>
                    <Linkify properties={{target: '_blank', style: {color: 'blue'}}}>
                        {companyDesc}
                    </Linkify>
                </div>
                <div className="column">
                    <Link to={`/addreview?company=${companyItemId}`} activeClassName="active"
                          activeStyle={{fontWeight: 'bold'}}>Add Review</Link>
                </div>
                <div>
                    <hr/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        auth: state.auth,
        userProfile: state.userProfile,
    }
}
export default  connect(mapStateToProps)(CompanyItem);
