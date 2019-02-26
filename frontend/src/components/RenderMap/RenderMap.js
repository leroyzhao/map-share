import React, { Component } from 'react'

export class RenderMap extends Component {
  renderChildren() {
    const { children } = this.props.children;

    if (!children) return;

    return React.Children.map(children, c => {
      if (!c) return;
      return React.cloneElement(c, {
        map: this.props.map,
        google: this.props.google,
        mapcenter: this.props.mapcenter
      });
    });
  }

  render() {
    return (
      <div>
        {this.renderChildren()}
      </div>
    )
  }
}

export default RenderMap;
