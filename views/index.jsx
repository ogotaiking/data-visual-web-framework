var React = require('react');
var DefaultLayout = require('./layouts/default');


class HelloMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: 0
    };

  }
  likeAdd() {
    let liked = this.state.liked;
    liked++;
    this.setState({
      liked
    });
  }

  render() {
    return (
      <DefaultLayout title={this.props.title}>
        <div>Hello {this.props.name}
         { this.props.__('Username/Email') }
         <h2>Total Number: {this.state.liked}</h2></div>
         <div id="example" ></div>
         <div id="chart" height="100px" ></div>
    </DefaultLayout>
    );
  }
}

module.exports = HelloMessage;
