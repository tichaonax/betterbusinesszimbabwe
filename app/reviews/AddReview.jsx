import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
var {connect} = require('react-redux');
import { Link, browserHistory, hashHistory } from 'react-router';
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
            review: null,
            reviewItemId: null,
            rating: 0,
            companyItems: null,
            selectedCompanyItemId: null,
            selectedCompanyTitle: null,
            uid: null,
            calledFromOutside: false,
            isShowingModal: false,
            cancelOperation: false
        }
    }

    onGoBack = (evt) => {
        this.dispatch(errorActions.bbzClearError());
        browserHistory.goBack();
    }

    validateAddNewReviewParameters(companyItemId) {
        console.debug("validateAddNewReviewParameters",companyItemId);
        var {companyItems} = this.props;

        var isMatch = false;

        companyItems.map((companyItem) => {
            if (companyItem.companyItemId == companyItemId) {

                console.debug("Match",companyItem);

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
            this.setState({
                reviewItemId: nextProps.reviewOperation.data.reviewItemId,
                review: nextProps.reviewOperation.data.review,
                companyItemId: nextProps.reviewOperation.data.companyItemId,
                uid: nextProps.reviewOperation.data.uid,
                rating: nextProps.reviewOperation.data.rating
            });
        }
    }

    findDupeReviews(reviewItems, uid, companyItemId) {
        var dupes = [];
        if (reviewItems) {
            reviewItems.map((reviewItem) => {
                if (reviewItem.companyItemId == companyItemId && reviewItem.uid == uid) {
                    dupes.push(reviewItem);
                };
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
            <div className="bbz-general">
                <input ref="add" type="submit" value="Add New Review"/>
                {this.state.calledFromOutside && (
                    <input ref="cancel" type="submit" value="Cancel" onClick={this.onGoBack}/>)}
            </div>
        )
    }

    renderUpdateView() {
        return (
            <div className="bbz-general">
                <input ref="update" type="submit" value="Update" onClick={this.handleUpdate}/>
                <input ref="cancel" type="submit" value="Cancel" onClick={this.handleCancel}/>
            </div>)
    }

    resetInputs = () => {
        this.setState({
            reviewItemId: '',
            review: '',
            ration: 0
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
        if(this.state.cancelOperation){
            return;
        }

        this.dispatch(reviewsActions.startUpdateReviewItem(
            this.state.reviewItemId,
            this.state.review,
            this.state.rating));

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

        } else {
            error.errorMessage = "review comment required";
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

    onChangeReviewComment =(e)=>{
        this.setState({review: e.target.value});
    }


    onCompanyItemIdChange = (val) => {
        let companyItemId = get(val, 'value');
        let companyTitle = get(val, 'label');
        this.setState({selectedCompanyItemId: companyItemId, selectedCompanyTitle: companyTitle});
    }

    renderCompanySelect(){
        var selectedCompanyItemIds =[];
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
            <div className="form-group">
                <Error/>
                <form onSubmit={this.handleSubmit}>
                    {this.renderModalFeedback(redirectUrl)}
                    {this.state.calledFromOutside && (<Link onClick={this.onGoBack}>Back</Link>)}
                    {this.state.operation === 'ADD' && (<label htmlFor="company-item-id">Company</label>)}
                    {this.state.operation === 'ADD' && this.renderCompanySelect()}
                    <label htmlFor="sreview">Review Comment</label>
                    <input type="text" name="review" ref="review" value={this.state.review}
                           placeholder="Review Comment" onChange={this.onChangeReviewComment}/>
                    <label htmlFor="rating">Rating</label>
                    <Rate
                        defaultValue={this.state.rating}
                        onChange={(index) => {
                            this.setState({rating: index});
                        }}
                        style={{fontSize: 40}}
                        allowHalf
                        value={this.state.rating}
                    />
                    {this.state.operation === 'ADD' && this.renderAddView()}
                    {this.state.operation === 'UPDATE' && this.renderUpdateView()}
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