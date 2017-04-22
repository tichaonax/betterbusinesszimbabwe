var React = require('react');
var {connect} = require('react-redux');
var servicesActions = require('servicesActions');

export class AddServiceItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <div className="form-group">

                </div>
            </div>
        );
    }
}

export default connect()(AddServiceItem);