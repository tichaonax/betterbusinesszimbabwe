var React = require('react');
var {connect} = require('react-redux');
var servicesActions = require('servicesActions');
var errorActions = require('errorActions');
import Error from 'Error';

export class AddServiceItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;

        this.state = {
            operation: 'ADD',
            serviceId: 0,
            serviceTitle: '',
            serviceItemId: ''
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
                serviceId: nextProps.serviceOperation.data.serviceId
            });
        }
    }

    findDupeServices(serviceTitle, serviceItems) {
        var dupes = [];
        serviceItems.map((serviceItem) => {
            if (serviceItem.serviceTitle.toLowerCase() === serviceTitle.toLowerCase()) {
                dupes.push(serviceItem);
            }
            ;
        });
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
                            {this.state.operation === 'ADD' && ('Add New Service')}
                            {this.state.operation === 'UPDATE' && ('Update Service')}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    resetInputs = () => {
        this.setState({
            serviceItemId: '',
            serviceTitle: '',
            serviceId: 0
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

        this.resetInputs();
        dispatch(errorActions.bbzClearError());
        dispatch(servicesActions.startAddNewServiceItem(serviceTitle));
    }

    onChangeServiceTitle = (e) => {
        this.setState({serviceTitle: e.target.value});
    }

    //****TODO call this method when a serviceCategory changes
    //startUpdateCompaniesCategory

    render() {
        return (
            <div className="col-sm-12">
                <div className="review-block">
                    <div className="row">
                        <div className="col-sm-12">
                            <Error/>
                        </div>
                    </div>
                    <div className="form-group">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="stitle">Service Title</label>
                                <input className="form-control" type="text" name="serviceTitle" ref="serviceTitle"
                                       value={this.state.serviceTitle} maxLength={50}
                                       placeholder="Service Title" onChange={this.onChangeServiceTitle}/>
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
            serviceItems: state.serviceItems,
            serviceOperation: state.serviceOperation
        }
    }
)(AddServiceItem);