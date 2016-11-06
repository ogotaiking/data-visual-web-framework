import React, {Component} from 'react';
import { render } from 'react-dom';
import ReactHighstock from 'react-highcharts/dist/ReactHighstock'



class StockChart extends Component {
  constructor(props)
  {
      super(props);
      this.state = {
                data: this.props.data,
                config: this.props.config
      };
  }

  render() {
     return   React.createElement(ReactHighstock, { config: this.state.config } );
  };
};
module.exports = StockChart;
