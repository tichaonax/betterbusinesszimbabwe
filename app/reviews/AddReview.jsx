var React = require('react');
var {connect} = require('react-redux');
import get from 'lodash.get';
import Rating from 'react-rating-system';
import Select from 'react-select';
var companiesActions = require('companiesActions');
var reviewsActions = require('reviewsActions');
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
            companyItemId: null,
            review: null,
            reviewItemId: null,
            rating: 0,
            companyItems: null,
            selectedCompanyItemId: null,
            selectedCompanyTitle: null,
            uid: null,
            loggedUid: null
        }
    }

    componentDidMount() {
        const {error} = this.props;
        if (error) {
            this.dispatch(errorActions.bbzClearError());
            this.dispatch(reviewsActions.setAddReviewOperation());
        }

        this.dispatch(companiesActions.startAddCompanyItems());
    }


    componentWillReceiveProps(nextProps) {

        this.setState({operation: nextProps.reviewOperation.operation});
        this.setState({companyItems: nextProps.companyItems});

        if (nextProps.reviewOperation.data) {
            this.setState({
                reviewItemId: nextProps.reviewOperation.data.reviewItemId,
                review: nextProps.reviewOperation.data.review,
                companyItemId: nextProps.reviewOperation.data.companyItemId,
                uid: nextProps.reviewOperation.data.uid
            });
            console.debug("uid: nextProps.reviewOperation.data.uid",nextProps.reviewOperation.data.uid);
        }
    }

    findDupeReviews(reviewItems, uid, companyItemId) {
        var dupes = [];
        console.debug("this.state.uid, this.state.companyItemId",this.state.uid, this.state.companyItemId);
        if (reviewItems) {
            reviewItems.map((reviewItem) => {
                if (reviewItem.companyItemId === companyItemId && reviewItem.uid === this.state.loggedUid) {
                    console.debug("dupe uid, companyItemId", uid, companyItemId);
                    dupes.push(reviewItems);
                };
            });
        }
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
            review: ''
        });
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.dispatch(reviewsActions.setAddReviewOperation());
        this.resetInputs();
        this.dispatch(errorActions.bbzClearError());
    }

    handleUpdate = (e) => {
        e.preventDefault();

        console.debug("rating", this.state.rating);
        this.dispatch(reviewsActions.startUpdateReviewItem(
            this.state.reviewItemId,
            this.state.review,
            this.state.rating));

        this.resetInputs();
        this.dispatch(errorActions.bbzClearError());
        this.dispatch(reviewsActions.setAddReviewOperation());
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var {auth, reviewItems} = this.props;
       // console.debug("companyItemId", companyItemId);

        var error = {}
        var review = this.refs.review.value;

        if (review.length > 0) {

        } else {
            error.errorMessage = "review comment required";
            this.dispatch(errorActions.bbzReportError(error));
            this.refs.review.focus();
            return;
        }

        if (this.findDupeReviews(reviewItems, this.state.uid, this.state.companyItemId).length != 0) {
            error.errorMessage = "You can only add one review per company!";
            this.dispatch(errorActions.bbzReportError(error));
            this.refs.companyTitle.focus();
            return;
        }

        this.resetInputs();
        this.dispatch(errorActions.bbzClearError());
        this.dispatch(reviewsActions.startAddNewReviewItem(auth.uid, this.state.selectedCompanyItemId, review, this.state.rating, this.state.selectedCompanyTitle));
    }

    onChangeReviewComment =(e)=>{
        this.setState({review: e.target.value});
    }


    onCompanyItemIdChange = (val) => {
        let companyItemId = get(val, 'value');
        let companyTitle = get(val, 'label');
        this.setState({selectedCompanyItemId: companyItemId, selectedCompanyTitle: companyTitle});
    }

    renderCompanyDropDownList(){
        var selectedCompanyItemIds =[];
        var companyItems = this.state.companyItems;
        if (companyItems) {

            companyItems.map((companyItem) => {
                selectedCompanyItemIds.push({value: companyItem.companyItemId, label: companyItem.companyTitle});
            });

            return (
                <div>
                    <Select
                        name="company-select"
                        value={this.state.selectedCompanyItemId}
                        options={selectedCompanyItemIds}
                        onChange={this.onCompanyItemIdChange}
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

        var {auth} = this.props;

        this.state.loggedUid = auth.uid;

        var fillColor = "black"; //lowest ranking

        if (this.state.rating > 4) {
            fillColor = "red"; //highest ranking
        }
        else if (this.state.rating > 3) {
            fillColor = "blue";
        } else if (this.state.rating > 2.5) {
            fillColor = "green";
        } else if (this.state.rating > 1) {
            fillColor = "orange";
        }

        return (
            <div className="form-group bbz-general">
                <div>
                    <Error/>
                    <form onSubmit={this.handleSubmit}>
                        {this.state.operation === 'ADD' && (<label htmlFor="company-item-id">Company</label>)}
                        {this.state.operation === 'ADD' && this.renderCompanyDropDownList()}}
                        <label htmlFor="sreview">Review Comment</label>
                        <input type="text" name="review" ref="review" value={this.state.review}
                               placeholder="Review Comment" onChange={this.onChangeReviewComment}/>
                        <label htmlFor="rating">Rating</label>
                        <Rating image="images/rating/heart.png" fillBG={fillColor} initialBG="white"
                                initialValue={this.state.rating}
                                callback={(index) => {
                                    this.setState({rating: index});
                                }}
                                containerStyle={{maxWidth: '200px'}}
                                editable={(this.state.uid === auth.uid) || this.state.operation === 'ADD'}/>
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
            reviewOperation: state.reviewOperation,
            companyItems: state.companyItems
        }
    }
)(AddReview);