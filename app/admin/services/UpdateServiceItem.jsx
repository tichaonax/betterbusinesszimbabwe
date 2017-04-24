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
        const {dispatch, serviceOperation, error} = this.props;
        if (error) {
            dispatch(errorActions.bbzClearError());
        }

        var {serviceOperation} = this.props;

        if (serviceOperation.data) {
            this.setState({
                operation: serviceOperation.operation,
                serviceItemId: serviceOperation.data.serviceItemId,
                serviceTitle: serviceOperation.data.serviceTitle,
                serviceDesc: serviceOperation.data.serviceDesc
            });

           // dispatch(servicesActions.setAddServiceOperation());
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

    handleCancel = (e) => {
        e.preventDefault();
        this.dispatch(servicesActions.setAddServiceOperation());
    }

    handleUpdate = (e) => {
        e.preventDefault();

        this.dispatch(servicesActions.startUpdateServiceItem(
            this.state.serviceItemId,
            this.state.serviceTitle,
            this.state.serviceDesc));

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

        //we need to check if this an update or a new

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

        this.refs.serviceTitle.value = '';
        this.refs.serviceDesc.value = '';
        dispatch(errorActions.bbzClearError());
        dispatch(servicesActions.startAddNewServiceItem(serviceTitle, serviceDesc));
    }

    onChangeServiceTitle =(e)=>{
        console.debug("onChangeServiceTitle:", e.target.value);
        this.setState({serviceTitle: e.target.value});
    }

    onChangeServiceDesc =(e)=>{
        console.debug("onChangeServiceDesc:", e.target.value);
        this.setState({serviceDesc: e.target.value});
    }

    render() {
        return (
            <div className="form-group admin-services">
                <div>
                    <Error/>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="stitle">Service Title</label>
                        <input type="text" name="serviceTitle" ref="serviceTitle" value={this.state.serviceTitle}
                               placeholder="Service Title" onChange={this.onChangeServiceTitle}/>
                        <label htmlFor="sdescription">Service Description</label>
                        <input type="text" name="serviceDesc" ref="serviceDesc" value={this.state.serviceDesc}
                               placeholder="Service Description" onChange={this.onChangeServiceDesc}/>
                        <input ref="update" type="submit" value="Update" onClick={this.handleUpdate}/>
                        <input ref="cancel" type="submit" value="Cancel" onClick={this.handleCancel}/>
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