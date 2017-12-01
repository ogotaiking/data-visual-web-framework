/* demo */
import React, {Component} from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
/*
var antd = require('antd');
import 'antd/dist/antd.css';
var DatePickerA = antd.DatePicker;
*/

import DatePicker from 'antd/lib/date-picker';
import 'antd/lib/date-picker/style';

var  DatePickerA = DatePicker;
render(<DatePickerA />, document.getElementById('datepick'));

import RealtimeChart from './charts/realtimesensor'
render (
    <RealtimeChart />,
    document.getElementById('chart')
);

import NavBarComp from './navbar'
render (
   <NavBarComp selectkey="3" />,
   document.getElementById('navbar')
);


import { data } from  './data.js'


import PieReact from './charts/pie'
render (
    <PieReact  option={data} />,
    document.getElementById('chartb')
);

