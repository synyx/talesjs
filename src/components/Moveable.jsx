import React from "react";
import PropTypes from "prop-types";

export default class Moveable extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    movable: PropTypes.bool,
    factor: PropTypes.number,
  };

  static defaultProps = {
    movable: true,
    factor: 1,
  };

  state = {
    top: 0,
    left: 0,
  };

  componentDidMount() {
    let imageLeft = 0;
    let imageTop = 0;
    let mouseStartLeft = 0;
    let mouseStartTop = 0;

    const handleDragStart = event => {
      if (this.props.movable) {
        imageLeft = this.state.left;
        imageTop = this.state.top;
        mouseStartLeft = event.clientX;
        mouseStartTop = event.clientY;
      } else {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const handleDrag = event => {
      if (!event.screenY && !event.screenX) {
        return;
      }
      window.requestAnimationFrame(() => {
        this.setState((state, props) => {
          const deltaTop = mouseStartTop - event.clientY;
          const deltaLeft = mouseStartLeft - event.clientX;
          const top =
            deltaTop < mouseStartTop
              ? imageTop - deltaTop
              : imageTop + deltaTop;
          const left =
            deltaLeft < mouseStartLeft
              ? imageLeft - deltaLeft
              : imageLeft + deltaLeft;
          return { top, left };
        });
      });
    };

    const handleDragEnd = event => {};

    this.rootNode.addEventListener("dragstart", handleDragStart);
    this.rootNode.addEventListener("drag", handleDrag);
    this.rootNode.addEventListener("dragend", handleDragEnd);

    this.unsubscribe = () => {
      this.rootNode.removeEventListener("dragstart", handleDragStart);
      this.rootNode.removeEventListener("drag", handleDrag);
      this.rootNode.removeEventListener("dragend", handleDragEnd);
    };
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div ref={node => (this.rootNode = node)} style={{ userSelect: "none" }}>
        {this.props.children({
          top: this.state.top,
          left: this.state.left,
        })}
      </div>
    );
  }
}
