import React from "react";
import PropTypes from "prop-types";
import Rectangle from "./Rectangle";

export default class RectangleDrawer extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    drawable: PropTypes.bool,
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
              width: 0,
              height: 0,
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
                width: nextWidth,
                height: nextHeight,
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
          ...rectangle.shadow,
          x: nextX,
          y: nextY,
        },
      },
    });
  }

  handleRectangleMoveEnd() {
    this.flushRectangleShadow();
  }

  handleRectangleResize({ dx, dy, dwidth, dheight }) {
    const boundingClientRect = this.rootNode.getBoundingClientRect();
    const root = {
      x: boundingClientRect.x,
      y: boundingClientRect.y,
      width: boundingClientRect.width,
      height: boundingClientRect.height,
    };

    const { rectangle } = this.state;
    let nextX = rectangle.x + dx;
    let nextWidth = rectangle.width + dwidth;
    if (nextX < 0) {
      // left overflow of the container (moving left resize item)
      // therefore setting min nextX value of 0
      // and nextWidth to the current rectangle(shadow) width
      nextX = 0;
      nextWidth = rectangle.shadow.width;
    }
    if (nextX + nextWidth > root.width) {
      // nextWidth would overflow the container
      // therefore setting max width value for current mouse x position
      nextWidth = root.x + root.width - nextX;
    }
    if (nextWidth < 0) {
      // mouse is moved more to the left than the original x value
      // therefore setting new width to positive delta value
      // and the nextX value to the current mouse x position
      nextWidth = Math.abs(nextWidth);
      nextX = rectangle.x - nextWidth;
      if (nextX < 0) {
        // left overflow of the container (moving right resize item)
        // therefore setting min nextX value of 0
        // and nextWidth to the original rectangle x value
        nextX = 0;
        nextWidth = rectangle.x;
      }
    }

    let nextY = rectangle.y + dy;
    let nextHeight = rectangle.height + dheight;
    if (nextY < 0) {
      // top overflow of the container (moving top resize item)
      // therefore setting min nextY value of 0
      // and nextHeight to the current rectangle(shadow) height
      nextY = 0;
      nextHeight = rectangle.shadow.height;
    }
    if (nextY + nextHeight > root.height) {
      // nextHeight would overflow the container
      // therefore setting max height value for current mouse y position
      nextHeight = root.y + root.height - nextY;
    }
    if (nextHeight < 0) {
      // mouse is moved more to the top than the original y value
      // therefore setting new height to positive delta value
      // and the nextY value to the current mouse y position
      nextHeight = Math.abs(nextHeight);
      nextY = rectangle.y - nextHeight;
      if (nextY < 0) {
        // top overflow of the container (moving bottom resize item)
        // therefore setting min nextY value of 0
        // and nextHeight to the original rectangle y value
        nextY = 0;
        nextHeight = rectangle.y;
      }
    }

    this.setState({
      rectangle: {
        ...rectangle,
        shadow: {
          ...rectangle.shadow,
          x: nextX,
          y: nextY,
          width: nextWidth,
          height: nextHeight,
        },
      },
    });
  }

  handleRectangleResizeEnd() {
    this.flushRectangleShadow();
  }

  flushRectangleShadow() {
    const { rectangle } = this.state;
    const { shadow } = rectangle;
    this.setState({
      rectangle: { ...shadow, shadow },
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
              <Rectangle
                x={rectangle.shadow.x}
                y={rectangle.shadow.y}
                width={rectangle.shadow.width}
                height={rectangle.shadow.height}
                onMove={data => this.handleRectangleMove(data)}
                onMoveEnd={() => this.handleRectangleMoveEnd()}
                onResize={data => this.handleRectangleResize(data)}
                onResizeEnd={() => this.handleRectangleResizeEnd()}
              />
            </svg>
          </div>
        )}
      </div>
    );
  }
}
