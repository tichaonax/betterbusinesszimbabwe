var React = require('react');
var {connect} = require('react-redux');
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
            serviceTitle: null,
            serviceDesc: null,
            serviceItemId: null
        }
    }

    componentDidMount() {
        const {dispatch, error} = this.props;
        if (error) {
            dispatch(errorActions.bbzClearError());
            dispatch(companiesActions.setAddCompanyOperation());
        }
    }


    componentWillReceiveProps(nextProps) {

        this.setState({operation: nextProps.serviceOperation.operation});

        if (nextProps.serviceOperation.data) {
            this.setState({
                companyItemId: nextProps.companyOperation.data.companyItemId,
                companyTitle: nextProps.companyOperation.data.companyTitle,
                companyDesc: nextProps.companyOperation.data.companyDesc
            });
        }
    }

    findDupeCompanies(companyTitle, companyItems) {
        var dupes =[];
        companyItems.map((companyItem) => {
            if(companyItem.companyTitle.toLowerCase() === companyTitle.toLowerCase()){
                dupes.push(companyItems);
            };
        });
        return dupes;
    }


    renderAddView = () => {
        return (
            <input ref="add" type="submit" value="Add New Company"/>
        )
    }

    renderUpdateView() {
        return (
            <div>
                <input ref="update" type="submit" value="Update" onClick={this.handleUpdate}/>
                <input ref="cancel" type="submit" value="Cancel" onClick={this.handleCancel}/>
            </div>)
    }


    resetInputs = () => {
        this.setState({
            companyItemId: '',
            companyTitle: '',
            companyDesc: ''
        });
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.dispatch(companiesActions.setAddCompanyOperation());
        this.resetInputs();
    }

    handleUpdate = (e) => {
        e.preventDefault();

        this.dispatch(companiesActions.startUpdateCompanyItem(
            this.state.companyItemId,
            this.state.companyTitle,
            this.state.companyDesc));

        this.resetInputs();

        this.dispatch(companiesActions.setAddCompanyOperation());
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var {companyItems} = this.props;

        var error = {}
        var {dispatch} = this.props;
        var companyTitle = this.refs.companyTitle.value;

        if (companyTitle.length > 0) {

        } else {
            error.errorMessage = "Company title required";
            dispatch(errorActions.bbzReportError(error));
            this.refs.companyTitle.focus();
            return;
        }

        if (this.findDupeCompanies(companyTitle, companyItems).length != 0) {
            error.errorMessage = "This company title is in the list of companies provided, please enter a different one!";
            dispatch(errorActions.bbzReportError(error));
            this.refs.companyTitle.focus();
            return;
        }

        var companyDesc = this.refs.companyDesc.value;
        if (companyDesc.length > 0) {

        } else {
            error.errorMessage = "Company description required";
            dispatch(errorActions.bbzReportError(error));
            this.refs.companyDesc.focus();
            return;
        }

        this.resetInputs();
        dispatch(errorActions.bbzClearError());
        dispatch(companiesActions.startAddNewCompanyItem(companyTitle, companyDesc));
    }

    onChangeCompanyTitle =(e)=>{
        this.setState({companyTitle: e.target.value});
    }

    onChangeCompanyDesc =(e)=>{
        this.setState({companyDesc: e.target.value});
    }

    render() {

        return (
            <div className="form-group admin-companies">
                <div>
                    <Error/>
                    <form onSubmit={this.handleSubmit}>
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
            companyItems: state.companyItems,
            companyOperation: state.companyOperation
        }
    }
)(AddCompnayItem);