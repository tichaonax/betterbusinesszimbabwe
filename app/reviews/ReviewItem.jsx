import React from 'react';
var {connect} = require('react-redux');
var Rate = require('rc-rate');
import {Link} from 'react-router';
var reviewsActions = require('reviewsActions');
var errorActions = require('errorActions');

export class ReviewItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    render() {
        var {uid, companyTitle, companyItemId, userProfile, reviewItemId, review, rating, createAt, updateAt, auth} = this.props;

        const reviewId = createAt;

        return (
            <tr>
                <td>{reviewId}</td>
                {auth.loggedIn && (
                    <td>
                        <form>
                            <input type="submit" value="&times;" onClick={() => {
                                if (userProfile && userProfile.isAdmin) {
                                    this.dispatch(reviewsActions.startDeleteReviewItem(reviewItemId));
                                } else {
                                    var error = {};
                                    error.errorMessage = "You must be admin to delete this review information";
                                    this.dispatch(errorActions.bbzReportError(error));
                                }
                            }}/>

                            <input type="submit" value={reviewItemId} onClick={() => {

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
