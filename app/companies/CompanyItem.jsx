import React from 'react';
var {connect} = require('react-redux');
var companiesActions = require('companiesActions');

export class CompanyItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnButtonClick = this.handleOnButtonClick.bind(this);
    }

    handleOnButtonClick = (e) => {
        e.preventDefault();
        var {companyItemId, dispatch} = this.props;
        dispatch(companiesActions.startDeleteCompanyItem(companyItemId));
    }

    render() {
        var {companyItemId, companyTitle, companyDesc, createAt, updateAt, dispatch} = this.props;

        return (
            <tr>
                <td>
                    <form>
                        <input type="submit" value="&times;" onClick={this.handleOnButtonClick}/>
                        <input type="submit" value={companyItemId} onClick={() => {

                            var data = {
                                companyItemId,
                                compnayTitle,
                                companyDesc
                            }

                            console.debug("CompanyItems Data:", data);

                            dispatch(companiesActions.setUpdateCompanyOperation(data));
                        }}/>
                    </form>
                </td>
                <td>{companyTitle}</td>
                <td>{companyDesc}
                </td>
            </tr>
        );
    }
}

export default  connect()(CompanyItem);
