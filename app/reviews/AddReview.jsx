var React = require('react');
var {connect} = require('react-redux');
var companiesActions = require('companiesActions');
var errorActions = require('errorActions');
import Error from 'Error';

export class AddReview extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.state = {
            operation: 'ADD',
            review: null,
            reviewDesc: null,
            reviewItemId: null
        }
    }

    componentDidMount() {
        const {error} = this.props;
        if (error) {
            this.dispatch(errorActions.bbzClearError());
            this.dispatch(companiesActions.setAddReviewOperation());
        }
    }


    componentWillReceiveProps(nextProps) {

        this.setState({operation: nextProps.reviewOperation.operation});

        if (nextProps.reviewOperation.data) {
            this.setState({
                reviewItemId: nextProps.reviewOperation.data.reviewItemId,
                review: nextProps.reviewOperation.data.review,
                reviewDesc: nextProps.reviewOperation.data.reviewDesc
            });
        }
    }

    findDupeCompanies(review, reviewItems) {
        var dupes =[];
        reviewItems.map((reviewItem) => {
            if(reviewItem.review.toLowerCase() === review.toLowerCase()){
                dupes.push(reviewItems);
            };
        });
        return dupes;
    }


    renderAddView = () => {
        return (
            <input ref="add" type="submit" value="Add New Review"/>
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
            reviewItemId: '',
            review: '',
            reviewDesc: ''
        });
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.dispatch(companiesActions.setAddReviewOperation());
        this.resetInputs();
        this.dispatch(errorActions.bbzClearError());
    }

    handleUpdate = (e) => {
        e.preventDefault();

        this.dispatch(companiesActions.startUpdateReviewItem(
            this.state.reviewItemId,
            this.state.review,
            this.state.reviewDesc));

        this.resetInputs();
        this.dispatch(errorActions.bbzClearError());
        this.dispatch(companiesActions.setAddReviewOperation());
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var {auth, reviewItems} = this.props;

        var error = {}
        var review = this.refs.review.value;

        if (review.length > 0) {

        } else {
            error.errorMessage = "review text required";
            this.dispatch(errorActions.bbzReportError(error));
            this.refs.review.focus();
            return;
        }


        var reviewDesc = this.refs.reviewDesc.value;
        if (reviewDesc.length > 0) {

        } else {
            error.errorMessage = "Review description required";
            this.dispatch(errorActions.bbzReportError(error));
            this.refs.reviewDesc.focus();
            return;
        }

        this.resetInputs();
        this.dispatch(errorActions.bbzClearError());
        this.dispatch(companiesActions.startAddNewReviewItem(auth.uid, review, reviewDesc));
    }

    onChangeReviewTitle =(e)=>{
        this.setState({review: e.target.value});
    }

    onChangeReviewDesc =(e)=>{
        this.setState({reviewDesc: e.target.value});
    }

    render() {

        return (
            <div className="form-group bbz-general">
                <div>
                    <Error/>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="stitle">Review Title</label>
                        <input type="text" name="review" ref="review" value={this.state.review}
                               placeholder="Review Title" onChange={this.onChangeReviewTitle}/>
                        <label htmlFor="sdescription">Review Description</label>
                        <input type="text" name="reviewDesc" ref="reviewDesc" value={this.state.reviewDesc}
                               placeholder="Review Description" onChange={this.onChangeReviewDesc}/>
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
            reviewOperation: state.reviewOperation
        }
    }
)(AddReview);