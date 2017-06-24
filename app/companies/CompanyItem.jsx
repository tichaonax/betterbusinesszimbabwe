import React from 'react';
var {connect} = require('react-redux');
import {Link} from 'react-router';
var Rate = require('rc-rate');
import Linkify from 'react-linkify';
import {openUpdatePanel} from 'app/common/Utils';
var companiesActions = require('companiesActions');
var urlActions = require('urlActions');
var errorActions = require('errorActions');

export class CompanyItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    render() {
        var {serviceItemId, serviceCategory, uid,
            loggedInUser, companyItemId, rating,
            isApproved, reviewCount, companyTitle,
            companyDesc, createAt, updateAt, auth,
            deleteCompany, updateCompany,} = this.props;

        var approveImageSource = "images/like-64.png";
        var approveMessage = "Approval Pending";

        if (isApproved) {
            approveImageSource = "images/check-blue-64.png";
            approveMessage = "Approved";
        }

        const companyId = createAt;

        var loginClass = "col-sm-9";
        if (auth.loggedIn) {
            loginClass = "col-sm-6";
        }

        return (

            <div className="col-sm-12">
                <form>
                    <div className="review-block">
                        <div className="row">
                            {auth.loggedIn && (
                            <div className="col-sm-3">
                                            <div>
                                                <span className="bbz-review-span">Delete:</span>
                                                <span>&nbsp;</span>
                                                <img className="bbz-general-pointer" type="image" value="submit"
                                                     height="15"
                                                     width="15" src="images/delete-blue-x-64.png"
                                                     alt="Delete Company"
                                                     onClick={() => {
                                                         this.dispatch(errorActions.bbzClearError());
                                                         if (loggedInUser.isAdmin) {
                                                             this.dispatch(companiesActions.startDeleteCompanyItem(companyItemId));
                                                         } else {
                                                             openUpdatePanel();
                                                             var error = {};
                                                             error.errorMessage = "You must be admin to delete this company information";
                                                             this.dispatch(errorActions.bbzReportError(error));
                                                             window.scrollTo(0, 0);
                                                         }
                                                     }}/>
                                            </div>
                                            <div>
                                                <span className="bbz-review-span">Update:</span>
                                                <span>&nbsp;</span>
                                                <img className="bbz-general-pointer" type="image" value="submit"
                                                     height="20"
                                                     width="20" src="images/update-blue-64.png"
                                                     alt="Update Company"
                                                     onClick={() => {
                                                         openUpdatePanel();
                                                         this.dispatch(errorActions.bbzClearError());
                                                         if (auth.uid === uid || loggedInUser.isAdmin) {
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
                                                             error.errorMessage = "You must be the owner or admin to update this company information";
                                                             this.dispatch(errorActions.bbzReportError(error));
                                                             window.scrollTo(0, 0);
                                                         }
                                                     }}/>
                                            </div>
                                {loggedInUser && loggedInUser.isAdmin && (
                                    <div>
                                        <span className="bbz-review-span">{approveMessage}:</span>
                                        <span>&nbsp;</span>
                                        <img className="bbz-general-pointer" type="image" value="submit" height="20"
                                             width="20"
                                             src={approveImageSource}
                                             onClick={() => {
                                                 this.dispatch(errorActions.bbzClearError());
                                                 if (loggedInUser.isAdmin) {
                                                     this.dispatch(companiesActions.startApproveUpdateCompanyItem(companyItemId, !isApproved));
                                                 } else {
                                                     openUpdatePanel();
                                                     var error = {};
                                                     error.errorMessage = "You must be admin to approve";
                                                     this.dispatch(errorActions.bbzReportError(error));
                                                     window.scrollTo(0, 0);
                                                 }
                                             }}/>
                                    </div>
                                )}
                            </div>)}
                            <div className="col-sm-3">
                                <div>
                                    <Rate
                                        defaultValue={rating}
                                        style={{fontSize: 15}}
                                        allowHalf
                                        value={rating}
                                    />
                                </div>
                                <div>
                                    <span className="label bbz-review-span">Reviews:</span>
                                    <span>&nbsp;</span>
                                    <Link to={`/reviews?company=${companyItemId}`} activeClassName="active bbz-review-span"
                                          activeStyle={{fontWeight: 'bold'}}>{reviewCount}</Link>
                                </div>
                                <div>
                                    <Link to={`/addreview?company=${companyItemId}`} activeClassName="active"
                                          activeStyle={{fontWeight: 'bold'}}>Add Review</Link>
                                </div>
                            </div>

                            <div className={loginClass}>
                                <div className="review-block-title">
                                    {companyTitle}
                                </div>
                                <div>
                                    <span className="label bbz-review-span">ID:</span>
                                    <span>&nbsp;</span>{companyId}
                                </div>
                                {auth.loggedIn && loggedInUser &&  loggedInUser.isSuperUser && (
                                    <div>
                                        <span className="label bbz-review-span">Company ID:</span>
                                        <span>&nbsp;</span>
                                        {companyItemId}
                                    </div>)}
                                {auth.loggedIn && loggedInUser && loggedInUser.isAdmin && (
                                    <div>
                                        <Link to={`/users?uid=${uid}`} activeClassName="active"
                                              activeStyle={{fontWeight: 'bold'}}>Reviewer</Link>
                                    </div>)}
                                <div>
                                    <span className="bbz-review-span">Servcie:</span>
                                    <span>&nbsp;</span>
                                    {serviceCategory}
                                </div>
                                <div>
                                    <span className="bbz-review-span">Description:</span>
                                    <span>&nbsp;</span>
                                    <Linkify properties={{target: '_blank', style: {color: 'blue'}}}>
                                        {companyDesc}
                                    </Linkify>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        auth: state.auth,
        loggedInUser: state.userProfile,
    }
}
export default  connect(mapStateToProps)(CompanyItem);
