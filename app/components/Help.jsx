var React = require('react');
var {connect} = require('react-redux');
import {Link, browserHistory, hashHistory} from 'react-router';
import {HELP_TITLE} from 'pageTitles';
var navActions = require('navActions');
import {resetListCounts} from 'app/common/Utils';

class Help extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    componentDidMount() {
        this.dispatch(navActions.setNavPage(HELP_TITLE));
        resetListCounts(this.dispatch);
    }

    onGoBack = (evt) => {
        browserHistory.goBack();
    }

    render() {
        return (
            <div className="row">
                <div className="columns medium-centered">
                    <div className="container">
                        <div className="form-group">
                            <button ref="cancel" type="button" className="btn btn-primary btn-sm btn-block" value="Cancel"
                                    onClick={
                                        () => {
                                            this.onGoBack(event);
                                        }}>
                                Back
                            </button>
                        </div>
                        <h1 className="text-center page-title hidden-xs">Help</h1>
                        <div className="columns small-centered small-10 medium-6 large-4">
                            <div className="callout callout-auth">
                                <p>Better Business Zimbabwe is dedicated to promoting good business practices in
                                    Zimbabwe.

                                    Adding a review is simple, click on Add Review. If you are not logged in you
                                    will be automatically led to login screen!</p>
                                <ol>
                                    <li>
                                        <h3>Login</h3>
                                        <p>Before you can add reviews you must login to Better Business Zimbabwe
                                            (BBZ). To simply browse reviews you do not need to login.</p>
                                        <p>If it is your first time to login to the system, your account will
                                            automatically be created on successful login.
                                            You can use any of the supported social network login or create email based login
                                            credentials</p>
                                        <p>Once logged in additional menus will be enabled depending on whether your
                                            account is
                                            of type administrator or just a reviewer</p>
                                    </li>
                                    <li>
                                        <h3>Reviews</h3>
                                        <p>A review consists of the target <b>Company</b>, a <b>Rating</b> score and the <b>Review Comment</b></p>
                                        <p>The review comment can contain links to other websites or the company
                                            website. You are allowed to enter a maximum of one review
                                            for each company in the system.</p>
                                        <p>To create a review you simply select the <b>Company</b> from the dropdown
                                            list. If the company is not listed you can create one on the fly by clicking the
                                            &nbsp;<span className="glyphicon glyphicon-plus button"></span> sign next to
                                            the <b>Company</b> dropdown, entering the required information, see below section on Companies.
                                            The newly created company will remain in your private view with an <b>Approval Pending</b>
                                            status until approved by the administrator.</p>
                                        <p>After picking the company or adding one, you can add your <b>Review Comment</b> and
                                            the <b>Rating</b> score and click on <b>Add Review</b>, that's it!. Ratings can be selected in half
                                            steps.</p>
                                        <p>Your review will not be visible to the public until reviewed by an
                                            administrator to help maintain acceptable content and standards</p>
                                        <p>If you added a company you can immediately add a review to it. The company
                                            will also remain private until approved by an administrator. There is a limit to the
                                            size of the review. A counter will indicate how many more characters available as you type.
                                            User can update only their reviews and such a user action will result in a previously approved
                                            review loosing that status and off public view until reviewed again by an administrator.
                                            The system automatically tracks and updates company and user reviews</p>
                                    </li>
                                    <li>
                                        <h3>Companies</h3>
                                        <p>Adding a new company is also easy select one of the predefined <b>Service
                                            Category</b> that closely matches the type of business the company you want
                                            to add review
                                            performs. Enter <b>Company Name</b> and add <b>Company Description</b> then
                                            click
                                            <b>Add New Company</b>.
                                        </p>
                                        <p>Company names are unique, A company can have many reviews from different
                                            users but only one review for each user</p>
                                        <p>We keep track of reviews for each company. From the Reviews page you can get
                                            Company review summary by clicking on the company name</p></li>
                                    <li>
                                        <h3>Services</h3>
                                        <p>We constantly add new new service categories</p>
                                        <p>Our efforts is for you to save and share your true business experiences. This
                                            effort will over time as the database grows promote better business
                                            practices in Zimbabwe</p>
                                    </li>
                                    <li>
                                        <h3>Users</h3>
                                        <p>Once you are logged in a Users menu allows you to see what other users are
                                            reviewing at a snapshot.</p>
                                    </li>
                                    <li>
                                        <h3>Administrators</h3>
                                        <p>Administrators can perform admin tasks of approving reviews. The admin UI has
                                            more links to perform other tasks needed to maintain the site </p>
                                    </li>
                                    <li>
                                        <h3>Searching</h3>
                                        <p>The Search button at the top allows you search as you type to filter data on the list below.
                                            Searching is powerful and can be any text, Company name, review text, reviewer name etc. </p>
                                        <p>You can also type in the drop downs to look faster for the company or service category you are looking for.</p>
                                    </li>
                                    <li>
                                        <h3>User Feedback</h3>
                                        <p>The system will provide reasonable error messages to help the user enter required information. This
                                            user feedback is displayed at the top</p></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(Help);