/*Ajax Based React Component*/
import React, {Component} from 'react';
import { render } from 'react-dom';


var CommentList = React.createClass({
  render: function() {
    var divStyle = {
        'background': '#b2d233',
        'color': 'black',
        'margin': '10px',
        'padding': '20px'
    };

    return (
      <div className="commentList" style={divStyle}>
        Hello, world! I am a CommentList.
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
      var divStyle = {
          'background': 'orange',
          'color': 'black',
          'margin': '10px',
          'padding': '20px'
      };
    return (
      <div className="commentForm" style={divStyle}>
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

var CommentBox = React.createClass({
  render: function() {
      var divStyle = {
          'background': 'black',
          'color': 'white',
          'margin': '10px',
          'padding': '20px'
      };
    return (
      <div className="commentBox" style={divStyle}>
      <h1>Comments BOX</h1>
<CommentList />
<CommentForm />
      </div>
    );
  }
});

module.exports = CommentBox;
