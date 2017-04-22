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
    }

    componentDidMount() {
        const {dispatch, currentURL, isLoggedIn, error} = this.props;
        if (error) {
            dispatch(errorActions.bbzClearError());
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var error = {}
        var {dispatch} = this.props;
        var serviceTitle = this.refs.serviceTitle.value;

        if (serviceTitle.length > 0) {

        } else {
            error.errorMessage = "Service title required";
            dispatch(errorActions.bbzReportError(error));
            this.refs.serviceTitle.focus();
            return
        }

        var serviceDesc = this.refs.serviceDesc.value;
        if (serviceDesc.length > 0) {

        } else {
            error.errorMessage = "Service description required";
            dispatch(errorActions.bbzReportError(error));
            this.refs.serviceDesc.focus();
            return
        }

        this.refs.serviceTitle.value = '';
        this.refs.serviceDesc.value = '';
        dispatch(errorActions.bbzClearError());
        dispatch(servicesActions.startAddNewServiceItem(serviceTitle, serviceDesc));
    }

    render() {

        return (
            <div className="form-group admin-services">
                <div>
                    <Error/>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="stitle">Service Title</label>
                        <input type="text" name="serviceTitle" ref="serviceTitle" placeholder="Service Title"/>

                        <label htmlFor="sdescription">Service Description</label>
                        <input type="text" name="serviceDesc" ref="serviceDesc" placeholder="Service Description"/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect()(AddServiceItem);