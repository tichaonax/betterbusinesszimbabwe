import React from 'react';
import moment from 'moment';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';
import LoginControl from '../login/LoginControl';
import AdminNavigation from 'app/admin/AdminNavigation';
import BbzSearch from "BbzSearch";
import Avatar from 'Avatar';
var navActions = require('navActions');

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
        this.state = {
            sideNav: {
                width: '0px',
                backgroundColor: 'rgba(0,0,0,0)'
            }
        }
    }

    renderAdminNavigation() {
        return (<AdminNavigation closeNav={this.closeNavigation.bind(this)}/>);
    }

    renderLoginControl() {
        return (<LoginControl closeNav={this.closeNavigation.bind(this)}/>);
    }

    openNav() {
        this.setState({
            sideNav: {
                width: '70%',
                backgroundColor: 'rgba(0,0,0,4)'
            }
        })
    }

    closeNav() {
        this.setState({
            sideNav: {
                width: '0px',
                backgroundColor: 'rgba(0,0,0,0)'
            }
        })
    }

    closeNavigation(value) {
        this.setState({
            sideNav: value
        });
    }

    renderMenu(){
        var {isLoggedIn, userProfile, auth} = this.props;

        let myReviewsTitle = "My Reviews";
        let reviewsTitle = "Reviews";
        let companiesTitle = "Companies";
        let usersTitle = "Users";
        let adminUsersTitle = "Admin Users";
        let aboutTitle ="About";

        return(
            <ul>
                {isLoggedIn && (
                    <li className="upper-links">
                        <Link to={`/myreviews?user=${auth.uid}&myreviews=true`} activeClassName="active"
                              className="links"
                              onClick={() => {
                                  this.dispatch(navActions.setNavPage(myReviewsTitle));
                                  this.closeNav();
                              }}
                              activeStyle={{fontWeight: 'bold'}}>{myReviewsTitle}</Link>
                    </li>)}
                <li className="upper-links">
                    <Link to="/reviews" activeClassName="active" className="links"
                          onClick={() => {
                              this.dispatch(navActions.setNavPage(reviewsTitle));
                              this.closeNav();
                          }}
                          activeStyle={{fontWeight: 'bold'}}>{reviewsTitle}</Link>
                </li>

                <li className="upper-links">
                    <IndexLink to="/companies" activeClassName="active" className="links"
                               onClick={() => {
                                   this.dispatch(navActions.setNavPage(companiesTitle));
                                   this.closeNav();
                               }}
                               activeStyle={{fontWeight: 'bold'}}>{companiesTitle}</IndexLink>
                </li>

                {isLoggedIn && (
                    <li className="upper-links">
                        <Link to="/users" activeClassName="active" className="links"
                              onClick={() => {
                                  this.dispatch(navActions.setNavPage(usersTitle));
                                  this.closeNav();
                              }}
                              activeStyle={{fontWeight: 'bold'}}>{usersTitle}</Link>
                    </li>
                )}

                {isLoggedIn && userProfile && userProfile.isSuperUser && (
                    <li className="upper-links dropdown"><a className="links" href="/" onClick={() => this.closeNav()}>SuperUser</a>
                        <div className="dropdown-menu">
                            <div className="profile-div">
                                <Link to="/adminusers" activeClassName="active" className="profile-links"
                                      onClick={() => {
                                          this.dispatch(navActions.setNavPage(adminUsersTitle));
                                          this.closeNav();
                                      }}
                                      activeStyle={{fontWeight: 'bold'}}>{adminUsersTitle}</Link>
                            </div>
                        </div>
                    </li>)}
                {isLoggedIn && userProfile && userProfile.isAdmin && (
                <li className="upper-links dropdown"><a className="links" href="/" onClick={() => this.closeNav()}>Admin</a>
                    <div className="dropdown-menu">
                        {this.renderAdminNavigation()}
                    </div>
                </li>)}
                <li className="upper-links dropdown"><a className="links" href="/" onClick={() => this.closeNav()}>Dropdown</a>
                    <div className="dropdown-menu">
                        <div className="profile-div">
                            <Link to="/about" activeClassName="active" className="profile-links"
                                  onClick={() => {
                                      this.dispatch(navActions.setNavPage(aboutTitle));
                                      this.closeNav();
                                  }}
                                  activeStyle={{fontWeight: 'bold'}}>{aboutTitle}</Link>
                        </div>
                    </div>
                </li>
                <li className="upper-links">
                    {this.renderLoginControl()}
                </li>
            </ul>
        )
    }

    render() {
        var {
            isLoggedIn,
            displayName,
            userProfile,
            lastLogin,
        } = this.props;

        if (displayName) {
            displayName = displayName.split('@')[0];
        }

        var lastLoginAt = "";
        var city = "";
        var country = "";

        if (userProfile && lastLogin) {
            lastLoginAt = moment.unix(lastLogin.loginAt).format('MMM Do, YYYY @ h:mm a');
            //city = lastLogin.city + ", ";
            //country = lastLogin.country;
        }

        var joinedAt = "";

        if (userProfile && userProfile.createDate) {
            joinedAt = moment.unix(userProfile.createDate).format('MMM Do, YYYY');
        }

        return (
            <div>
                <div className="navbar">
                    <div className="container-fluid">
                        <div className="row row1">
                            {isLoggedIn && (
                                <div className="pull-left">
                                    {displayName && (<label className="nav-small-font">&nbsp;&nbsp;Welcome!&nbsp;</label>)}
                                    <label className="nav-small-font nav-color-gray text-capitalize">{displayName}&nbsp;</label>
                                    {joinedAt && (<label className="nav-small-font">Member Since:&nbsp;</label>)}
                                    <label className="nav-small-font nav-color-gray">{joinedAt}&nbsp;</label>
                                    <label>
                                    {lastLoginAt && (<label className="nav-small-font">&nbsp;&nbsp;Last Login:&nbsp;</label>)}
                                    <label className="nav-small-font nav-color-gray">{lastLoginAt} {city} {country}</label>
                                    </label>
                                </div>
                                )}
                            <div className="largenav pull-right">
                                {this.renderMenu()}
                            </div>
                        </div>
                        <div className="row row2">
                            <div className="col-sm-6">
                                <h3 style={{margin:'0px'}}><span className="smallnav menu" onClick={()=>{
                                    this.openNav()
                                }}>☰ Better Business Zimbabwe</span></h3>
                                <h2 style={{margin:'0px'}}><span className="largenav">Better Business Zimbabwe</span></h2>
                            </div>

                            <div className="col-sm-6">
                                <div className="col-xs-1">
                                    <Avatar/>
                                </div>
                                <div className="col-xs-1">
                                </div>
                                <div className="col-xs-10">
                                    <BbzSearch/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="sidenav" className="sidenav" style={this.state.sideNav}>
                    <div className="container" style={{backgroundColor: '#2874f0', paddingTop: '10px'}}>
                        <span className="sidenav-heading"><h2>BBZ</h2></span>
                        <a href="javascript:void(0)" className="closebtn" onClick={()=>{this.closeNav()}}>×</a>
                    </div>
                    {this.renderMenu()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        auth: state.auth,
        isLoggedIn: state.auth.loggedIn,
        displayName: state.auth.displayName,
        userProfile: state.userProfile,
        lastLogin: state.lastLogin
    }
}
export default connect(mapStateToProps)(Nav);