var React = require('react');
var DefaultLayout = require('./layouts/default');


class HelloMessage extends React.Component {
  render() {
     var divStyle = {
          'padding': '20px'
     };
    return (
      <DefaultLayout title={this.props.title} jslib={['index.js','table.js']}>
          <link rel="stylesheet" href="css/bootstrap.min.css"/>
          <link rel="stylesheet" href="css/font-awesome.min.css"/>
        <div className="page-header "  style={divStyle}>
          <h1><span  ></span> Thin CPE Cloud Management System</h1>
          <a href="/logout" className="btn btn-default btn-sm">Logout</a>
        </div>

        <div>Hello {this.props.__('name')}  {this.props.locale}</div>
         <div id="example" ></div>
         <div id="tabledemo" ></div>
         <div id="datepick"  ></div>
         <div id="chart" height="200px" ></div>
         <div id="comment"  ></div>
         {['index.js','table.js'].map(function(item){
            return <script src={"/js/"+item} key={item}></script>;
         })
         }

    </DefaultLayout>


    );
  }
}

module.exports = HelloMessage;
