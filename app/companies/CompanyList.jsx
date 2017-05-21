import React from 'react';
var {connect} = require('react-redux');
import ReactPaginate from 'react-paginate';
import ReactTooltip from 'react-tooltip'
import CompanyItem from 'CompanyItem';
var BbzAPI = require('BbzAPI');

export class CompanyList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            offset: 0
        }

        this.handlePageClick=this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.loadNextPage(this.state.offset);
    }

    componentWillReceiveProps(newProps) {
        if (this.props.searchText != newProps.searchText || this.props.companyItems != newProps.companyItems) {
            //you want to force reload of data with new search criteria
            //notice that only after the offset state change is guaranteed do we reload the data
            this.setState({offset: 0}, () => {
                this.loadNextPage();
            });
        }
    }

    loadNextPage = () => {
        var {companyItems, showApprovalPending, searchText, auth} = this.props;
        console.log("companyItems",companyItems);
        console.log("searchText",searchText);
        var uid = 0;
        if (auth.loggedIn) {
            uid = auth.uid;
        }
        var filteredCompanyItems = BbzAPI.getFilteredCompanies(companyItems, showApprovalPending, searchText, uid, this.props.perPage, this.state.offset);
        this.setState({data: filteredCompanyItems.data, pageCount: filteredCompanyItems.pageCount});
    }

    handlePageClick = (data) => {
        let selected = data.selected;

        let offset = Math.ceil(selected * this.props.perPage);

        this.setState({offset: offset}, () => {
            this.loadNextPage();
        });
    };

    renderCompanyItems() {
        return this.state.data.map((companyItem) => {
            return (
                <CompanyItem key={companyItem.companyItemId} {...companyItem}
                             deleteCompany={this.refs.deleteCompany} updateCompany={this.refs.updateCompany}/>);
        });
    }

    render() {

        var {userProfile, auth} = this.props;
        return (
            <div>
                <ReactTooltip />
                <table className="common-table">
                    <tbody>
                    <tr>
                        <th>Company ID</th>
                        {auth.loggedIn && (
                            <th>
                                <div ref='deleteCompany' data-tip='Delete Company'></div>
                                Action
                                <div ref='updateCompany' data-tip='Update Company'></div>
                            </th>)}
                        <th>Reviews</th>
                        <th>Rating</th>
                        {auth.loggedIn && userProfile && userProfile.isAdmin && ( <th>Status</th>)}
                        <th>Company Name</th>
                        {auth.loggedIn && userProfile && userProfile.isAdmin && ( <th>Reporter</th>)}
                        {auth.loggedIn && userProfile && userProfile.isAdmin && ( <th>Reporter Email</th>)}
                        <th>Service</th>
                        <th>Business Description</th>
                        <th>Add Review</th>
                    </tr>
                    {this.renderCompanyItems()}
                    </tbody>
                </table>
                <ReactPaginate previousLabel={"previous"}
                               nextLabel={"next"}
                               breakLabel={<a href="">...</a>}
                               breakClassName={"break-me"}
                               pageCount={this.state.pageCount}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               onPageChange={this.handlePageClick}
                               containerClassName={"pagination"}
                               subContainerClassName={"pages pagination"}
                               activeClassName={"active"}/>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            auth: state.auth,
            userProfile: state.userProfile,
            companyItems: state.companyItems,
            showApprovalPending: state.showApprovalPending,
            searchText: state.searchText,
            serviceItems:state.serviceItems
        }
    }
)(CompanyList);