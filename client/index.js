/* demo */

import React, {Component} from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';

import DefaultEntry from './defaultentry';
render(
    <DefaultEntry />,  
    document.getElementById('DefaultEntry')
);



import MQClientTable from './comp/thincpe/clientlist';
render (
    <MQClientTable />,
    document.getElementById('MQClientTable')
);



import CpeWirelessClientTable from './comp/thincpe/cpestats';
render (
    <CpeWirelessClientTable />,
    document.getElementById('CpeWirelessClientTable')
);


import NavBarComp from './comp/navbar'
render (
   <NavBarComp selectkey="1" />,
   document.getElementById('navbar')
);



