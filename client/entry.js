import LikeButton from './comp/button';
import StockChart from './comp/charts/stock'
import React, {Component} from 'react';
import { render } from 'react-dom';
//var $ = require('jquery');

import DatePicker from 'antd/lib/date-picker'
import 'antd/dist/antd.css';

render(<DatePicker />, document.getElementById('datepick'));


class AA  extends LikeButton {
  constructor(props)
  {
      super(props);
    }
    handleClick(e) {
      this.setState( { liked: !this.state.liked });
      console.log('你点了我一下');
    }

    render() {
      const text = this.state.liked ? 'like' : 'haven\'t liked' ;
      const text2 = this.state.fuck ? 'FUCK' : 'NONONO' ;
      return (
        <p onClick={this.handleClick.bind(this)} onMouseOver={this.handleClick2.bind(this)}>
          {this.props.haha} You {text} this.{text2} HAHHAAH
        </p>
      );
    }
}

render (
  <AA haha="您好啊aaaaaa~~" />,
  document.getElementById('example')
);



var data = [
              [1220832000000, 22.56],
              [1220918400000, 21.67],
              [1221004800000, 21.66],
              [1221091200000, 21.81],
              [1221177600000, 21.28],
              [1221436800000, 20.05],
              [1221523200000, 19.98],
              [1221609600000, 13.26],
              [1221696000000, 19.16],
              [1221782400000, 21.13],
              [1222041600000, 18.72],
              [1222128000000, 18.12],
              [1222214400000, 18.39],
              [1222300800000, 18.85],
              [1222387200000, 18.32],
              [1222646400000, 15.04],
              [1222732800000, 16.24],
              [1222819200000, 15.59],
              [1222905600000, 14.3],
              [1222992000000, 13.87],
              [1223251200000, 14.02],
              [1223337600000, 12.74]
            ];

var config = {
  rangeSelector: {
    selected: 1
  },
  title: {
    text: 'AAPL Stock Price'
  },
  series: [{
    name: 'AAPL',
    data: data,
    tooltip: {
      valueDecimals: 2
    }
  }]
};

render (
  <StockChart data = {data} config= {config} />,
  document.getElementById('chart')
);
