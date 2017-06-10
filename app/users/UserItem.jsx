import React from 'react';
var {connect} = require('react-redux');
import {Link} from 'react-router';
import {findDOMNode} from 'react-dom'
import ReactTooltip from 'react-tooltip'
var Rate = require('rc-rate');
import Linkify from 'react-linkify';
var usersActions = require('usersActions');
var urlActions = require('urlActions');
var errorActions = require('errorActions');

export class CompanyItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    render() {
        var {userItemId, reviewCount, loggedInUser, userProfile, auth} = this.props;

        var displayName = userProfile.displayName;

        if (userProfile.displayName) {
            displayName = userProfile.displayName.split('@')[0];
        }

        var loginClass = "col-sm-9";
        if (auth.loggedIn) {
            loginClass = "col-sm-6";
        }

        var approveImageSource = "images/like-64.png";
        var approveMessage ="Make Admin";

        if (userProfile.isAdmin) {
            approveImageSource = "images/bbz_admin.png";
            approveMessage ="Admin";
        }


        return (
            <div className="col-sm-12">
                <form>
                    <div className="review-block">
                        <div className="row">
                            {auth.loggedIn && (
                            <div className="col-sm-3">
                                <img src="images/no-image.png" className="img-rounded"/>
                            </div>)}
                            <div className="col-sm-3">
                                <div>
                                    <span className="label bbz-review-span">Reviews:</span>
                                    <span>&nbsp;</span>
                                    <Link to={`/reviews?user=${userItemId}`} activeClassName="active bbz-review-span"
                                          activeStyle={{fontWeight: 'bold'}}>{reviewCount}</Link>
                                </div>
                                {auth.loggedIn && loggedInUser.isSuperUser && (
                                    <div className="column">
                                        <span className="bbz-review-span">{approveMessage}:</span>
                                        <span>&nbsp;</span>
                                        <img className="bbz-general-pointer" type="image" value="submit" height="20" width="20" src={approveImageSource}
                                             onClick={() => {
                                                 this.dispatch(errorActions.bbzClearError());
                                                 if (loggedInUser.isSuperUser) {
                                                     this.dispatch(usersActions.startToggleAdminUserItem(userItemId,!userProfile.isAdmin));
                                                 } else {
                                                     var error = {};
                                                     error.errorMessage = "You must be Super User to approve";
                                                     this.dispatch(errorActions.bbzReportError(error));
                                                     window.scrollTo(0, 0);
                                                 }
                                             }}/>
                                    </div>
                                )}
                            </div>

                            <div className={loginClass}>
                                <div className="review-block-title">
                                    {displayName}
                                </div>
                                {auth.loggedIn && loggedInUser &&  loggedInUser.isAdmin && (
                                <div>
                                    <span className="label bbz-review-span">ID:</span>
                                    <span>&nbsp;</span>
                                    {userItemId}
                                </div>)}
                                {auth.loggedIn && loggedInUser && loggedInUser.isAdmin && (
                                <div>
                                    <span className="bbz-review-span">Email:</span>
                                    <span>&nbsp;</span>
                                    {userProfile.email}
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
