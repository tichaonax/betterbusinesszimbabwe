import React from 'react';
var {connect} = require('react-redux');

export class CompanyRatingItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    get100PercentBreakDown = (reviewItems) => {
        var ratingCount = 0;
        reviewItems.map((reviewItem) => {
            if (reviewItem.rating > 4.9) {
                ratingCount++;
            }
        });
        return (ratingCount);
    }

    get80PercentBreakDown = (reviewItems) => {
        var ratingCount = 0;
        reviewItems.map((reviewItem) => {
            if (reviewItem.rating > 3.9 && reviewItem.rating < 5 ) {
                ratingCount++;
            }
        });
        return (ratingCount);
    }

    get60PercentBreakDown = (reviewItems) => {
        var ratingCount = 0;
        reviewItems.map((reviewItem) => {
            if (reviewItem.rating > 2.9 && reviewItem.rating < 4 ) {
                ratingCount++;
            }
        });
        return (ratingCount);
    }

    get40PercentBreakDown(reviewItems) {
        var ratingCount = 0;
        reviewItems.map((reviewItem) => {
            if (reviewItem.rating > 1.9 && reviewItem.rating < 3 ) {
                ratingCount++;
            }
        });
        return (ratingCount);
    }

    get20PercentBreakDown = (reviewItems) => {
        var ratingCount = 0;
        reviewItems.map((reviewItem) => {
            if (reviewItem.rating > 0.9 && reviewItem.rating < 2 ) {
                ratingCount++;
            }
        });
        return (ratingCount);
    }

    render() {
        var {reviewItems} = this.props;

        return (
            <div className="col-sm-7">
                <h4>Rating breakdown</h4>
                <div className="pull-left">
                    <div className="pull-left" style={{width: '35px', lineHeight: '1px'}}>
                        <div style={{height: '9px', margin: '5px 0'}}>5 <span
                            className="glyphicon glyphicon-star"></span></div>
                    </div>
                    <div className="pull-left" style={{width: '180px'}}>
                        <div className="progress" style={{height: '9px', margin: '8px 0'}}>
                            <div className="progress-bar progress-bar-success" role="progressbar"
                                 style={{width: '100%'}}>
                            </div>
                        </div>
                    </div>
                    <div className="pull-right"
                         style={{marginLeft: '10px', marginRight: '10px'}}>{this.get100PercentBreakDown(reviewItems)}</div>
                </div>
                <div className="pull-left">
                    <div className="pull-left" style={{width: '35px', lineHeight: '1px'}}>
                        <div style={{height: '9px', margin: '5px 0'}}>4 <span
                            className="glyphicon glyphicon-star"></span></div>
                    </div>
                    <div className="pull-left" style={{width: '180px'}}>
                        <div className="progress" style={{height: '9px', margin: '8px 0'}}>
                            <div className="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="4"
                                 aria-valuemin="0" aria-valuemax="5" style={{width: '80%'}}>
                                <span className="sr-only">80% Complete (danger)</span>
                            </div>
                        </div>
                    </div>
                    <div className="pull-right" style={{marginLeft: '10px'}}>{this.get80PercentBreakDown(reviewItems)}</div>
                </div>
                <div className="pull-left">
                    <div className="pull-left" style={{width: '35px', lineHeight: '1px'}}>
                        <div style={{height: '9px', margin: '5px 0'}}>3 <span
                            className="glyphicon glyphicon-star"></span></div>
                    </div>
                    <div className="pull-left" style={{width: '180px'}}>
                        <div className="progress" style={{height: '9px', margin: '8px 0'}}>
                            <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="3"
                                 aria-valuemin="0" aria-valuemax="5" style={{width: '60%'}}>
                                <span className="sr-only">80% Complete (danger)</span>
                            </div>
                        </div>
                    </div>
                    <div className="pull-right" style={{marginLeft: '10px'}}>{this.get60PercentBreakDown(reviewItems)}</div>
                </div>
                <div className="pull-left">
                    <div className="pull-left" style={{width: '35px', lineHeight: '1px'}}>
                        <div style={{height: '9px', margin: '5px 0'}}>2 <span
                            className="glyphicon glyphicon-star"></span></div>
                    </div>
                    <div className="pull-left" style={{width: '180px'}}>
                        <div className="progress" style={{height: '9px', margin: '8px 0'}}>
                            <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="2"
                                 aria-valuemin="0" aria-valuemax="5" style={{width: '40%'}}>
                                <span className="sr-only">80% Complete (danger)</span>
                            </div>
                        </div>
                    </div>
                    <div className="pull-right" style={{marginLeft: '10px'}}>{this.get40PercentBreakDown(reviewItems)}</div>
                </div>
                <div className="pull-left">
                    <div className="pull-left" style={{width: '35px', lineHeight: '1px'}}>
                        <div style={{height: '9px', margin: '5px 0'}}>1 <span
                            className="glyphicon glyphicon-star"></span></div>
                    </div>
                    <div className="pull-left" style={{width: '180px'}}>
                        <div className="progress" style={{height: '9px', margin: '8px 0'}}>
                            <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="1"
                                 aria-valuemin="0" aria-valuemax="5" style={{width: '20%'}}>
                                <span className="sr-only">80% Complete (danger)</span>
                            </div>
                        </div>
                    </div>
                    <div className="pull-right" style={{marginLeft: '10px'}}>{this.get20PercentBreakDown(reviewItems)}</div>
                </div>
            </div>
        );
    }
}
export default  connect()(CompanyRatingItem);
