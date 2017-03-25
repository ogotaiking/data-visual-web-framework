/*Ajax Based React Component*/
import React, {Component} from 'react';
import {render} from 'react-dom';
import Highcharts from 'react-highcharts/dist/ReactHighcharts'
import $ from 'jquery';
var socket = io.connect();

const RealtimeChart = React.createClass({
    getInitialState: function() {
        return {
            data: [],
            config: {
                chart: {
                    type: 'area',
                    marginRight: 10,
             				height: 380,
                },
                credits: {
                    enabled: false
                },
                title: {
                    style: {
                        font: 'normal 12px  "Segoe UI","Hiragino Sans GB","Microsoft YaHei",sans-serif'
                    },

                    text: 'Temprature Sensor '
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150,
                    dateTimeLabelFormats: {
                        second: '%H:%M:%S',
                        minute: '%H:%M',
                        hour: '%b/%e %H:%M',
                        day: '%b/%e',
                        month: '%b %y',
                        year: '%Y'
                    },
                    labels: {
                        enabled: false
                    }

                },
                yAxis: {
                    title: {
                        style: {
                            font: 'normal 12px  "Segoe UI","Hiragino Sans GB","Microsoft YaHei",sans-serif'
                        },
                        text: '℃'
                    },
                    min: 0
                },

                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150
                },
                yAxis: {
                    title: {
                        text: ' ℃'
                    },
                    plotLines: [
                        {
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }
                    ]
                },
                legend: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },

                series: [
                    {
                        name: 'Temprature ℃',
                        data: (function() {
                            // generate an array of random data
                            var data = [],
                                time = (new Date()).getTime()+8*3600*1000,
                                i;

                            for (i = -40; i <= 0; i += 1) {
                                data.push({
                                    x: time + i * 1000,
                                    y: 0
                                });
                            }
                            return data;
                        }())
                    }
                ]

            }
        };
    },
  componentDidMount: function() {
      socket.emit('subscribe', 'stats');
      socket.on('message', this._updateClientList);
  },
  _updateClientList(topic, message) {
    if (message.type == 'iotsensor') {
      var x = (new Date()).getTime()+8*3600*1000, // current time
          y = parseFloat(message.payload)/1000;
      var chart = this.refs.chart.getChart();
      chart.series[0].addPoint([x, y], true, true);
    }
  },


  render: function() {
        return <Highcharts config={this.state.config} ref="chart"></Highcharts>;

    }
});
module.exports = RealtimeChart;
