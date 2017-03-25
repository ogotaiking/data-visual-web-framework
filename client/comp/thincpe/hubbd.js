import React, {Component} from 'react';
import {render} from 'react-dom';
import 'babel-polyfill';
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
        title: 'Bridge-Domain',
        dataIndex: 'bid',
        key: 'bid'
    }, {
        title: 'MAC',
        dataIndex: 'mac',
        key: 'mac'
    }, {
        title: 'Aging Time',
        dataIndex: 'agtime',
        key: 'agtime'
    }, {
        title: 'Interface',
        dataIndex: 'intf',
        key: 'intf'
      }
];

var HUBBDClientTable = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        socket.emit('subscribe', 'HUB_BD');
        socket.on('message', this._updateClientList);
    },
    _updateClientList(topic, message) {
        var mq_client_key = 1;
        var dataSource = [];

        for (var i = 0; i < message.length; i++) {
            var client_info = message[i];
            var a = {};
            a.bid = client_info[0];
            a.mac = client_info[1];
            a.agtime = client_info[2];
            a.intf = client_info[3];
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

module.exports = HUBBDClientTable;
