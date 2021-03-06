import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import Main from 'Main';
import Help from 'Help';
import About from 'About';
import BbzLogin from 'BbzLogin';
import BbzPasswordLogin from 'BbzPasswordLogin';
import BbzResetPassword from 'BbzResetPassword';
import BbzLoggedInContainer from 'BbzLoggedInContainer';
import CreateNewAccount from 'CreateNewAccount';
import AddReview from 'AddReview';
import Companies from 'Companies';
import CompanyReviews from 'CompanyReviews';
import Reviews from 'Reviews';
import AddCompanyItem from 'AddCompanyItem';
import Services from 'Services';
import Users from 'Users';

export default (
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <Route path="help" component={Help}/>
            <Route path="about" component={About}/>
            <Route path="login" component={BbzLogin}/>
            <Route path="companies" component={Companies}/>
            <Route path="reviews" component={Reviews}/>
            <Route path="emaillogin" component={BbzPasswordLogin}/>
            <Route path="resetpassword" component={BbzResetPassword}/>
            <Route path="createaccount" component={CreateNewAccount}/>
            <Route path="companyreviews" component={CompanyReviews}/>
            <IndexRoute component={Reviews}/>
            <Route component={BbzLoggedInContainer}>
                <Route path="services" component={Services}/>
                <Route path="addreview" component={AddReview}/>
                <Route path="addcompany" component={AddCompanyItem}/>
                <Route path="users" component={Users}/>
                <Route path="myreviews" component={Reviews}/>
            </Route>
        </Route>
    </Router>
);