var React = require('react');
var DefaultLayout = require('./layouts/default');

class ErrorMsg extends React.Component {
  render() {
    return (
      <DefaultLayout title="Error Message">
        <div>
        <h1>{this.props.error.status} : {this.props.message}</h1>
        <pre>{this.props.error.stack}</pre>
        </div>
      </DefaultLayout>
    );
  }
}

module.exports = ErrorMsg;
