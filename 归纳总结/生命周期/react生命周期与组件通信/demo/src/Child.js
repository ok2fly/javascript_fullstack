import React, { Component } from 'react';

class Child extends Component {
  render() {
    return (
      <div>
        <button onClick={() => {this.props.callback(100)}}>click</button>
      </div>
    );
  }
}

export default Child;