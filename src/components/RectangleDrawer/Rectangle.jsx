import React from "react";
import PropTypes from "prop-types";

export default class Rectangle extends React.Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onMove: PropTypes.func,
    onMoveEnd: PropTypes.func,
  };

  static defaultProps = {
    onMove: () => {},
    onMoveEnd: () => {},
  };

  state = {
    selected: false,
  };

  handleRectClick(event) {
    event.stopPropagation();
    this.setState({ selected: !this.state.selected });
  }

  handleMouseDown(event) {
    this.start = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  handleMouseUp(event) {
    this.start = null;
    this.props.onMoveEnd();
  }

  handleMouseMove(event) {
    if (this.start) {
      event.stopPropagation();
      this.props.onMove({
        dx: event.clientX - this.start.x,
        dy: event.clientY - this.start.y,
      });
    }
  }

  render() {
    const { x, y, width, height } = this.props;
    const { selected } = this.state;
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        onClick={event => this.handleRectClick(event)}
        stroke={selected ? "purple" : "blue"}
        fill="rgba(0,0,0,0.8)"
        onMouseDown={event => this.handleMouseDown(event)}
        onMouseUp={event => this.handleMouseUp(event)}
        onMouseMove={event => this.handleMouseMove(event)}
      />
    );
  }
}
