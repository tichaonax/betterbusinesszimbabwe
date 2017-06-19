var React = require('react');

class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="columns medium-centered">
                    <div className="container">
                        <h1 className="text-center page-title">Help</h1>
                        <div className="columns small-centered small-10 medium-6 large-4">
                            <div className="callout callout-auth">
                                <p>Better Business Zimbabwe is dedicated to promoting good business practices in
                                    Zimbabwe.

                                    Adding a review is simple, click on Add Review. If you are not logged in you
                                    will be automatically led to login screen!</p>

                                <p>If its your fist time to login you can use any of the social network logins or
                                    you can create
                                    a email based login credentials</p>

                                <p>Once logged in you additinal menus will be enabled depending on whether you are
                                    and administator or just a reviewer</p>
                                <p>To create a review you simply select the company from the dropdown. If the
                                    company is not listed you can create
                                    one by clicking the plus sign and entering the required information</p>

                                <p>After picking the compnay you can add your review descrion and the rating score
                                    and click on Add Review, thats it</p>
                                <p>Your review will not be available to the public until revieved by an
                                    administrator for acceptible content</p>
                                <p>If you added a company you can immediately add a review to it. The company will
                                    remain private until approved by an administrator</p>
                                <p>Adding a new company is also easy select one of the predefined services that
                                    closely matches the type of busines the
                                    company you want to review performs. Enter company name and description and
                                    save</p>
                                <p>We constatntly add new new service items</p>
                                <p>Our efforts is for you to save and share your true business experiences. This
                                    effort will over time as the database grows
                                    promote better business practices in Zimbabwe</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = About;