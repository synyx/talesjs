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
    onResize: PropTypes.func,
    onResizeEnd: PropTypes.func,
  };

  static defaultProps = {
    onMove: () => {},
    onMoveEnd: () => {},
    onResize: () => {},
    onResizeEnd: () => {},
  };

  state = {
    selected: false,
  };

  componentDidMount() {
    const handleMouseUp = this.handleMouseUp.bind(this);
    const handleMouseMove = this.handleMouseMove.bind(this);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    this.unsubscribe = () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleRectClick(event) {
    event.stopPropagation();
    this.setState({ selected: !this.state.selected });
  }

  handleMouseDown(event) {
    this.start = {
      x: event.clientX,
      y: event.clientY,
    };
    this.activeElement = event.target;
  }

  handleMouseUp(event) {
    this.start = null;
    if (event.target === this.rectangleNode) {
      this.props.onMoveEnd();
    } else {
      this.props.onResizeEnd();
    }
  }

  handleMouseMove(event) {
    if (!this.start) {
      return;
    }

    const dx = event.clientX - this.start.x;
    const dy = event.clientY - this.start.y;

    if (this.activeElement === this.resizeTopNode) {
      event.stopPropagation();
      this.props.onResize({
        dx: 0,
        dy,
        dwidth: 0,
        dheight: dy * -1,
      });
    } else if (this.activeElement === this.resizeBottomNode) {
      event.stopPropagation();
      this.props.onResize({
        dx: 0,
        dy: 0,
        dwidth: 0,
        dheight: dy,
      });
    } else if (this.activeElement === this.resizeLeftNode) {
      event.stopPropagation();
      this.props.onResize({
        dx,
        dy: 0,
        dwidth: dx * -1,
        dheight: 0,
      });
    } else if (this.activeElement === this.resizeRightNode) {
      event.stopPropagation();
      this.props.onResize({
        dx: 0,
        dy: 0,
        dwidth: dx,
        dheight: 0,
      });
    } else if (this.activeElement === this.rectangleNode) {
      event.stopPropagation();
      this.props.onMove({ dx, dy });
    }
  }

  render() {
    const { x, y, width, height } = this.props;
    const { selected } = this.state;
    return (
      <g onMouseDown={event => this.handleMouseDown(event)}>
        <rect
          ref={node => (this.rectangleNode = node)}
          x={x}
          y={y}
          width={width}
          height={height}
          onClick={event => this.handleRectClick(event)}
          stroke={selected ? "purple" : "blue"}
          fill="rgba(0,0,0,0.8)"
        />
        <rect
          ref={node => (this.resizeTopNode = node)}
          x={x + width / 2}
          y={y - 5}
          width={10}
          height={10}
          stroke="orange"
          fill="rgba(0,0,0,0.5)"
          style={{ cursor: "ns-resize" }}
        />
        <rect
          ref={node => (this.resizeBottomNode = node)}
          x={x + width / 2}
          y={y + height - 5}
          width={10}
          height={10}
          stroke="orange"
          fill="rgba(0,0,0,0.5)"
          style={{ cursor: "ns-resize" }}
        />
        <rect
          ref={node => (this.resizeLeftNode = node)}
          x={x - 5}
          y={y + height / 2}
          width={10}
          height={10}
          stroke="orange"
          fill="rgba(0,0,0,0.5)"
          style={{ cursor: "ew-resize" }}
        />
        <rect
          ref={node => (this.resizeRightNode = node)}
          x={x + width - 5}
          y={y + height / 2}
          width={10}
          height={10}
          stroke="orange"
          fill="rgba(0,0,0,0.5)"
          style={{ cursor: "ew-resize" }}
        />
      </g>
    );
  }
}
