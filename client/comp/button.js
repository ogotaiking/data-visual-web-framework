import React, {Component} from 'react';
import { render } from 'react-dom';

class LikeButton extends Component {
  constructor(props)
  {
      super(props);
      this.state = {
                liked: false,
                fuck: false
               };
  }

  handleClick(e) {
    this.setState( { liked: !this.state.liked });
  }

  handleClick2(e) {
    this.setState( { fuck: !this.state.fuck });
  }

  render() {
    const text = this.state.liked ? 'like' : 'haven\'t liked' ;
    return (
      <p onClick={this.handleClick.bind(this)}>
        You {text} this. Click to toggle.
      </p>
    );
  }
}

module.exports = LikeButton;
