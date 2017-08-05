import React from 'react';
var {connect} = require('react-redux');
import {Link} from 'react-router';
var Rate = require('rc-rate');
import Linkify from 'react-linkify';
import {openUpdatePanel} from 'app/common/Utils';
var companiesSqliteActions = require('companiesSqliteActions');
var servicesSqliteActions = require('servicesSqliteActions');
var urlActions = require('urlActions');
var errorActions = require('errorActions');

export class CompanyItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    render() {
        var {
            companyId, serviceId, serviceItemId, serviceCategory, userId,
            userProfile, companyItemId, rating,
            isApproved, reviewCount, companyTitle,
            companyDesc, createAt, updateAt, auth,
            deleteCompany, updateCompany
        } = this.props;

        let approved = (isApproved === 1);
        var approveImageSource = "images/like-64.png";
        var approveMessage = "Approval Pending";

        if (approved) {
            approveImageSource = "images/check-blue-64.png";
            approveMessage = "Approved";
        }

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
                                    {(userProfile && userProfile.isAdmin == 1) && (<div>
                                        <span className="bbz-review-span">Delete:</span>
                                        <span>&nbsp;</span>
                                        <img className="bbz-general-pointer" type="image" value="submit"
                                             height="15"
                                             width="15" src="images/delete-blue-x-64.png"
                                             alt="Delete Company"
                                             onClick={() => {
                                                 this.dispatch(errorActions.bbzClearError());
                                                 this.dispatch(companiesSqliteActions.startDeleteCompanyItem(companyId));
                                             }}/>
                                    </div>)}
                                    {(userProfile && userProfile.isAdmin == 1 || userProfile.userId === userId ) && (
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
                                                     var data = {
                                                         userId,
                                                         companyId,
                                                         companyTitle,
                                                         companyDesc,
                                                         rating,
                                                         selectedServiceId: serviceId,
                                                         serviceCategory
                                                     }

                                                     //console.debug("CompanyItems Data:", data);
                                                     this.dispatch(servicesSqliteActions.startAddServiceItems());
                                                     this.dispatch(companiesSqliteActions.setUpdateCompanyOperation(data));
                                                     window.scrollTo(0, 0);
                                                 }}/>
                                        </div>)}
                                    {userProfile && (userProfile.isAdmin == 1) && (
                                        <div>
                                            <span className="bbz-review-span">{approveMessage}:</span>
                                            <span>&nbsp;</span>
                                            <img className="bbz-general-pointer" type="image" value="submit" height="20"
                                                 width="20"
                                                 src={approveImageSource}
                                                 onClick={() => {
                                                     this.dispatch(errorActions.bbzClearError());
                                                     /*if (userProfile.isAdmin == 1) {*/
                                                     this.dispatch(companiesSqliteActions.startApproveUpdateCompanyItem(companyId,
                                                         !approved));
                                                     /*} else {
                                                      openUpdatePanel();
                                                      var error = {};
                                                      error.errorMessage = "You must be admin to approve";
                                                      this.dispatch(errorActions.bbzReportError(error));
                                                      window.scrollTo(0, 0);
                                                      }*/
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
                                    <Link to={`/reviews?company=${companyId}`}
                                          activeClassName="active bbz-review-span"
                                          activeStyle={{fontWeight: 'bold'}}>{reviewCount}</Link>
                                </div>
                                <div>
                                    <Link to={`/addreview?company=${companyId}`} activeClassName="active"
                                          activeStyle={{fontWeight: 'bold'}}>Add Review</Link>
                                </div>
                            </div>

                            <div className={loginClass}>
                                <div className="review-block-title">
                                    <Link to={`/companyreviews?company=${companyId}`} activeClassName="active"
                                          activeStyle={{fontWeight: 'bold'}}>{companyTitle}</Link>
                                </div>
                                <div>
                                    <span className="label bbz-review-span">ID:</span>
                                    <span>&nbsp;</span>{companyId}
                                </div>
                                {auth.loggedIn && userProfile && (userProfile.isSuperUser == 1) && (
                                    <div>
                                        <span className="label bbz-review-span">Company ID:</span>
                                        <span>&nbsp;</span>
                                        {companyId}
                                    </div>)}
                                {auth.loggedIn && userProfile && (userProfile.isAdmin == 1) && (
                                    <div>
                                        <Link to={`/users?uid=${userId}`} activeClassName="active"
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
            </div>);

    }
}
function mapStateToProps(state, ownProps) {
    return {
        auth: state.auth,
        userProfile: state.userProfile,
    }
}


export default connect(mapStateToProps)(CompanyItem);
