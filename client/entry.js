/* demo */
import LikeButton from './comp/button';
import StockChart from './comp/charts/stock'
import React, {Component} from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
var antd = require('antd');
var DatePickerA = antd.DatePicker;
import 'antd/dist/antd.css';


render(<DatePickerA />, document.getElementById('datepick'));


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





render (
    <StockChart url="/market.json" name="苹果" symbol="AAPL" pollInterval={2000} />,
    document.getElementById('chart')
);

/* DEMO REACT DEVELOPMENT on REACT offiical toturial
import CommentBox from './comp/comment/CommentBox';
render (
    <CommentBox />,
    document.getElementById('comment')
);
*/
