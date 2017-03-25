var React = require('react');
var DefaultLayout = require('../layouts/default');

class ConfigPage extends React.Component {
    render() {
        var divStyle = {
            'marginLeft': '0px',
            'marginTop': '15px'
        };
        var alignRight = {
            'textAlign': 'right',
            'margin': '20px'
        };
        var rowStyle = {
            'margin': '0px',
            'padding': '0px',
            'height' : '100%'
        };
        return (
            <DefaultLayout title={this.props.title} >
                <link rel="stylesheet" href="css/bootstrap.min.css"/>
                <link rel="stylesheet" href="css/font-awesome.min.css"/>

                <div className="row" style={rowStyle}>
                    <div className="col-md-2 col-lg-2" >
                        <div id="navbar"></div>
                    </div>
                    <div className="col-md-10 col-lg-10">
                            <div style={alignRight}>Hello {this.props.username}
                                &nbsp;&nbsp;
                                <a href="/logout" className="btn btn-default btn-sm">Logout</a>
                            </div>

                            <div className="page-header " style={divStyle}>
                                <h1 style={divStyle}>Configuration</h1>
                            </div>

                            <h3 style={divStyle}>
                                IPSec VPN Configuration
                            </h3>
                            <div id="MQClientTable" style={divStyle}></div>
                            <h3 style={divStyle}>
                                Layer2 VPN Configuration</h3>
                            <div id="CpeWirelessClientTable" style={divStyle}></div>


                    </div>
                </div>

                    {['configpage.js'].map(function(item) {
                        return <script src={"/js/" + item} key={item}></script>;
                    })}
                </DefaultLayout>
            );
        }
    }

    module.exports = ConfigPage;
