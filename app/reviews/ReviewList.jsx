import React from 'react';
var {connect} = require('react-redux');
import ReviewItem from 'ReviewItem';


export class ReviewList extends React.Component {
    constructor(props) {
        super(props);
    }

    renderReviewItems = () => {
        var {reviewItems} = this.props;
        if (reviewItems.length === 0) {
            return (
                <tr>
                    <td colSpan={3}>
                    No Reviews Added
                    </td>
                </tr>
            )
        } else {
            return reviewItems.map((reviewItem) => {
                return (
                    <ReviewItem key={reviewItem.reviewItemId} {...reviewItem} />);
            });
        }
    }

    render() {
        return (
            <div>
                <table className="common-table">
                    <tbody>
                    <tr>
                        <th>ReviewItemID</th>
                        <th>Review Name</th>
                        <th>Description</th>
                    </tr>

                    {this.renderReviewItems()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            reviewItems: state.reviewItems
        }
    }
)(ReviewList);