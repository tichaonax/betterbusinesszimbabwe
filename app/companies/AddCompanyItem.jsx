var React = require('react');
var {connect} = require('react-redux');
import Select from 'react-select';
import get from 'lodash.get';
var companiesActions = require('companiesActions');
var errorActions = require('errorActions');
import Error from 'Error';

export class AddCompnayItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.state = {
            operation: 'ADD',
            companyTitle: '',
            companyDesc: '',
            companyItemId: '',
            serviceItems: undefined,
            selectedServiceItemId: '',
            selectedCategory: '',
            rating: 0,
            remainingCharacters: '',
            maxReviewCharacters: 300
        }
    }

    componentDidMount() {
        const {error} = this.props;
        if (error) {
            this.dispatch(errorActions.bbzClearError());
            this.dispatch(companiesActions.setAddCompanyOperation());
        }
        // this.setState({selectedServiceItemId: serviceItemId, selectedCategory: serviceTitle});
    }


    componentWillReceiveProps(nextProps) {

        this.setState({operation: nextProps.companyOperation.operation});
        //this.setState({serviceItems: nextProps.serviceItems});

        if (nextProps.companyOperation.data) {
            const newProps = nextProps.companyOperation.data;
            this.setState({
                companyItemId: newProps.companyItemId,
                companyTitle: newProps.companyTitle,
                rating: nextProps.companyOperation.data.rating,
                companyDesc: newProps.companyDesc,
                selectedServiceItemId: newProps.selectedServiceItemId,
                serviceCategory: newProps.serviceCategory
            });


            if (newProps.companyDesc && newProps.companyDesc.length > 0) {
                this.setState({
                    remainingCharacters: ((this.state.maxReviewCharacters - newProps.review.length) + ' remaining')
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
                                        this.handleCancel(event);
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
            companyItemId: '',
            companyTitle: '',
            companyDesc: '',
            selectedServiceItemId: null,
            serviceCategory: null
        });
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.dispatch(companiesActions.setAddCompanyOperation());
        this.resetInputs();
        this.dispatch(errorActions.bbzClearError());
    }

    handleUpdate = (e) => {
        e.preventDefault();

        //*********to do validate inputs

        this.dispatch(companiesActions.startUpdateCompanyItem(
            this.state.companyItemId,
            this.state.companyTitle,
            this.state.companyDesc,
            this.state.rating,
            this.state.selectedServiceItemId,
            this.state.selectedCategory
        ));

        this.resetInputs();
        this.dispatch(errorActions.bbzClearError());
        this.dispatch(companiesActions.setAddCompanyOperation());
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var {auth, companyItems} = this.props;

        var error = {}

        if (this.state.selectedServiceItemId == null) {
            error.errorMessage = "You must select Service Category";
            this.dispatch(errorActions.bbzReportError(error));
            this.refs.serviceSelect.focus();
            return;
        }

        var companyTitle = this.refs.companyTitle.value;

        if (companyTitle.length > 0) {

        } else {
            error.errorMessage = "Company title required";
            this.dispatch(errorActions.bbzReportError(error));
            this.refs.companyTitle.focus();
            return;
        }

        if (this.findDupeCompanies(companyTitle, companyItems).length != 0) {
            error.errorMessage = "This company title is in the list of companies provided, please enter a uniquie name!";
            this.dispatch(errorActions.bbzReportError(error));
            this.refs.companyTitle.focus();
            return;
        }

        var companyDesc = this.refs.companyDesc.value;
        if (companyDesc.length > 0) {

        } else {
            error.errorMessage = "Company description required";
            this.dispatch(errorActions.bbzReportError(error));
            this.refs.companyDesc.focus();
            return;
        }

        this.resetInputs();
        this.dispatch(errorActions.bbzClearError());
        this.dispatch(companiesActions.startAddNewCompanyItem(
            auth.uid,
            companyTitle,
            companyDesc,
            this.state.selectedServiceItemId,
            this.state.selectedCategory
        ));
    }

    onChangeCompanyTitle = (e) => {
        this.setState({companyTitle: e.target.value});
    }

    onChangeCompanyDesc = (e) => {
        this.setState({companyDesc: e.target.value});
        const textRemaining = this.state.maxReviewCharacters - e.target.value.length;
        this.setState({remainingCharacters: textRemaining + ' remaining'});
    }

    onServiceItemIdChange = (val) => {
        let serviceItemId = get(val, 'value');
        let serviceTitle = get(val, 'label');
        this.setState({selectedServiceItemId: serviceItemId, selectedCategory: serviceTitle});
    }

    renderServiceSelect() {
        var selectedServiceItemIds = [];
        var serviceItems = this.props.serviceItems;
        if (serviceItems) {

            serviceItems.map((serviceItem) => {
                selectedServiceItemIds.push({value: serviceItem.serviceItemId, label: serviceItem.serviceTitle});
            });

            return (
                <div>
                    <Select
                        ref="serviceSelect"
                        name="service"
                        value={this.state.selectedServiceItemId}
                        options={selectedServiceItemIds}
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

    render() {
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
                                    <div>
                                        <label htmlFor="stitle">Company Title</label>
                                    </div>
                                    <div><input type="text" name="companyTitle" ref="companyTitle" className="form-control" maxLength={100}
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
                                              maxLength={this.state.maxReviewCharacters}
                                              value={this.state.companyDesc}
                                              placeholder="Company Description" onChange={this.onChangeCompanyDesc}/>
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
            companyItems: state.companyItems,
            companyOperation: state.companyOperation,
            serviceItems: state.serviceItems
        }
    }
)(AddCompnayItem);