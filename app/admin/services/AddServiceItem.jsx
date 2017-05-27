var React = require('react');
var {connect} = require('react-redux');
var servicesActions = require('servicesActions');
var errorActions = require('errorActions');
import Error from 'Error';

export class AddServiceItem extends React.Component {
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
            dispatch(servicesActions.setAddServiceOperation());
        }
    }


    componentWillReceiveProps(nextProps) {

        this.setState({operation: nextProps.serviceOperation.operation});

        if (nextProps.serviceOperation.data) {
            this.setState({
                serviceItemId: nextProps.serviceOperation.data.serviceItemId,
                serviceTitle: nextProps.serviceOperation.data.serviceTitle,
                serviceDesc: nextProps.serviceOperation.data.serviceDesc
            });
        }
    }

    findDupeServices(serviceTitle, serviceItems) {
        var dupes =[];
        serviceItems.map((serviceItem) => {
            if(serviceItem.serviceTitle.toLowerCase() === serviceTitle.toLowerCase()){
                dupes.push(serviceItem);
            };
        });
        return dupes;
    }


    renderAddView = () => {
        return (
            <input ref="add" type="submit" value="Add New Service"/>
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
            serviceItemId: '',
            serviceTitle: '',
            serviceDesc: ''
        });
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.dispatch(servicesActions.setAddServiceOperation());
        this.resetInputs();
    }

    handleUpdate = (e) => {
        e.preventDefault();

        this.dispatch(servicesActions.startUpdateServiceItem(
            this.state.serviceItemId,
            this.state.serviceTitle,
            this.state.serviceDesc));

        this.resetInputs();

        this.dispatch(servicesActions.setAddServiceOperation());
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var {serviceItems} = this.props;

        var error = {}
        var {dispatch} = this.props;
        var serviceTitle = this.refs.serviceTitle.value;

        if (serviceTitle.length > 0) {

        } else {
            error.errorMessage = "Service title required";
            dispatch(errorActions.bbzReportError(error));
            this.refs.serviceTitle.focus();
            return;
        }

        if (this.findDupeServices(serviceTitle, serviceItems).length != 0) {
            error.errorMessage = "This service title is in the list of services provided, please enter a different one!";
            dispatch(errorActions.bbzReportError(error));
            this.refs.serviceTitle.focus();
            return;
        }

        var serviceDesc = this.refs.serviceDesc.value;
        if (serviceDesc.length > 0) {

        } else {
            error.errorMessage = "Service description required";
            dispatch(errorActions.bbzReportError(error));
            this.refs.serviceDesc.focus();
            return;
        }

        this.resetInputs();
        dispatch(errorActions.bbzClearError());
        dispatch(servicesActions.startAddNewServiceItem(serviceTitle, serviceDesc));
    }

    onChangeServiceTitle =(e)=>{
        this.setState({serviceTitle: e.target.value});
    }

    onChangeServiceDesc =(e)=>{
        this.setState({serviceDesc: e.target.value});
    }

    //****TODO call this method when a serviceCategory changes
    //startUpdateCompaniesCategory

    render() {

        return (
            <div className="bbz-general">
                <div className="form-group">
                    <Error/>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="stitle">Service Title</label>
                        <input type="text" name="serviceTitle" ref="serviceTitle" value={this.state.serviceTitle}
                               placeholder="Service Title" onChange={this.onChangeServiceTitle}/>
                        <label htmlFor="sdescription">Service Description</label>
                        <input type="text" name="serviceDesc" ref="serviceDesc" value={this.state.serviceDesc}
                               placeholder="Service Description" onChange={this.onChangeServiceDesc}/>
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
            serviceItems: state.serviceItems,
            serviceOperation: state.serviceOperation
        }
    }
)(AddServiceItem);