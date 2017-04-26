import React from 'react';
var {connect} = require('react-redux');
var reviewsActions = require('reviewsActions');
var errorActions = require('errorActions');

export class ReviewItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    render() {
        var {uid, userProfile, reviewItemId, reviewTitle, reviewDesc, createAt, updateAt, auth} = this.props;

        return (
            <tr>
                <td>
                    <form>
                        <input type="submit" value="&times;" onClick={() => {
                            if (userProfile.isAdmin) {
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
                                    reviewItemId,
                                    reviewTitle,
                                    reviewDesc
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
                </td>
                <td>{reviewTitle}</td>
                <td>{reviewDesc}
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
export default  connect(mapStateToProps)(ReviewItem);
