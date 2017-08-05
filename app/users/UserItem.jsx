import React from 'react';
var {connect} = require('react-redux');
import {Link} from 'react-router';
import Linkify from 'react-linkify';
var usersSqliteActions = require('usersSqliteActions');
var urlActions = require('urlActions');
var errorActions = require('errorActions');

export class CompanyItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    render() {
        var {
            userId, firebaseId, providerId, isSuperUser, createAt, displayName,
            email, ipAddress, isAdmin, isApproved, loginAt, photoURL, reviewCount,
            uid, loggedInUser, user, auth
        } = this.props;

        //if (loggedInUser) {
        //    loggedInUser.isSuperUser = (loggedInUser.isSuperUser == 1);
        //    loggedInUser.isAdmin = (loggedInUser.isAdmin == 1);
        //}

        isApproved = (isApproved == 1);
        isSuperUser = (isSuperUser == 1);
        isAdmin = (isAdmin == 1);
        let approveImageSource = "images/like-64.png";
        let approveMessage = "Make Admin";

        if (isAdmin) {
            approveImageSource = "images/bbz_admin.png";
            approveMessage = "Admin";
        }

        displayName = displayName.split('@')[0];

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
                                    <img src={photoURL} alt="Smiley face" height="43" width="43"
                                         className="img-rounded"/>
                                </div>)}
                            <div className="col-sm-3">
                                <div>
                                    <span className="label bbz-review-span">Reviews:</span>
                                    <span>&nbsp;</span>
                                    <Link to={`/reviews?user=${userId}`} activeClassName="active bbz-review-span"
                                          activeStyle={{fontWeight: 'bold'}}>{reviewCount}</Link>
                                </div>
                                {auth.loggedIn && loggedInUser && (loggedInUser.isSuperUser == 1) && (
                                    <div className="column">
                                        <span className="bbz-review-span">{approveMessage}:</span>
                                        <span>&nbsp;</span>
                                        <img className="bbz-general-pointer" type="image" value="submit" height="20"
                                             width="20" src={approveImageSource}
                                             onClick={() => {
                                                 this.dispatch(errorActions.bbzClearError());
                                                 if (loggedInUser.isSuperUser == 1) {
                                                     this.dispatch(usersSqliteActions.startToggleAdminUserItem(userId,
                                                         !isAdmin, loggedInUser.userId));
                                                 } else {
                                                     var error = {};
                                                     error.errorMessage = "You must be Super User to approve";
                                                     this.dispatch(errorActions.bbzReportError(error));
                                                     window.scrollTo(0, 0);
                                                 }
                                             }}/>
                                    </div>
                                )}
                                {auth.loggedIn && loggedInUser && (loggedInUser.isSuperUser == 1) && (
                                    <div>
                                        <span className="label bbz-review-span">Provider:</span>
                                        <span>&nbsp;</span>{providerId}
                                    </div>
                                )}
                            </div>

                            <div className={loginClass}>
                                <div className="review-block-title">
                                    {displayName}
                                </div>
                                {auth.loggedIn && loggedInUser && (loggedInUser.isSuperUser == 1) && (
                                    <div>
                                        <span className="label bbz-review-span">Firebase ID:</span>
                                        <span>&nbsp;</span>
                                        {firebaseId}
                                    </div>)}
                                {auth.loggedIn && loggedInUser && (loggedInUser.isSuperUser == 1) && (
                                    <div>
                                        <span className="label bbz-review-span">Provider UID:</span>
                                        <span>&nbsp;</span>{uid}
                                    </div>
                                )}
                                {auth.loggedIn && loggedInUser && (loggedInUser.isSuperUser == 1) && (
                                    <div>
                                        <span className="label bbz-review-span">User ID:</span>
                                        <span>&nbsp;</span>
                                        {userId}
                                    </div>)}
                                {auth.loggedIn && loggedInUser && (loggedInUser.isAdmin == 1) && (
                                    <div>
                                        <span className="bbz-review-span">Email:</span>
                                        <span>&nbsp;</span>
                                        {email}
                                    </div>)}
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
