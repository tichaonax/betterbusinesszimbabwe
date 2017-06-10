import React from 'react';
import moment from 'moment';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';
import LoginControl from '../login/LoginControl';
import AdminNavigation from 'app/admin/AdminNavigation';
import BbzSearch from "BbzSearch";
import Avatar from 'Avatar';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sideNav: {
                width: '0px',
                backgroundColor: 'rgba(0,0,0,0)'
            }
        }
    }

    renderAdminNavigation(){
        return (<AdminNavigation closeNav={this.closeNav.bind(this)}/>);
    }

    renderLoginControl() {
        return (<LoginControl closeNav={this.closeNav.bind(this)}/>);
    }

    renderLoginStats() {
        return (<LoginStatus closeNav={this.closeNav.bind(this)}/>);
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

    renderMenu(){
        var {isLoggedIn} = this.props;
        return(
            <ul>
                <li className="upper-links">
                    <Link to="/reviews" activeClassName="active" className="links" onClick={()=>this.closeNav()}
                          activeStyle={{fontWeight: 'bold'}}>Reviews</Link>
                </li>

                <li className="upper-links">
                    <IndexLink to="/companies" activeClassName="active" className="links" onClick={()=>this.closeNav()}
                               activeStyle={{fontWeight: 'bold'}}>Companies</IndexLink>
                </li>

                {isLoggedIn && (
                    <li className="upper-links">
                        <Link to="/users" activeClassName="active" className="links" onClick={() => this.props.closeNav}
                              activeStyle={{fontWeight: 'bold'}}>Users</Link>
                    </li>
                )}

                <li className="upper-links">
                    <Link to="/about" activeClassName="active" className="links" onClick={()=>this.closeNav()}
                          activeStyle={{fontWeight: 'bold'}}>About</Link>
                </li>

                <li className="upper-links">
                    {this.renderAdminNavigation()}
                </li>

                <li className="upper-links">
                    {this.renderLoginControl()}
                </li>
                <li className="upper-links dropdown"><a className="links" href="/" onClick={()=>this.closeNav()}>Dropdown</a>
                    <div className="dropdown-menu">
                        <div className="profile-div">
                            <Link to="/weather" activeClassName="active" className="profile-links" onClick={()=>this.closeNav()}
                                  activeStyle={{fontWeight: 'bold'}}>Weather</Link>
                        </div>
                    </div>
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

        var lastLoginAt = "";

        if (userProfile && lastLogin) {
            lastLoginAt = moment.unix(lastLogin.loginAt).format('MMM Do, YYYY @ h:mm a');
        }

        var joinedAt = "";

        if (userProfile && userProfile.createDate) {
            joinedAt = moment.unix(userProfile.createDate).format('MMM Do, YYYY');
        }

        var admin = "";

        if (userProfile && userProfile.isSuperUser) {
            admin = "SuperUser";
        } else if (userProfile && userProfile.isAdmin) {
            admin = "Admin";
        }

        return (
            <div>
                <div className="navbar">
                    <div className="container-fluid">
                        <div className="row row1">
                            {isLoggedIn && (
                                <div className="pull-left">
                                    {displayName && (<label className="nav-small-font">&nbsp;&nbsp;Welcome!&nbsp;</label>)}
                                    <label className="nav-small-font nav-color-gray">{displayName}&nbsp;</label>
                                    {admin && (<label className="nav-small-font nav-color-yellow">({admin})&nbsp;</label>)}
                                    {joinedAt && (<label className="nav-small-font">Member Since:&nbsp;</label>)}
                                    <label className="nav-small-font nav-color-gray">{joinedAt}&nbsp;</label>
                                    {lastLoginAt && (<label className="nav-small-font">Last Login:&nbsp;</label>)}
                                    <label className="nav-small-font nav-color-gray">{lastLoginAt} </label>
                                </div>
                                )}
                            <div className="largenav pull-right">
                                {this.renderMenu()}
                            </div>
                        </div>
                        <div className="row row2">
                            <div className="col-sm-6">
                                <h2 style={{margin:'0px'}}><span className="smallnav menu" onClick={()=>{
                                    this.openNav()
                                }}>☰ Better Business Zimbabwe</span></h2>
                                <h2 style={{margin:'0px'}}><span className="largenav">Better Business Zimbabwe</span></h2>
                            </div>

                            <div className="col-sm-6">
                                <div className="col-xs-1">
                                    <Avatar/>
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
                        <span className="sidenav-heading">Better Business Zimbabwe</span>
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
        avator: state.auth.photoURL,
        isLoggedIn: state.auth.loggedIn,
        displayName: state.auth.displayName,
        userProfile: state.userProfile,
        lastLogin: state.lastLogin,
    }
}
export default connect(mapStateToProps)(Nav);