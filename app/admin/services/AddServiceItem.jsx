var React = require('react');
var {connect} = require('react-redux');
var servicesActions = require('servicesActions');
var errorActions = require('errorActions');
import Error from 'Error';
import {toggleUpdatePanel} from 'app/common/Utils';

export class AddServiceItem extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;

        this.state = {
            operation: 'ADD',
            serviceCategory: '',
            serviceId: 0
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
            console.log("data",nextProps.serviceOperation.data);
            this.setState({
                serviceItemId: nextProps.serviceOperation.data.serviceItemId,
                serviceCategory: nextProps.serviceOperation.data.serviceCategory,
                serviceId: nextProps.serviceOperation.data.serviceId
            });
        }
    }

    findDupeServices(serviceCategory, serviceItems) {
        var dupes = [];
        serviceItems.map((serviceItem) => {
            if (serviceItem.serviceCategory.toLowerCase() === serviceCategory.toLowerCase()) {
                dupes.push(serviceItem);
            };
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
                                        toggleUpdatePanel();
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
                                        toggleUpdatePanel();
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
            serviceCategory: '',
            serviceId: 0,
        });
        this.dispatch(errorActions.bbzClearError());
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.dispatch(servicesActions.setAddServiceOperation());
        this.resetInputs();
    }

    handleUpdate = (e) => {
        e.preventDefault();

        this.dispatch(servicesActions.startUpdateServiceItem(
            this.state.serviceId,
            this.state.serviceCategory,
            this.state.serviceDesc));

        this.resetInputs();

        this.dispatch(servicesActions.setAddServiceOperation());
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var {serviceItems} = this.props;

        var error = {}
        var {dispatch} = this.props;
        var serviceCategory = this.refs.serviceCategory.value;

        if (serviceCategory.length > 0) {

        } else {
            error.errorMessage = "Service title required";
            dispatch(errorActions.bbzReportError(error));
            this.refs.serviceCategory.focus();
            return;
        }

        if (this.findDupeServices(serviceCategory, serviceItems).length != 0) {
            error.errorMessage = "This service title is in the list of services provided, please enter a different one!";
            dispatch(errorActions.bbzReportError(error));
            this.refs.serviceCategory.focus();
            return;
        }

        this.resetInputs();
        dispatch(errorActions.bbzClearError());
        dispatch(servicesActions.startAddNewServiceItem(serviceCategory));
    }

    onChangeServiceCategory = (e) => {
        this.setState({serviceCategory: e.target.value});
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
                                <input className="form-control" type="text" name="serviceCategory" ref="serviceCategory"
                                       value={this.state.serviceCategory} maxLength={50}
                                       placeholder="Service Title" onChange={this.onChangeServiceCategory}/>
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