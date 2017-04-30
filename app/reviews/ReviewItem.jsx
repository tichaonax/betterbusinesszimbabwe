import React from 'react';
var {connect} = require('react-redux');
var Rate = require('rc-rate');
import {Link} from 'react-router';
import {findDOMNode} from 'react-dom'
import ReactTooltip from 'react-tooltip'
var reviewsActions = require('reviewsActions');
var errorActions = require('errorActions');

export class ReviewItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    render() {
        var {uid, companyTitle, companyItemId, userProfile, reviewItemId, review, rating, createAt, updateAt, auth, foo} = this.props;

        const reviewId = createAt;

        return (
            <tr>
                <td>{reviewId}</td>
                {auth.loggedIn && (
                    <td>
                        <form>
                            <img type="image" value="submit" height="30" width="30" src="images/delete-blue-64.png" alt="Delete Review"
                                 onMouseOver={()=>{
                                     console.debug("onMousever");
                                     ReactTooltip.show(findDOMNode(foo))
                                 }}
                                 onMouseOut={()=>{
                                     console.debug("onMouseOut");
                                     ReactTooltip.hide(findDOMNode(foo))
                                 }}
                                 onClick={() => {
                                if (userProfile && userProfile.isAdmin) {
                                    this.dispatch(reviewsActions.startDeleteReviewItem(reviewItemId));
                                } else {
                                    var error = {};
                                    error.errorMessage = "You must be admin to delete this review information";
                                    this.dispatch(errorActions.bbzReportError(error));
                                }
                            }}/>

                            <img type="image" value="submit" height="30" width="30" src="images/update-blue-64.png" alt="Update Review" onClick={() => {

                                if (auth.uid === uid || userProfile.isAdmin) {
                                    var data = {
                                        uid,
                                        reviewItemId,
                                        companyItemId,
                                        rating,
                                        review
                                    }

                                    console.debug("ReviewItems Data:", data);

                                    this.dispatch(reviewsActions.setUpdateReviewOperation(data));
                                }
                                else {
                                    var error = {};
                                    error.errorMessage = "You must be the creater or admin to update this review information";
                                    this.dispatch(errorActions.bbzReportError(error));
                                }
                            }}/>
                        </form>
                    </td>)}
                <td>
                    <Rate
                        defaultValue={rating}
                        style={{fontSize: 15}}
                        allowHalf
                        value={rating}
                    />
                </td>

                <td>
                    <Link to={`/companies?company=${companyItemId}`} activeClassName="active"
                          activeStyle={{fontWeight: 'bold'}}>{companyTitle}</Link>
                </td>
                <td>{review}</td>
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
export default  connect(mapStateToProps)(ReviewItem);
