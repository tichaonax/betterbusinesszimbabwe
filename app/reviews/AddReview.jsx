import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
var {connect} = require('react-redux');
import {Link, browserHistory, hashHistory} from 'react-router';
import get from 'lodash.get';
var Rate = require('rc-rate');
import Select from 'react-select';
var companiesSqliteActions = require('companiesSqliteActions');
var reviewsActions = require('reviewsActions');
var servicesActions = require('servicesActions');
var errorActions = require('errorActions');
var urlActions = require('urlActions');
import Error from 'Error';
import Categories from 'serviceCategories';
import {toggleUpdatePanel} from 'app/common/Utils';


export class AddReview extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;

        this.maxReviewCharacters = 300;
        this.state = {
            operation: 'ADD',
            companyItemId: null,
            review: '',
            reviewItemId: null,
            rating: 0,
            isApproved: false,
            companyItems: [],
            companyItemId: null,
            selectedCompanyItemId: null,
            selectedCompanyTitle: '',
            uid: 0,
            calledFromOutside: false,
            isShowingModal: false,
            cancelOperation: false,
            remainingCharacters: null,
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
        //console.debug("validateAddNewReviewParameters", companyItemId);
        var {companyItems} = this.props;

        var isMatch = false;

        companyItems.map((companyItem) => {
            if (companyItem.companyItemId == companyItemId) {

                //console.debug("Match", companyItem);

                this.state = {
                    selectedCompanyItemId: companyItem.companyItemId,
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
            this.dispatch(reviewsActions.setAddReviewOperation());
        }

        if (location && location.query) {
            this.validateAddNewReviewParameters(location.query.company);
        } else {
            this.dispatch(companiesSqliteActions.startAddCompanyItems());
        }
    }

    componentDidMount() {
        this.loadData(this.props);
        if (this.props.recentlyAddedCompany.companyItemId != '') {
            //console.debug("this.props.recentlyAddedCompany", this.props.recentlyAddedCompany);
            this.setState({
                selectedCompanyItemId: this.props.recentlyAddedCompany.companyItemId,
                selectedCompanyTitle: this.props.recentlyAddedCompany.companyTitle
            });
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
                reviewItemId: newProps.reviewItemId,
                review: newProps.review,
                companyItemId: newProps.companyItemId,
                uid: newProps.uid,
                rating: newProps.rating,
                isApproved: newProps.isApproved
            });

            if (newProps.review && newProps.review.length > 0) {
                this.setState({
                    remainingCharacters: ((this.maxReviewCharacters - newProps.review.length) + ' remaining')
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

    renderModalFeedback() {
        var {redirectUrl} = this.props;
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
                                        toggleUpdatePanel();
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
            reviewItemId: '',
            review: '',
            rating: 0,
            remainingCharacters: null,
            selectedCompanyItemId: ''
        });
    }

    getReviewerAvatar = (owner = false) => {
        var {auth} = this.props;
        let photoURL = "images/no-image.png";

        if (auth.uid == this.state.uid || owner) {
            if (auth.photoURL) {
                photoURL = auth.photoURL;
                //console.debug("Photo Owner", auth.photoURL);
            }
        } else {
            //console.debug("Not Owner", auth.photoURL);
            photoURL = null;
        }

        //console.debug("Saved Photo", photoURL);
        return photoURL;
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.resetInputs();
        this.setState({
            cancelOperation: true,
        });
        this.dispatch(errorActions.bbzClearError());
        this.dispatch(reviewsActions.setAddReviewOperation());
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
            this.state.companyItemId,
            this.getReviewerAvatar(),
            this.state.uid,
            this.state.isApproved
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
            if (review.length > this.maxReviewCharacters) {
                error.errorMessage = `Review comment exceeds maximum ${this.maxReviewCharacters} characters`;
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

        console.debug("this.state.rating",this.state.rating);
        if (!this.state.rating || this.state.rating == 0) {
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
            userProfile.email,
            this.getReviewerAvatar(true)
        ));

        this.resetInputs();

        this.setState({isShowingModal: true},
            ()=>{
                if (!this.state.calledFromOutside) {
                    this.dispatch(urlActions.setRedirectUrl(`myreviews?user=${auth.uid}&myreviews=true`));
                } else {
                    hashHistory.push(redirectUrl);
                }
            }
        );

        this.dispatch(errorActions.bbzClearError());
    }

    onChangeReviewComment = (e) => {
        this.setState({review: e.target.value});
        const textRemaining = this.maxReviewCharacters - e.target.value.length;
        this.setState({remainingCharacters: textRemaining + ' remaining'});
    }

    onCompanyItemIdChange = (val) => {
        let companyItemId = get(val, 'value');
        let companyTitle = get(val, 'label');
        this.setState({selectedCompanyItemId: companyItemId, selectedCompanyTitle: companyTitle});
    }

    renderCompanySelect() {
        var {auth} = this.props;
        var selectedCompanyItemIds = [];
        var companyItems = this.state.companyItems;
        if (companyItems) {
            companyItems.map((companyItem) => {
                if (companyItem.isApproved || companyItem.uid == auth.uid) {
                    selectedCompanyItemIds.push({value: companyItem.companyItemId, label: companyItem.companyTitle});
                }
            });

            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-10">
                            <div className="form-group">
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
                        </div>
                        <div className="col-sm-1">
                            <div className="form-group">
                                <Link to={`/addcompany?addnew=true`} activeClassName="active"
                                      activeStyle={{fontWeight: 'bold'}}>
                                    <span className="glyphicon glyphicon-plus button" data-toggle="tooltip"
                                          title="Add New Company!" onClick={() => {
                                        //this.dispatch(servicesActions.addServiceItems(Categories.getServices()));
                                        this.dispatch(servicesActions.startAddServiceItems());
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
                                    {this.renderModalFeedback()}
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