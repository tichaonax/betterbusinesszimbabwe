import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
var {connect} = require('react-redux');
import {Link, browserHistory, hashHistory} from 'react-router';
import get from 'lodash.get';
var Rate = require('rc-rate');
import Select from 'react-select';
var companiesActions = require('companiesActions');
var reviewsActions = require('reviewsActions');
var errorActions = require('errorActions');
import Error from 'Error';

export class AddReview extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.state = {
            operation: 'ADD',
            companyItemId: null,
            review: '',
            reviewItemId: null,
            rating: 0,
            companyItems: [],
            companyItemId: null,
            selectedCompanyItemId: null,
            selectedCompanyTitle: '',
            uid: 0,
            calledFromOutside: false,
            isShowingModal: false,
            cancelOperation: false,
            remainingCharacters: null,
            maxReviewCharacters: 300
        }
    }

    onGoBack = (evt) => {
        this.dispatch(errorActions.bbzClearError());
        if (this.state.calledFromOutside == true) {
            browserHistory.goBack();
        } else {
            this.resetInputs();
        }
    }

    validateAddNewReviewParameters(companyItemId) {
        console.debug("validateAddNewReviewParameters", companyItemId);
        var {companyItems} = this.props;

        var isMatch = false;

        companyItems.map((companyItem) => {
            if (companyItem.companyItemId == companyItemId) {

                console.debug("Match", companyItem);

                this.state = {
                    selectedCompanyItemId: companyItem.companyItemId,
                    selectedCompanyTitle: companyItem.companyTitle,
                    calledFromOutside: true
                }

                isMatch = true;
            }
        });

        if (!isMatch) {
            this.dispatch(companiesActions.startAddCompanyItems());
        }
    }

    loadData(props) {
        this.dispatch(companiesActions.startAddCompanyItems());

        const {error} = this.props;
        if (error) {
            this.dispatch(errorActions.bbzClearError());
            this.dispatch(reviewsActions.setAddReviewOperation());
        }

        var {location} = this.props;

        if (location && location.query) {
            this.validateAddNewReviewParameters(location.query.company);
        } else {
            this.dispatch(companiesActions.startAddCompanyItems());
        }
    }

    componentDidMount() {
        this.loadData(this.props);
    }

    componentWillReceiveProps(nextProps) {

        this.setState({operation: nextProps.reviewOperation.operation});
        this.setState({companyItems: nextProps.companyItems});
        this.setState({reviewItems: nextProps.reviewItems});

        if (nextProps.reviewOperation.data) {
            const newProps = nextProps.reviewOperation.data;
            this.setState({
                reviewItemId: newProps.reviewItemId,
                review: newProps.review,
                companyItemId: newProps.companyItemId,
                uid: newProps.uid,
                rating: newProps.rating
            });

            if (newProps.review && newProps.review.length > 0) {
                this.setState({
                    remainingCharacters: ((this.state.maxReviewCharacters - newProps.review.length) + ' remaining')
                });
            }
        }
    }

    findDupeReviews(reviewItems, uid, companyItemId) {
        var dupes = [];
        if (reviewItems) {
            reviewItems.map((reviewItem) => {
                if (reviewItem.companyItemId == companyItemId && reviewItem.uid == uid) {
                    dupes.push(reviewItem);
                }
                ;
            });
        }
        return dupes;
    }

    onModalClick = () => this.setState({isShowingModal: true});

    renderModalFeedback(redirectUrl) {
        return (
            <div onClick={this.onModalClick}>
                {
                    this.state.isShowingModal &&
                    <ModalContainer onClose={() => {
                        this.setState({isShowingModal: false});
                        hashHistory.push(redirectUrl);
                    }}>
                        <ModalDialog onClose={() => {
                            this.setState({isShowingModal: false});
                            hashHistory.push(redirectUrl);
                        }}>
                            <h1>Thank you, Review Added!</h1>
                            <p>After review by Admin it will be made available to the public</p>
                        </ModalDialog>
                    </ModalContainer>}

            </div>);
    }

    renderAddView = () => {
        return (
            <div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <button ref="cancel" type="button" className="btn btn-primary btn-lg btn-block" value="Cancel"
                                onClick={this.onGoBack}>
                            Cancel
                        </button>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <button ref="add" type="button" className="btn btn-primary btn-lg btn-block"
                                value="Add New Review"
                                onClick={this.handleSubmit}>Add New Review
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    renderUpdateView() {
        return (

            <div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <button ref="cancel" type="button" className="btn btn-primary btn-lg btn-block" value="Cancel"
                                onClick={this.handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <button ref="add" type="button" className="btn btn-primary btn-lg btn-block"
                                value="Add New Review"
                                onClick={this.handleUpdate}>Add New Review
                        </button>
                    </div>
                </div>
            </div>

        )
    }

    resetInputs = () => {
        this.setState({
            reviewItemId: '',
            review: '',
            rating: 0,
            remainingCharacters: null
        });
    }

    handleCancel = (e) => {
        this.setState({
            cancelOperation: true,
        });
        this.dispatch(errorActions.bbzClearError());
        e.preventDefault();
        this.dispatch(reviewsActions.setAddReviewOperation());
        this.resetInputs();
    }

    handleUpdate = (e) => {
        e.preventDefault();
        if (this.state.cancelOperation) {
            return;
        }

        this.dispatch(reviewsActions.startUpdateReviewItem(
            this.state.reviewItemId,
            this.state.review,
            this.state.rating,
            this.state.companyItemId
        ));

        this.resetInputs();
        this.dispatch(errorActions.bbzClearError());
        this.dispatch(reviewsActions.setAddReviewOperation());
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var {auth, reviewItems, userProfile, redirectUrl} = this.props;

        var error = {}
        var review = this.refs.review.value;

        if (this.state.selectedCompanyItemId == null) {
            error.errorMessage = "You must select company to review";
            this.dispatch(errorActions.bbzReportError(error));
            this.refs.companySelect.focus();
            return;
        }

        if (review.length > 0) {
            if (review.length > this.state.maxReviewCharacters) {
                error.errorMessage = `Review comment exceeds maximum ${this.state.maxReviewCharacters} characters`;
                this.dispatch(errorActions.bbzReportError(error));
                this.refs.review.focus();
                return;
            }
        } else {
            error.errorMessage = "Review comment required";
            this.dispatch(errorActions.bbzReportError(error));
            this.refs.review.focus();
            return;
        }

        if (this.findDupeReviews(reviewItems, auth.uid, this.state.selectedCompanyItemId).length != 0) {
            error.errorMessage = "You can only add one review per company, please select another company from drop down!";
            this.dispatch(errorActions.bbzReportError(error));
            return;
        }


        if (this.state.rating == 0) {
            error.errorMessage = "You must select a review rating before you can save review!";
            this.dispatch(errorActions.bbzReportError(error));
            return;
        }

        this.dispatch(reviewsActions.startAddNewReviewItem(
            auth.uid,
            this.state.selectedCompanyItemId,
            review,
            this.state.rating,
            this.state.selectedCompanyTitle,
            userProfile.displayName,
            userProfile.email
        ));

        if (this.state.calledFromOutside) {
            //console.debug("redirectUrl calledFromOutside",redirectUrl);
            this.state = {
                isShowingModal: true
            }
        }

        this.resetInputs();
        this.dispatch(errorActions.bbzClearError());
    }

    onChangeReviewComment = (e) => {
        this.setState({review: e.target.value});
        var textRemaining = this.state.maxReviewCharacters - e.target.value.length;
        this.setState({remainingCharacters: textRemaining + ' remaining'});
    }

    onCompanyItemIdChange = (val) => {
        let companyItemId = get(val, 'value');
        let companyTitle = get(val, 'label');
        this.setState({selectedCompanyItemId: companyItemId, selectedCompanyTitle: companyTitle});
    }

    renderCompanySelect() {
        var selectedCompanyItemIds = [];
        var companyItems = this.state.companyItems;
        if (companyItems) {

            companyItems.map((companyItem) => {
                selectedCompanyItemIds.push({value: companyItem.companyItemId, label: companyItem.companyTitle});
            });

            return (
                <div>
                    <Select
                        ref="companySelect"
                        name="company-select"
                        value={this.state.selectedCompanyItemId}
                        options={selectedCompanyItemIds}
                        onChange={this.onCompanyItemIdChange}
                        matchPos="start"
                        ignoreCase={true}
                        clearable={false}
                        disabled={this.state.calledFromOutside}
                    />
                </div>
            );
        } else {
            return null
        }
    }

    render() {
        var {redirectUrl} = this.props;
        return (

            <div className="col-sm-12">
                <form onSubmit={this.handleSubmit}>
                    <div className="review-block">
                        <div className="row">
                            <div className="col-sm-12">
                                <Error/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    {this.renderModalFeedback(redirectUrl)}
                                    {this.state.calledFromOutside && (<Link onClick={this.onGoBack}>Back</Link>)}
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
                                    <textarea acceptCharset="UTF-8" maxLength={this.state.maxReviewCharacters}
                                              className="form-control col-sm-4 well" rows="3"
                                              type="text" name="review" ref="review" value={this.state.review}
                                              placeholder="Review Comment" onChange={this.onChangeReviewComment}/>
                                    <h6 className="pull-right">{this.state.remainingCharacters}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                    {this.state.operation === 'ADD' && this.renderAddView()}
                                    {this.state.operation === 'UPDATE' && this.renderUpdateView()}
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        );
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
            redirectUrl: state.redirectUrl
        }
    }
)(AddReview);