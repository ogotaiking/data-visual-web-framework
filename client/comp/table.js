import React, {Component} from 'react';
import { render } from 'react-dom';
var antd = require('antd');
import 'babel-polyfill';
import 'antd/dist/antd.css';
var Table = antd.Table;
var dataSource = [{
  key: '1',
  name: 'GigaEthernet1',
  age: 'up',
  address: 'To-ASR1K-1002-3'
}, {
  key: '2',
  name: 'GigaEthernet2',
  age: 'down',
  address: 'To-ASR1K-1002-5'
}];

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '状态',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Description',
  dataIndex: 'address',
  key: 'address',
}];

render(<Table dataSource={dataSource} columns={columns} />, document.getElementById('tabledemo'));
