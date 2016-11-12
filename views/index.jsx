var React = require('react');
var DefaultLayout = require('./layouts/default');


class HelloMessage extends React.Component {
  render() {
    return (
      <DefaultLayout title={this.props.title} jslib={['index.js','table.js']}>
        <div>Hello {this.props.__('name')}  {this.props.locale}</div>
         <div id="example" ></div>
         <div id="tabledemo" ></div>
         <div id="chart" height="100px" ></div>
         <div id="datepick"  ></div>
         {['index.js','table.js'].map(function(item){
            return <script src={"/js/"+item}></script>;
         })
         }

    </DefaultLayout>


    );
  }
}

module.exports = HelloMessage;
