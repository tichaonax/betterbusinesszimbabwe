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
            companyTitle: null,
            companyDesc: null,
            companyItemId: null,
            serviceItems: null,
            selectedServiceItemId: null,
            selectedCategory: null,
            rating: 0
        }
    }

    componentDidMount() {
        const {error} = this.props;
        if (error) {
            this.dispatch(errorActions.bbzClearError());
            this.dispatch(companiesActions.setAddCompanyOperation());
        }
    }


    componentWillReceiveProps(nextProps) {

        this.setState({operation: nextProps.companyOperation.operation});
        //this.setState({serviceItems: nextProps.serviceItems});

        if (nextProps.companyOperation.data) {
            this.setState({
                companyItemId: nextProps.companyOperation.data.companyItemId,
                companyTitle: nextProps.companyOperation.data.companyTitle,
                rating: nextProps.companyOperation.data.rating,
                companyDesc: nextProps.companyOperation.data.companyDesc,
                selectedServiceItemId: nextProps.companyOperation.data.selectedServiceItemId,
                serviceCategory: nextProps.companyOperation.data.serviceCategory
            });
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


    renderAddView = () => {
        return (
            <div className="bbz-general">
                <input ref="add" type="submit" value="Add New Company"/>
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

    onChangeCompanyTitle =(e)=>{
        this.setState({companyTitle: e.target.value});
    }

    onChangeCompanyDesc =(e)=>{
        this.setState({companyDesc: e.target.value});
    }

    onServiceItemIdChange = (val) => {
        let serviceItemId = get(val, 'value');
        let serviceTitle = get(val, 'label');
        this.setState({selectedServiceItemId: serviceItemId, selectedCategory: serviceTitle});
    }

    renderServiceSelect(){
        var selectedServiceItemIds =[];
        var serviceItems = this.props.serviceItems;//state.serviceItems;
        if (serviceItems) {

            serviceItems.map((serviceItem) => {
                selectedServiceItemIds.push({value: serviceItem.serviceItemId, label: serviceItem.serviceTitle});
            });

           // console.debug("selectedServiceItemIds",selectedServiceItemIds);

            return (
                <div>
                    <Select
                        ref="serviceSelect"
                        name="service-select"
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
            <div className="bbz-general">
                <div className="form-group">
                    <Error/>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="service-item-id">Service Category</label>
                        {this.renderServiceSelect()}
                        <label htmlFor="stitle">Company Title</label>
                        <input type="text" name="companyTitle" ref="companyTitle" value={this.state.companyTitle}
                               placeholder="Company Title" onChange={this.onChangeCompanyTitle}/>
                        <label htmlFor="sdescription">Company Description</label>
                        <input type="text" name="companyDesc" ref="companyDesc" value={this.state.companyDesc}
                               placeholder="Company Description" onChange={this.onChangeCompanyDesc}/>
                        {this.state.operation === 'ADD' && this.renderAddView()}
                        {this.state.operation === 'UPDATE' && this.renderUpdateView()}
                    </form>
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