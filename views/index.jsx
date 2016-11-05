var React = require('react');
var DefaultLayout = require('./layouts/default');


class HelloMessage extends React.Component {
  render() {
    return (
      <DefaultLayout title={this.props.title} jslib='index.js'> 
        <div>Hello {this.props.name}</div>
         <div id="example" ></div>
         <div id="chart" height="100px" ></div>
         <div id="datepick"  ></div>

    </DefaultLayout>
    );
  }
}

module.exports = HelloMessage;
