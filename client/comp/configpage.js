/* demo */
import React, {Component} from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';



import MQClientTable from './thincpe/clientlist';
render (
    <MQClientTable />,
    document.getElementById('MQClientTable')
);



import CpeWirelessClientTable from './thincpe/cpestats';
render (
    <CpeWirelessClientTable />,
    document.getElementById('CpeWirelessClientTable')
);


import NavBarComp from './navbar'
render (
   <NavBarComp selectkey="2" />,
   document.getElementById('navbar')
);
