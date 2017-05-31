import React from 'react';
var {connect} = require('react-redux');

import ReviewList from 'ReviewList'
import AddReview from 'AddReview';
import BbzSearch from "BbzSearch";
var reviewsActions = require('reviewsActions');
var searchActions = require('searchActions');

export class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    loadData(props) {
        this.dispatch(reviewsActions.startAddReviewItems());
        var company = props.location.query.company;
        if (company && company.length > 0) {
            this.dispatch(searchActions.setSearchText(company));
        }
    }

    componentDidMount() {
        this.dispatch(searchActions.setSearchButton(false));
        this.loadData(this.props);
    }

    componentWillUnmount(){
        this.dispatch(searchActions.setSearchText(""));
    }

    componentWillReceiveProps(newProps) {
        this.loadData(newProps);
    }

    render() {
        var {isLoggedIn} = this.props;
        return (
            <div className="row">
                <div className="columns container">
                    {/*<div className="container">*/}
                        {isLoggedIn && (
                            <div className="bbz-general">
                                <AddReview/>
                            </div>)}
                       {/* <div>*/}
                            <div className="row">
                                <div className="col-sm-5">
                                    <div className="rating-block">
                                        <h4>Average user rating</h4>
                                        <h2 className="bold padding-bottom-7">4.3 <small>/ 5</small></h2>
                                        <button type="button" className="btn btn-warning btn-sm" aria-label="Left Align">
                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                        </button>
                                        <button type="button" className="btn btn-warning btn-sm" aria-label="Left Align">
                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                        </button>
                                        <button type="button" className="btn btn-warning btn-sm" aria-label="Left Align">
                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                        </button>
                                        <button type="button" className="btn btn-default btn-grey btn-sm" aria-label="Left Align">
                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                        </button>
                                        <button type="button" className="btn btn-default btn-grey btn-sm" aria-label="Left Align">
                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                <div className="col-sm-7">
                                    <h4>Rating breakdown</h4>
                                    <div className="pull-left">
                                        <div className="pull-left" style={{width:'35px', lineHeight :'1px'}}>
                                            <div style={{height:'9px', margin:'5px 0'}}>5 <span className="glyphicon glyphicon-star"></span></div>
                                        </div>
                                        <div className="pull-left" style={{width:'180px'}}>
                                            <div className="progress" style={{height:'9px',margin:'8px 0'}}>
                                                <div className="progress-bar progress-bar-success" role="progressbar" style={{width: '100%'}}>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pull-right" style={{marginLeft:'10px', marginRight:'10px'}}>1234</div>
                                    </div>
                                    <div className="pull-left">
                                        <div className="pull-left" style={{width:'35px', lineHeight :'1px'}}>
                                            <div style={{height:'9px', margin:'5px 0'}}>4 <span className="glyphicon glyphicon-star"></span></div>
                                        </div>
                                        <div className="pull-left" style={{width:'180px'}}>
                                            <div className="progress" style={{height:'9px', margin:'8px 0'}}>
                                                <div className="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="5" style={{width: '80%'}}>
                                                    <span className="sr-only">80% Complete (danger)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pull-right" style={{marginLeft:'10px'}}>1</div>
                                    </div>
                                    <div className="pull-left">
                                        <div className="pull-left" style={{width:'35px', lineHeight :'1px'}}>
                                            <div style={{height:'9px', margin:'5px 0'}}>3 <span className="glyphicon glyphicon-star"></span></div>
                                        </div>
                                        <div className="pull-left" style={{width:'180px'}}>
                                            <div className="progress" style={{height:'9px', margin:'8px 0'}}>
                                                <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="3" aria-valuemin="0" aria-valuemax="5" style={{width: '60%'}}>
                                                    <span className="sr-only">80% Complete (danger)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pull-right" style={{marginLeft:'10px'}}>0</div>
                                    </div>
                                    <div className="pull-left">
                                        <div className="pull-left" style={{width:'35px', lineHeight :'1px'}}>
                                            <div style={{height:'9px', margin:'5px 0'}}>2 <span className="glyphicon glyphicon-star"></span></div>
                                        </div>
                                        <div className="pull-left" style={{width:'180px'}}>
                                            <div className="progress" style={{height:'9px', margin:'8px 0'}}>
                                                <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="2" aria-valuemin="0" aria-valuemax="5" style={{width: '40%'}}>
                                                    <span className="sr-only">80% Complete (danger)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pull-right" style={{marginLeft:'10px'}}>0</div>
                                    </div>
                                    <div className="pull-left">
                                        <div className="pull-left" style={{width:'35px', lineHeight:'1px'}}>
                                            <div style={{height:'9px', margin:'5px 0'}}>1 <span className="glyphicon glyphicon-star"></span></div>
                                        </div>
                                        <div className="pull-left" style={{width:'180px'}}>
                                            <div className="progress" style={{height:'9px', margin:'8px 0'}}>
                                                <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="5" style={{width: '20%'}}>
                                                    <span className="sr-only">80% Complete (danger)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pull-right" style={{marginLeft:'10px'}}>0</div>
                                    </div>
                                </div>
                                </div>
                                </div>


                         {/*   <div className="row">
                                <div className="col-sm-12">
                                    <hr/>
                                    <div className="review-block">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <img src="http://dummyimage.com/60x60/666/ffffff&text=No+Image" className="img-rounded"/>
                                                    <div className="review-block-name"><a href="#">Tichaona Hwandaza</a></div>
                                                    <div className="review-block-date">January 29, 2016<br/>1 year ago</div>
                                            </div>
                                            <div className="col-sm-7">
                                                <div className="review-block-rate">
                                                    <button type="button" className="btn btn-warning btn-xs" aria-label="Left Align">
                                                        <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                    </button>
                                                    <button type="button" className="btn btn-warning btn-xs" aria-label="Left Align">
                                                        <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                    </button>
                                                    <button type="button" className="btn btn-warning btn-xs" aria-label="Left Align">
                                                        <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                    </button>
                                                    <button type="button" className="btn btn-default btn-grey btn-xs" aria-label="Left Align">
                                                        <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                    </button>
                                                    <button type="button" className="btn btn-default btn-grey btn-xs" aria-label="Left Align">
                                                        <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                    </button>
                                                </div>
                                                <div className="review-block-title">Great company</div>
                                                <div className="review-block-description">Great company. Very friendly people and good customer service</div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <img src="http://dummyimage.com/60x60/666/ffffff&text=No+Image" className="img-rounded"/>
                                                    <div className="review-block-name"><a href="#">Mavhunga</a></div>
                                                    <div className="review-block-date">May 2, 2017<br/>15 days ago</div>
                                            </div>
                                            <div className="col-sm-7">
                                                <div className="review-block-rate">
                                                    <button type="button" className="btn btn-warning btn-xs" aria-label="Left Align">
                                                        <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                    </button>
                                                    <button type="button" className="btn btn-warning btn-xs" aria-label="Left Align">
                                                        <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                    </button>
                                                    <button type="button" className="btn btn-warning btn-xs" aria-label="Left Align">
                                                        <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                    </button>
                                                    <button type="button" className="btn btn-default btn-grey btn-xs" aria-label="Left Align">
                                                        <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                    </button>
                                                    <button type="button" className="btn btn-default btn-grey btn-xs" aria-label="Left Align">
                                                        <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                                                    </button>
                                                </div>
                                                <div className="review-block-title">Watch out for this company</div>
                                                <div className="review-block-description">Watch out for this company. Poor service, save your cash</div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>*/}
                      {/*  </div>*/}
                       {/* <div>*/}

                            <ReviewList/>
                       {/* </div>*/}
                   {/* </div>*/}
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        isLoggedIn: state.auth.loggedIn,
        userProfile: state.userProfile,
        searchText: state.searchText
    }
})(Reviews);
