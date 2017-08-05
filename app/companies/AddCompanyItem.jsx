var React = require('react');
var {connect} = require('react-redux');
import Select from 'react-select';
import get from 'lodash.get';
import {Link, browserHistory, hashHistory} from 'react-router';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
var companiesSqliteActions = require('companiesSqliteActions');
var searchActions = require('searchActions');
var errorActions = require('errorActions');
import Error from 'Error';
import {closeUpdatePanel} from 'app/common/Utils';

export class AddCompnayItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;

        this.maxCompanyCharacters = 300;

        this.state = {
            operation: 'ADD',
            companyTitle: '',
            companyDesc: '',
            companyId: '',
            serviceItems: undefined,
            selectedServiceId: '',
            selectedCategory: '',
            rating: 0,
            remainingCharacters: null,
            cancelOperation: false,
            isShowingModal: false
        }
    }

    componentDidMount() {
        this.loadData(this.props);
    }

    onGoBack = (evt) => {
        this.dispatch(errorActions.bbzClearError());
        if (this.state.calledFromOutside == true) {
            browserHistory.goBack();
        } else {
            this.resetInputs();
        }
    }

    componentWillUnmount() {
        this.dispatch(searchActions.setSearchText(""));
    }

    loadData(props) {
        const {error, location} = props;
        if (error) {
            this.dispatch(errorActions.bbzClearError());
        }

        if (location && location.query) {
            if (location.query.addnew == 'true') {
                this.state = {
                    calledFromOutside: true
                }
            } else {
                this.dispatch(companiesSqliteActions.setAddCompanyOperation());
            }
        }
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            operation: nextProps.companyOperation.operation
        });

        if (nextProps.companyOperation.data) {
            const newProps = nextProps.companyOperation.data;
            //console.log("newProps",newProps);
            this.setState({
                companyId: newProps.companyId,
                companyTitle: newProps.companyTitle,
                rating: nextProps.companyOperation.data.rating,
                companyDesc: newProps.companyDesc,
                selectedServiceId: newProps.selectedServiceId,
                serviceCategory: newProps.serviceCategory
            });

            if (newProps.companyDesc && newProps.companyDesc.length > 0) {
                this.setState({
                    remainingCharacters: ((this.maxCompanyCharacters - newProps.companyDesc.length) + ' remaining')
                });
            }
        }
    }

    findDupeCompanies(companyTitle, companyItems) {
        var dupes = [];
        if (companyItems) {
            companyItems.map((companyItem) => {
                if (companyItem.companyTitle.toLowerCase() === companyTitle.toLowerCase()) {
                    dupes.push(companyItems);
                }
                ;
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
                                            closeUpdatePanel();
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
                                        closeUpdatePanel();
                                        this.handleUpdate(event);
                                    }
                                }}>
                            {this.state.operation === 'ADD' && ('Add New Company')}
                            {this.state.operation === 'UPDATE' && ('Update Review')}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    resetInputs = () => {
        this.setState({
            companyId: '',
            companyTitle: '',
            companyDesc: '',
            selectedServiceId: null,
            serviceCategory: null
        });
        this.dispatch(searchActions.setSearchText(""));
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.resetInputs();
        this.setState({
            cancelOperation: true,
        });
        this.dispatch(companiesSqliteActions.setAddCompanyOperation());
        this.dispatch(errorActions.bbzClearError());
    }

    validateUpdateValues(error, companyTitle, companyDesc, companyItems) {

        if (companyTitle.length > 0) {

        } else {
            error.errorMessage = "Company title required";
            this.dispatch(errorActions.bbzReportError(error));
            this.refs.companyTitle.focus();
            return false;
        }

        if (this.findDupeCompanies(companyTitle, companyItems).length > 1) {
            error.errorMessage = "This company title is in the list of existing companies, please enter a unique name!";
            this.dispatch(errorActions.bbzReportError(error));
            this.refs.companyTitle.focus();
            return false;
        }

        if (companyDesc.length > 0) {

        } else {
            error.errorMessage = "Company description required";
            this.dispatch(errorActions.bbzReportError(error));
            this.refs.companyDesc.focus();
            return false;
        }

        return true;

    }

    handleUpdate = (e) => {
        e.preventDefault();
        if (this.state.cancelOperation) {
            return;
        }

        var {companyItems} = this.props;

        var companyTitle = this.refs.companyTitle.value;
        var companyDesc = this.refs.companyDesc.value;

        var error = {}

        if (!this.validateUpdateValues(error, companyTitle, companyDesc, companyItems)) {
            return
        }

        toggleUpdatePanel();

        this.dispatch(companiesSqliteActions.startUpdateCompanyItem(
            this.state.companyId,
            this.state.companyTitle,
            this.state.companyDesc,
            this.state.rating,
            this.state.selectedServiceId,
            this.state.selectedCategory
        ));

        this.resetInputs();
        this.dispatch(errorActions.bbzClearError());
        this.dispatch(companiesSqliteActions.setAddCompanyOperation());
        window.scrollTo(0, 0);
    }


    validateSubmitValues(error, companyTitle, companyDesc, companyItems) {

        if (companyTitle.length > 0) {

        } else {
            error.errorMessage = "Company title required";
            this.dispatch(errorActions.bbzReportError(error));
            this.refs.companyTitle.focus();
            return false;
        }

        if (this.findDupeCompanies(companyTitle, companyItems).length != 0) {
            error.errorMessage = "This company title is in the list of companies provided, please enter a uniquie name!";
            this.dispatch(errorActions.bbzReportError(error));
            this.refs.companyTitle.focus();
            return false;
        }

        if (companyDesc.length > 0) {

        } else {
            error.errorMessage = "Company description required";
            this.dispatch(errorActions.bbzReportError(error));
            this.refs.companyDesc.focus();
            return false;
        }

        return true;

    }

    handleSubmit = (e) => {
        e.preventDefault();
        var {userProfile, companyItems, redirectUrl} = this.props;

        var companyTitle = this.refs.companyTitle.value;
        var companyDesc = this.refs.companyDesc.value;

        var error = {}

        if (this.state.selectedServiceId == null) {
            error.errorMessage = "You must select Service Category";
            this.dispatch(errorActions.bbzReportError(error));
            this.refs.serviceSelect.focus();
            return false;
        }

        if (!this.validateSubmitValues(error, companyTitle, companyDesc, companyItems)) {
            return
        }

        this.resetInputs();

        this.dispatch(errorActions.bbzClearError());

        this.dispatch(companiesSqliteActions.startAddNewCompanyItem(
            userProfile.userId,
            companyTitle,
            companyDesc,
            this.state.selectedServiceId,
            this.state.selectedCategory
        ));

        if (this.state.calledFromOutside) {
            console.debug("redirectUrl calledFromOutside", redirectUrl);
            this.state = {
                isShowingModal: true
            }
        }
        window.scrollTo(0, 0);
    }

    onChangeCompanyTitle = (e) => {
        this.setState({companyTitle: e.target.value});
    }

    onChangeCompanyDesc = (e) => {
        this.setState({companyDesc: e.target.value});
        const textRemaining = this.maxCompanyCharacters - e.target.value.length;
        this.setState({remainingCharacters: textRemaining + ' remaining'});
    }

    onServiceItemIdChange = (val) => {
        let serviceId = get(val, 'value');
        let serviceCategory = get(val, 'label');
        this.setState({selectedServiceId: serviceId, selectedCategory: serviceCategory});
    }

    renderServiceSelect() {
        var selectedServiceIds = [];
        var serviceItems = this.props.serviceItems;
        if (serviceItems) {
            serviceItems.map((serviceItem) => {
                selectedServiceIds.push({value: serviceItem.serviceId, label: serviceItem.serviceCategory});
            });

            return (
                <div>
                    <Select
                        ref="serviceSelect"
                        name="service"
                        value={this.state.selectedServiceId}
                        options={selectedServiceIds}
                        onChange={this.onServiceItemIdChange}
                        matchPos="start"
                        ignoreCase={true}
                        clearable={false}
                    />
                </div>
            );
        } else {
            return null
        }
    }

    onModalClick = () => this.setState({isShowingModal: true});

    renderModalFeedback(redirectUrl) {
        return (
            <div onClick={() => {
                this.onModalClick(event);
            }}>
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
                            <h1>Thank you, Company Added!</h1>
                            <p>After review by Admin it will be made available to the public.</p>
                            <p>However in the meantime you can add a review immedediatley to the new company</p>
                        </ModalDialog>
                    </ModalContainer>}

            </div>);
    }

    render() {
        var {redirectUrl} = this.props;
        return (
            <div className="col-sm-12">
                <div className="review-block">
                    <div className="row">
                        <div className="col-sm-12">
                            <Error/>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            {this.renderModalFeedback(redirectUrl)}
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <div>
                                            <label htmlFor="service-item-id">Service Category</label>
                                        </div>
                                        <div>
                                            {this.renderServiceSelect()}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        {this.state.calledFromOutside && (<Link onClick={
                                            () => {
                                                this.onGoBack(event);
                                            }
                                        }>Back &nbsp;</Link>)}
                                        <div>
                                            <label htmlFor="stitle">Company Name</label>
                                        </div>
                                        <div>
                                            <input type="text" name="companyTitle" ref="companyTitle"
                                                   className="form-control" maxLength={100}
                                                   value={this.state.companyTitle}
                                                   placeholder="Company Name" onChange={this.onChangeCompanyTitle}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="sdescription">Company Description</label>
                                        <textarea type="text" name="companyDesc" ref="companyDesc" acceptCharset="UTF-8"
                                                  className="form-control col-sm-4 well" rows="3"
                                                  maxLength={this.maxCompanyCharacters}
                                                  value={this.state.companyDesc}
                                                  placeholder="Company Description"
                                                  onChange={this.onChangeCompanyDesc}/>
                                        <h6 className="pull-right">{this.state.remainingCharacters}</h6>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        {this.renderAddAUpdateView()}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            auth: state.auth,
            userProfile: state.userProfile,
            companyItems: state.companyItems,
            companyOperation: state.companyOperation,
            serviceItems: state.serviceItems,
            redirectUrl: state.redirectUrl
        }
    }
)(AddCompnayItem);