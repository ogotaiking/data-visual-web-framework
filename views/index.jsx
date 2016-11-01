var React = require('react');
var DefaultLayout = require('./layouts/default');
import {DatePicker} from 'antd';


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
         <div><button onClick ={this.likedAdd}>ClickMe</button></div>
         <div style={{ margin: 100 }} ><DatePicker /></div>
      </DefaultLayout>
    );
  }
}

module.exports = HelloMessage;
