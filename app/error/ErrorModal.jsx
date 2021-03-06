var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');

class ErrorModal extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var {title, errorMessage} = this.props;

        var modalMarkuop = (
            <div id="error-modal" className="reveal tiny text-center" data-reveal="">
                <h4>{title}</h4>
                <p>{errorMessage}!</p>
                <p>
                    <button className="button hollow" data-close="">Ok</button>
                </p>
            </div>
        );

        var $modal = $(ReactDOMServer.renderToString(modalMarkuop));
        $(ReactDOM.findDOMNode(this)).html($modal);

        var modal = new Foundation.Reveal($('#error-modal'));
        modal.open();
    }

    render() {
        return (
            <div></div>
        );
    }
}

module.exports = ErrorModal;