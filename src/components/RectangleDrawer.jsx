import React from "react";
import PropTypes from "prop-types";

export default class RectangleDrawer extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    drawable: PropTypes.bool,
  };

  static defaultProps = {
    movable: true,
    factor: 1,
  };

  state = {
    rectangle: null,
  };

  componentDidMount() {
    let start;
    let drawing = false;

    const boundingClientRect = this.rootNode.getBoundingClientRect();
    const root = {
      x: boundingClientRect.x,
      y: boundingClientRect.y,
    };

    const handleMouseDown = event => {
      if (this.props.drawable) {
        drawing = true;
        start = {
          x: event.clientX - root.x,
          y: event.clientY - root.y,
        };
        this.setState({
          rectangle: {
            x: start.x,
            y: start.y,
            width: 0,
            height: 0,
          },
        });
      }
    };

    const handleMouseMove = event => {
      if (this.props.drawable && drawing) {
        window.requestAnimationFrame(() => {
          let x = event.clientX - root.x;
          let y = event.clientY - root.y;
          let nextX = start.x;
          let nextY = start.y;
          let nextWidth = event.clientX - root.x - start.x;
          let nextHeight = event.clientY - root.y - start.y;
          if (nextWidth < 0) {
            nextX = x;
            nextWidth = Math.abs(nextWidth);
          }
          if (nextHeight < 0) {
            nextY = y;
            nextHeight = Math.abs(nextHeight);
          }
          this.setState({
            rectangle: {
              x: nextX,
              y: nextY,
              width: nextWidth,
              height: nextHeight,
            },
          });
        });
      }
    };

    const handleMouseUp = event => {
      drawing = false;
    };

    this.rootNode.addEventListener("mousedown", handleMouseDown);
    this.rootNode.addEventListener("mousemove", handleMouseMove);
    this.rootNode.addEventListener("mouseup", handleMouseUp);

    this.unsubscribe = () => {
      this.rootNode.removeEventListener("mousedown", handleMouseDown);
      this.rootNode.removeEventListener("mousemove", handleMouseMove);
      this.rootNode.removeEventListener("mouseup", handleMouseUp);
    };
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const style = { userSelect: "none", position: "relative" };
    const { rectangle } = this.state;
    return (
      <div style={style} ref={node => (this.rootNode = node)}>
        {this.props.children}
        {rectangle && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <svg width="100%" height="100%">
              <rect
                x={rectangle.x}
                y={rectangle.y}
                width={rectangle.width}
                height={rectangle.height}
                stroke="blue"
                fill="rgba(0,0,0,0.8)"
              />
            </svg>
          </div>
        )}
      </div>
    );
  }
}
