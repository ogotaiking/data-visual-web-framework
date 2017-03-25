import React, {Component} from 'react';
import {render} from 'react-dom';
import {Button} from 'react-bootstrap';
import {Nav, NavItem} from 'react-bootstrap';

class NavBarComp extends React.Component {

    render() {
        var navBarStyle = {
            'background': '#000000',
            'height': '100%',
            'width' : '16%',
            'marginLeft' : '-20px',
            'position':'fixed'
        };
        var headStyle = {
            'background' : '#000000',
            'color' : 'white',
            'margin' : '10px',
            'textAlign' : 'center'
        }
        var navItemStyle = {
            'marginLeft' : '30px',
            'fontSize' : '1.2em',
            'color': 'white'
        }
        return (
            <div style={navBarStyle}>
                <div  style={headStyle}>
                    <h2>ThinCPE NMS</h2>
                </div>

            <Nav bsStyle="pills" stacked activeKey={this.props.selectkey} >
                <NavItem eventKey="1"  href="/" ><div style={navItemStyle}><i className="fa fa-bar-chart"></i> System Overview</div></NavItem>
                <NavItem eventKey="2"  href="/config"><div style={navItemStyle} ><i className="fa fa-th-large" ></i> Configuration </div></NavItem>
                <NavItem eventKey="3"  href="/iotsensor"><div style={navItemStyle} ><i className="fa fa-line-chart" ></i> IOT Sensor</div></NavItem>
                <NavItem eventKey="4"  href="/evpn"><div style={navItemStyle} ><i className="fa fa-random" ></i> Internet EVPN</div></NavItem>
                <NavItem eventKey="5"  disabled><div style={navItemStyle}>Other</div></NavItem>
            </Nav>
            </div>
        );
    };
}
module.exports = NavBarComp;
