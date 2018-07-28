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
      if (event.target.tagName !== "rect" && this.props.drawable) {
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
            shadow: {
              x: start.x,
              y: start.y,
            },
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
              shadow: {
                x: nextX,
                y: nextY,
              },
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

  handleRectangleMove(data) {
    const { rectangle } = this.state;
    const { x, y, width, height } = rectangle;
    let nextX = x + data.dx;
    let nextY = y + data.dy;
    if (nextX < 0) {
      nextX = 0;
    }
    if (nextY < 0) {
      nextY = 0;
    }

    const boundingClientRect = this.rootNode.getBoundingClientRect();
    const root = {
      x: boundingClientRect.x,
      y: boundingClientRect.y,
      width: boundingClientRect.width,
      height: boundingClientRect.height,
    };

    if (nextX + width > root.width) {
      nextX = root.x + root.width - width - 1;
    }
    if (nextY + height > root.height) {
      nextY = root.y + root.height - height - 1;
    }

    this.setState({
      rectangle: {
        ...rectangle,
        shadow: {
          x: nextX,
          y: nextY,
        },
      },
    });
  }

  handleRectangleMoveEnd() {
    const { rectangle } = this.state;
    this.setState({
      rectangle: {
        ...rectangle,
        x: rectangle.shadow.x,
        y: rectangle.shadow.y,
      },
    });
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
              <Rect
                x={rectangle.shadow.x}
                y={rectangle.shadow.y}
                width={rectangle.width}
                height={rectangle.height}
                onMove={data => this.handleRectangleMove(data)}
                onMoveEnd={() => this.handleRectangleMoveEnd()}
              />
            </svg>
          </div>
        )}
      </div>
    );
  }
}

class Rect extends React.Component {
  static propTypes = {
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
