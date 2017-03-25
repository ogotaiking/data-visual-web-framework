var React = require('react');
var DefaultLayout = require('../layouts/default');

class IOTSensor extends React.Component {
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
                                <h1 style={divStyle}>Ethernet VPN - Internet as Fabric</h1>
                            </div>

                            <h3 style={divStyle}>
                                Wireless Association on CPE</h3>
                            <div id="CpeWirelessClientTable" style={divStyle}></div>

                            <h3 style={divStyle}>
                                IPSec VPN Connection Monitor</h3>
                            <div id="HUBVPNClientTable" style={divStyle}></div>

                            <h3 style={divStyle}>
                                Pseudo-Wire MAC Table</h3>
                            <div id="HUBBDClientTable" style={divStyle}></div>


                    </div>
                </div>

                    {['evpn.js'].map(function(item) {
                        return <script src={"/js/" + item} key={item}></script>;
                    })}
                </DefaultLayout>
            );
        }
    }

    module.exports = IOTSensor;
