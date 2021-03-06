/* This file is for demo ONLY*/

/*Ajax Based React Component*/
import React, {Component} from 'react';
import {render} from 'react-dom';
//import remarkable from 'remarkable';
import $ from 'jquery';

var CommentList = React.createClass({
    render: function() {
        var divStyle = {
            'background': '#b2d233',
            'color': 'black',
            'margin': '10px',
            'padding': '20px'
        };
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList" style={divStyle}>
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    getInitialState: function() {
        return {author: '', text: ''};
    },
    handleAuthorChange: function(e) {
        this.setState({author: e.target.value});
    },
    handleTextChange: function(e) {
        this.setState({text: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        this.setState({author: '', text: ''});
    },

    render: function() {
        var divStyle = {
            'background': 'orange',
            'color': 'black',
            'margin': '10px',
            'padding': '20px'
        };
        return (
            <form className="commentForm" style={divStyle} onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange}/>
                <input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange}/>
                <input type="submit" value="Post"/>
            </form>

        );
    }
});

var CommentBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    loadCommentsFromServer: function() {
        $.ajax({
            url: '/comment',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },
    handleCommentSubmit: function(comment) {
        var comments = this.state.data;
        // Optimistically set an id on the new comment. It will be replaced by an
        // id generated by the server. In a production application you would likely
        // not use Date.now() for this and would have a more robust system in place.
        comment.id = Date.now();
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});

    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, 20000);
    },

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
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

var Comment = React.createClass({
    rawMarkup: function() {
        //var md = new remarkable();
        //var rawMarkup = md.render(this.props.children.toString());
        var rawMarkup = this.props.children.toString();
        return {__html: rawMarkup};
    },

    render: function() {
        var divStyle = {
            'background': 'pink',
            'color': 'black',
            'margin': '10px',
            'padding': '20px'
        };
        return (
            <div className="comment" style={divStyle}>
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()}/>
            </div>
        );
    }
});

module.exports = CommentBox;
