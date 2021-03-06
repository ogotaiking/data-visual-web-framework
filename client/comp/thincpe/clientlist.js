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
        title: 'client-ID',
        dataIndex: 'clientid',
        key: 'clientid'
    }, {
        title: 'Username',
        dataIndex: 'username',
        key: 'username'
    }, {
        title: 'client address',
        dataIndex: 'address',
        key: 'address'
    }, {
        title: 'connected_time',
        dataIndex: 'conn_time',
        key: 'conn_time'
    }
];

var MQClientTable = createReactClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        socket.emit('subscribe', 'MQ_CLIENT_LIST');
        socket.on('message', this._updateClientList);
    },
    _updateClientList(topic, message) {
        var mq_client_key = 1;
        var dataSource = [];

        for (var i = 0; i < message.length; i++) {
            var client_info = message[i];
            var a = {};
            a.clientid = client_info[0];
            a.username = client_info[1];
            a.address = client_info[3];
            var timestamp =client_info[4];
            var newDate = new Date();
            newDate.setTime(timestamp * 1000);
            a.conn_time = newDate.toLocaleString();
            if (a.username != 'undefined' && a.username != 'server') {
                a.key = mq_client_key;
                mq_client_key = mq_client_key + 1;
                dataSource.push(a);
            }
        }
        //console.log(dataSource);
        this.setState({data: dataSource});
    },

    render: function() {
        return (<Table dataSource={this.state.data} columns={columns}/>);
    }
});

module.exports = MQClientTable;
