import React from 'react';
var {connect} = require('react-redux');

export class StarRatingItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    renderStarRatingItem = (rating) => {
        const btnGrey = 'btn-grey';
        const baseRatingStyle = 'btn btn-warning btn-xs';
        const ratingOneStyle = (rating < 1) ? baseRatingStyle + ' ' + btnGrey : baseRatingStyle;
        const ratingTwoStyle = (rating < 2) ? baseRatingStyle + ' ' + btnGrey : baseRatingStyle;
        const ratingThreeStyle = (rating < 3) ? baseRatingStyle + ' ' + btnGrey : baseRatingStyle;
        const ratingFourStyle = (rating < 4) ? baseRatingStyle + ' ' + btnGrey : baseRatingStyle;
        const ratingFiveStyle = (rating < 5) ? baseRatingStyle + ' ' + btnGrey : baseRatingStyle;

        return (
            <div className="review-block-rate">
                <button type="button" className={ratingOneStyle} aria-label="Left Align">
                    <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                </button>
                <button type="button" className={ratingTwoStyle} aria-label="Left Align">
                    <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                </button>
                <button type="button" className={ratingThreeStyle} aria-label="Left Align">
                    <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                </button>
                <button type="button" className={ratingFourStyle} aria-label="Left Align">
                    <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                </button>
                <button type="button" className={ratingFiveStyle} aria-label="Left Align">
                    <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                </button>
            </div>
        )
    }

    render() {
        var {rating} = this.props;
        return (
            <div>
                {this.renderStarRatingItem(rating)}
            </div>

        );
    }
}

export default  connect()(StarRatingItem);
