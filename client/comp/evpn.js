/* demo */
import React, {Component} from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';



import CpeWirelessClientTable from './thincpe/cpestats';
render (
    <CpeWirelessClientTable />,
    document.getElementById('CpeWirelessClientTable')
);

import HUBVPNClientTable from './thincpe/hubvpn';
render (
    <HUBVPNClientTable />,
    document.getElementById('HUBVPNClientTable')
);

import HUBBDClientTable from './thincpe/hubbd';
render (
    <HUBBDClientTable />,
    document.getElementById('HUBBDClientTable')
);

import NavBarComp from './navbar'
render (
   <NavBarComp selectkey="4" />,
   document.getElementById('navbar')
);
