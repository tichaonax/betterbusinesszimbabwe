import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
var {connect} = require('react-redux');
import {Link, browserHistory, hashHistory} from 'react-router';
import get from 'lodash.get';
var Rate = require('rc-rate');
import Select from 'react-select';
var companiesSqliteActions = require('companiesSqliteActions');
var reviewsSqliteActions = require('reviewsSqliteActions');
var servicesSqliteActions = require('servicesSqliteActions');
var errorActions = require('errorActions');
var urlActions = require('urlActions');
import AlertContainer from 'react-alert'
import Error from 'Error';
import {toggleUpdatePanel, openUpdatePanel} from 'app/common/Utils';


export class AddReview extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;

        this.maxReviewCharacters = 300;
        this.state = {
            operation: 'ADD',
            companyId: null,
            review: '',
            reviewId: null,
            rating: 0,
            isApproved: false,
            companyItems: [],
            selectedCompanyId: null,
            selectedCompanyTitle: '',
            userId: 0,
            calledFromOutside: false,
            cancelOperation: false,
            remainingCharacters: null,
        }
    }

    alertOptions = {
        offset: 14,
        position: 'top right',
        theme: 'dark',
        time: 5000,
        transition: 'scale'
    }

    showAlert = (message) => {
        var {redirectUrl, userProfile} = this.props;
        this.msg.show(message, {
            time: 4000,
            type: 'success',
            icon: <img src="images/bbz-favicon.ico"/>,
            onClose: () => {
                if (!this.state.calledFromOutside) {
                    this.dispatch(urlActions.setRedirectUrl(`myreviews?user=${userProfile.userId}&myreviews=true`));
                } else {
                    hashHistory.push(redirectUrl);
                }
            }
        })
    }

    onGoBack = (evt) => {
        this.dispatch(errorActions.bbzClearError());
        if (this.state.calledFromOutside == true) {
            browserHistory.goBack();
        } else {
            this.resetInputs();
        }
    }

    validateAddNewReviewParameters(companyId) {
        //console.debug("validateAddNewReviewParameters", companyId);
        var {companyItems} = this.props;

        var isMatch = false;

        companyItems.map((companyItem) => {
            if (companyItem.companyId == companyId) {

                //console.debug("Match", companyItem);

                this.state = {
                    selectedCompanyId: companyItem.companyId,
                    selectedCompanyTitle: companyItem.companyTitle,
                    calledFromOutside: true
                }

                isMatch = true;
            }
        });

        if (!isMatch) {
            this.dispatch(companiesSqliteActions.startAddCompanyItems());
        }
    }

    loadData(props) {
        const {error, location} = props;
        if (error) {
            this.dispatch(errorActions.bbzClearError());
            this.dispatch(reviewsSqliteActions.setAddReviewOperation());
        }

        if (location && location.query) {
            this.validateAddNewReviewParameters(location.query.company);
        } else {
            this.dispatch(companiesSqliteActions.startAddCompanyItems());
        }
    }

    componentDidMount() {
        this.loadData(this.props);
        if (this.props.recentlyAddedCompany.companyId != undefined) {
            this.setState({
                selectedCompanyId: this.props.recentlyAddedCompany.companyId,
                selectedCompanyTitle: this.props.recentlyAddedCompany.companyTitle
            });
            openUpdatePanel();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({operation: nextProps.reviewOperation.operation});
        this.setState({companyItems: nextProps.companyItems});
        this.setState({reviewItems: nextProps.reviewItems});

        var {location} = nextProps;
        if (location && location.query) {
            this.validateAddNewReviewParameters(location.query.company);
        }

        if (nextProps.reviewOperation.data) {
            const newProps = nextProps.reviewOperation.data;
            this.setState({
                reviewId: newProps.reviewId,
                review: newProps.review,
                companyId: newProps.companyId,
                userId: newProps.userId,
                rating: newProps.rating,
                isApproved: (newProps.isApproved == 1)
            });

            if (newProps.review && newProps.review.length > 0) {
                this.setState({
                    remainingCharacters: ((this.maxReviewCharacters - newProps.review.length) + ' remaining')
                });
            }
        }
    }

    findDupeReviews(reviewItems, userId, companyId) {
        var dupes = [];
        if (reviewItems) {
            reviewItems.map((reviewItem) => {
                if (reviewItem.companyId == companyId && reviewItem.userId == userId) {
                    dupes.push(reviewItem);
                };
            });
        }
        return dupes;
    }

    renderAddAUpdateView = () => {
        return (
            <div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <button ref="cancel" type="button" className="btn btn-primary btn-lg btn-block" value="Cancel"
                                onClick={
                                    () => {
                                        if (this.state.calledFromOutside) {
                                            this.onGoBack(event);
                                        } else {
                                            toggleUpdatePanel();
                                            this.handleCancel(event);
                                        }
                                    }}>
                            Cancel
                        </button>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <button ref="add" type="button" className="btn btn-primary btn-lg btn-block"
                                value="Add New Review"
                                onClick={() => {
                                    if (this.state.operation === 'ADD') {
                                        this.handleSubmit(event);
                                    } else {
                                        this.handleUpdate(event);
                                    }
                                }}>
                            {this.state.operation === 'ADD' && ('Add New Review')}
                            {this.state.operation === 'UPDATE' && ('Update Review')}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    resetInputs = () => {
        this.setState({
            reviewId: '',
            review: '',
            rating: 0,
            remainingCharacters: null,
            selectedCompanyId: ''
        });
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.resetInputs();
        this.setState({
            cancelOperation: true,
        });
        this.dispatch(errorActions.bbzClearError());
        this.dispatch(reviewsSqliteActions.setAddReviewOperation());
    }

    validateUpdateValues(review){
        var error = {}

        if (review.length > 0) {
            if (review.length > this.maxReviewCharacters) {
                error.errorMessage = `Review comment exceeds maximum ${this.maxReviewCharacters} characters`;
                this.dispatch(errorActions.bbzReportError(error));
                this.refs.review.focus();
                return false;
            }
        } else {
            error.errorMessage = "Review comment required";
            this.dispatch(errorActions.bbzReportError(error));
            this.refs.review.focus();
            return false;
        }

        if (!this.state.rating || this.state.rating == 0) {
            error.errorMessage = "You must select a review rating before you can save review!";
            this.dispatch(errorActions.bbzReportError(error));
            return false;
        }

        return true;
    }

    handleUpdate = (e) => {
        e.preventDefault();
        if (this.state.cancelOperation) {
            return;
        }

        var review = this.refs.review.value;

        if (!this.validateUpdateValues(review)) {
            return
        }

        toggleUpdatePanel();

        this.dispatch(reviewsSqliteActions.startUpdateReviewItem(
            this.state.reviewId,
            this.state.review,
            this.state.rating,
            this.state.userId,
            this.state.isApproved,
            this.state.companyId
        ));

        this.resetInputs();
        this.dispatch(errorActions.bbzClearError());
        this.dispatch(reviewsSqliteActions.setAddReviewOperation());
        window.scrollTo(0, 0);
    }

    validateSubmitValues(review, reviewItems, userProfile) {

        var error = {}

        if (this.state.selectedCompanyId == null) {
            error.errorMessage = "You must select company to review";
            this.dispatch(errorActions.bbzReportError(error));
            this.refs.companySelect.focus();
            return false;
        }

        if (review.length > 0) {
            if (review.length > this.maxReviewCharacters) {
                error.errorMessage = `Review comment exceeds maximum ${this.maxReviewCharacters} characters`;
                this.dispatch(errorActions.bbzReportError(error));
                this.refs.review.focus();
                return false;
            }
        } else {
            error.errorMessage = "Review comment required";
            this.dispatch(errorActions.bbzReportError(error));
            this.refs.review.focus();
            return false;
        }

        if (this.findDupeReviews(reviewItems, userProfile.userId, this.state.selectedCompanyId).length != 0) {
            error.errorMessage = "You can only add one review per company, please select another company from drop down!";
            this.dispatch(errorActions.bbzReportError(error));
            return false;
        }

        if (!this.state.rating || this.state.rating == 0) {
            error.errorMessage = "You must select a review rating before you can save review!";
            this.dispatch(errorActions.bbzReportError(error));
            return false;
        }
        return true
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var {userProfile, reviewItems, userProfile, redirectUrl} = this.props;

        var review = this.refs.review.value;

        if (!this.validateSubmitValues(review, reviewItems, userProfile)) {
            return
        }

        this.dispatch(reviewsSqliteActions.startAddNewReviewItem(
            userProfile.userId,
            this.state.selectedCompanyId,
            review,
            this.state.rating,
            this.state.selectedCompanyTitle
        ));

        this.resetInputs();
        this.dispatch(errorActions.bbzClearError());
        this.showAlert("Thank you, Review Added!\nAfter review by Admin it will be made available to the public");
        toggleUpdatePanel();

        if (!this.state.calledFromOutside) {
            this.dispatch(urlActions.setRedirectUrl(`myreviews?user=${userProfile.userId}&myreviews=true`));
        } else {
            hashHistory.push(redirectUrl);
        }
        window.scrollTo(0, 0);
    }

    onChangeReviewComment = (e) => {
        this.setState({review: e.target.value});
        const textRemaining = this.maxReviewCharacters - e.target.value.length;
        this.setState({remainingCharacters: textRemaining + ' remaining'});
    }

    onCompanyIdChange = (val) => {
        let companyId = get(val, 'value');
        let companyTitle = get(val, 'label');
        this.setState({selectedCompanyId: companyId, selectedCompanyTitle: companyTitle});
    }

    renderCompanySelect() {
        var {userProfile} = this.props;
        var selectedCompanyIds = [];
        var companyItems = this.state.companyItems;
        if (companyItems && userProfile) {
            companyItems.map((companyItem) => {
                if (companyItem.isApproved == 1 || companyItem.userId == userProfile.userId) {
                    selectedCompanyIds.push({value: companyItem.companyId, label: companyItem.companyTitle});
                }
            });

            return (
                <div className="container-fluserId">
                    <div className="row">
                        <div className="col-sm-10">
                            <div className="form-group">
                                <Select
                                    ref="companySelect"
                                    name="company-select"
                                    value={this.state.selectedCompanyId}
                                    options={selectedCompanyIds}
                                    onChange={this.onCompanyIdChange}
                                    matchPos="start"
                                    ignoreCase={true}
                                    clearable={false}
                                    disabled={this.state.calledFromOutside}
                                />
                            </div>
                        </div>
                        <div className="col-sm-1">
                            <div className="form-group">
                                <Link to={`/addcompany?addnew=true`} activeClassName="active"
                                      activeStyle={{fontWeight: 'bold'}}>
                                    <span className="glyphicon glyphicon-plus button" data-toggle="tooltip"
                                          title="Add New Company!" onClick={() => {
                                        //this.dispatch(servicesSqliteActions.addServiceItems(Categories.getServices()));
                                        this.dispatch(servicesSqliteActions.startAddServiceItems());
                                    }}
                                    ></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>);
        } else {
            return null
        }
    }

    render() {
        return (
            <div className="col-sm-12">
                <div><AlertContainer ref={a => this.msg = a} {...this.alertOptions} /></div>
                <div className="review-block">
                    <div className="row">
                        <div className="col-sm-12">
                            <Error/>
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    {this.state.calledFromOutside && (<Link onClick={this.onGoBack}>Back &nbsp;</Link>)}
                                    {this.state.operation === 'ADD' && (
                                        <label htmlFor="company-item-id">Company</label>)}
                                    {this.state.operation === 'ADD' && this.renderCompanySelect()}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="rating">Rating &nbsp;</label>
                                    <div>
                                        <Rate
                                            defaultValue={this.state.rating}
                                            onChange={(index) => {
                                                this.setState({rating: index});
                                            }}
                                            style={{fontSize: 20}}
                                            allowHalf
                                            value={this.state.rating}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="sreview">Review Comment</label>
                                    <textarea acceptCharset="UTF-8" maxLength={this.maxReviewCharacters}
                                              className="form-control col-sm-4 well" rows="3"
                                              type="text" name="review" ref="review" value={this.state.review}
                                              placeholder="Review Comment" onChange={this.onChangeReviewComment}/>
                                    <h6 className="pull-right">{this.state.remainingCharacters}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                {this.renderAddAUpdateView()}
                            </div>
                        </div>
                    </form>
                </div>
            </div>);
    }
}

export default connect(
    (state) => {
        return {
            auth: state.auth,
            reviewOperation: state.reviewOperation,
            companyItems: state.companyItems,
            reviewItems: state.reviewItems,
            userProfile: state.userProfile,
            redirectUrl: state.redirectUrl,
            recentlyAddedCompany: state.recentlyAddedCompany
        }
    }
)(AddReview);