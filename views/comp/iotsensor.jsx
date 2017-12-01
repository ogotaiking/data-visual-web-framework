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
                                <h1 style={divStyle}>IOT Sensor DEMO</h1>
                            </div>
                            <h3 style={divStyle}>
                                Realtime Sensor Data Collection</h3>

                            <div id="datepick" style={divStyle}></div>
                            <div id="chart" height="300px" style={divStyle}></div>
                            <div id="chartb" height="300px" style={divStyle}></div>



                    </div>
                </div>

                    {['iotsensor.js'].map(function(item) {
                        return <script src={"/js/" + item} key={item}></script>;
                    })}
                </DefaultLayout>
            );
        }
    }

    module.exports = IOTSensor;
