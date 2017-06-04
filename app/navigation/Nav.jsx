import React from 'react';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';
import LoginControl from '../login/LoginControl';
import LoginStatus from '../login/LoginStatus';
import AdminNavigation from 'app/admin/AdminNavigation';
import BbzSearch from "BbzSearch";

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
                </li>>
            </ul>
        )
    }

    render() {
        var {auth} = this.props;
        function renderAvator() {
            if (auth.loggedIn) {
                if (auth.photoURL) {
                    return (
                        <div>
                            <img src={auth.photoURL} alt="Smiley face" height="35" width="35"/>
                            <p className="nav-profile__subtext">
                            </p>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <p className="nav-profile__subtext">
                            </p>
                        </div>
                    );
                }
            } else {
                return (
                    <div>
                    </div>
                )
            }
        }

        return (

            <div>
               {/* <div className="columns medium-centered">
                    <div className="callout callout-auth">
                        <div className="column">
                            <div className="row">
                                <div className="menu-text">Better Business Zimbabwe</div>
                                <div className="small-12 large-expand columns">
                                    <Link to="/reviews" activeClassName="active"
                                          activeStyle={{fontWeight: 'bold'}}>Reviews</Link>
                                </div>
                                <div className="small-12 large-expand columns">
                                    <IndexLink to="/companies" activeClassName="active"
                                               activeStyle={{fontWeight: 'bold'}}>Companies</IndexLink>
                                </div>
                                <div className="small-12 large-expand columns">
                                    <Link to="/weather" activeClassName="active"
                                          activeStyle={{fontWeight: 'bold'}}>Weather</Link>
                                </div>
                                <div className="small-12 large-expand columns">
                                    <Link to="/about" activeClassName="active"
                                          activeStyle={{fontWeight: 'bold'}}>About</Link>
                                </div>
                                <div className="small-12 large-expand columns">
                                    {this.renderAdminNavigation()}
                                </div>
                                <div className="small-12 large-expand columns">
                                    {this.renderLoginControl()}
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="row">
                                <div className="small-12 large-expand columns">
                                    {renderAvator()}
                                </div>
                                <div className="small-12 large-expand columns">
                                    {this.renderLoginStats()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>*/}
                <div className="navbar">
                    <div className="container">
                        <div className="row row1">
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
                            <div>
                               <div className="row">
                                    <BbzSearch/>
                                </div>
                                <div className="small-12 large-expand columns">
                                    {this.renderLoginStats()}
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
        userProfile: state.userProfile
    }
}
export default connect(mapStateToProps)(Nav);