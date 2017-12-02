import React, {Component} from 'react';
import {render} from 'react-dom';
import 'babel-polyfill';
var createReactClass = require('create-react-class');

/*
var antd = require('antd');
var Table = antd.Table;
import 'antd/dist/antd.css';
*/

import Table from 'antd/lib/table';
import 'antd/lib/table/style';

var socket = io.connect();

const columns = [
    {
        title: 'Interface',
        dataIndex: 'interfaces',
        key: 'interfaces'
    }, {
        title: 'Username',
        dataIndex: 'username',
        key: 'username'
    }, {
        title: 'Group',
        dataIndex: 'group',
        key: 'group'
    }, {
        title: 'Tunnel IP',
        dataIndex: 'assignip',
        key: 'assignip'
    }, {
        title: 'Uptime',
        dataIndex: 'uptime',
        key: 'uptime'
    }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'status'
    }, {
        title: 'Client Address',
        dataIndex: 'peeripport',
        key: 'peeripport'
    }
];

var HUBVPNClientTable = createReactClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        socket.emit('subscribe', 'HUB_VPN');
        socket.on('message', this._updateClientList);
    },
    _updateClientList(topic, message) {
        var mq_client_key = 1;
        var dataSource = [];

        for (var i = 0; i < message.length; i++) {
            var client_info = message[i];
            var a = {};
            a.interfaces = client_info[0];
            a.username = client_info[1];
            a.group = client_info[3];
            a.assignip = client_info[4];
            a.uptime = client_info[5];
            a.status = client_info[6];
            a.peeripport = client_info[7].toString() + '/' + client_info[8].toString();
            a.key = mq_client_key;
            mq_client_key = mq_client_key + 1;
            dataSource.push(a);
        }
        //console.log(dataSource);
        this.setState({data: dataSource});
    },

    render: function() {
        return (<Table dataSource={this.state.data} columns={columns}/>);
    }
});

module.exports = HUBVPNClientTable;
