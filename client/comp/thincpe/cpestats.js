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
        title: 'CPE',
        dataIndex: 'gateway',
        key: 'gateway'
    }, {
        title: 'MAC',
        dataIndex: 'mac',
        key: 'mac'
    }, {
        title: 'Interface',
        dataIndex: 'intf',
        key: 'intf'
    }, {
        title: 'Signal',
        dataIndex: 'signal',
        key: 'signal'
    }, {
        title: 'RX Rate',
        dataIndex: 'rx_rate',
        key: 'rx_rate'
    }, {
        title: 'TX Rate',
        dataIndex: 'tx_rate',
        key: 'tx_rate'
    }, {

        title: 'Autentication',
        dataIndex: 'authentication',
        key: 'authentication'
    }, {
        title: 'Authorization',
        dataIndex: 'authorization',
        key: 'authorization'
    }, {
        title: 'RX Bytes',
        dataIndex: 'rx_bytes',
        key: 'rx_bytes'
    }, {
        title: 'RX pkts',
        dataIndex: 'rx_pkts',
        key: 'rx_pkts'
    }, {
        title: 'TX Bytes',
        dataIndex: 'tx_bytes',
        key: 'tx_bytes'
    }, {
        title: 'TX pkts',
        dataIndex: 'tx_pkts',
        key: 'tx_pkts'
    }, {
        title: 'inactive time',
        dataIndex: 'inactive_time',
        key: 'inactive_time'
    }
];

var CpeWirelessClientTable = createReactClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        socket.emit('subscribe', 'stats');
        socket.on('message', this._updateClientList);
    },
    _updateClientList(topic, message) {
        var mq_client_key = 1;
        var dataSource = [];
        if (message.type == 'stats') {
            var msg = JSON.parse(message.payload);

            //console.log(msg);

            for (var i = 0; i < msg.length; i++) {
                var client_info = msg[i];
                var a = {};
                a.gateway = message.id;
                a.mac = client_info[0];
                a.intf = client_info[1];
                a.inactive_time = client_info[2];
                a.rx_bytes = (client_info[3] / 1000).toString() + ' KB';
                a.rx_pkts = client_info[4];
                a.tx_bytes = (client_info[5] / 1000).toString() + ' KB';
                a.tx_pkts = client_info[6];
                a.signal = client_info[7].toString() + ' dBm';
                a.tx_rate = client_info[8].toString() + ' Mbps';
                a.rx_rate = client_info[9].toString() + ' Mbps';
                a.authorization = client_info[10];
                a.authentication = client_info[11];

                mq_client_key = mq_client_key + 1;
                dataSource.push(a);

            }
            //console.log(dataSource);
            this.setState({data: dataSource});
        }
    },

    render: function() {
        return (<Table dataSource={this.state.data} columns={columns}/>);
    }
});

module.exports = CpeWirelessClientTable;
