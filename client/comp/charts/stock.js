/*Ajax Based React Component*/
import React, {Component} from 'react';
import { render } from 'react-dom';
import ReactHighstock from 'react-highcharts/dist/ReactHighstock'
import $ from 'jquery';


const StockChart = React.createClass({
  loadMarketDataFromServer: function() {
   $.ajax({
     url: this.props.url,
     dataType: 'json',
     cache: false,
     success: function(data) {
       this.state.config.series[0].data = data;
       this.setState({data: data});
     }.bind(this),
     error: function(xhr, status, err) {
       console.error(this.props.url, status, err.toString());
     }.bind(this)
   });
 },
 getInitialState: function() {
   return {data:[],
      config: {
       rangeSelector: {
           selected: 1
       },
       title: {
           text: this.props.name
       },
       series: [{
           name: this.props.symbol,
           data: [] ,
           tooltip: {
               valueDecimals: 2
           }
       }]
   }
 };
 },
 componentDidMount: function() {
   this.loadMarketDataFromServer();
   setInterval(this.loadMarketDataFromServer, this.props.pollInterval);
 },
 render: function() {
   return React.createElement(ReactHighstock, { config: this.state.config } );
 }
});
module.exports = StockChart;
