import React from "react";
import PropTypes from "prop-types";

export default class Zoomable extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    maxZoom: PropTypes.number,
    zoomable: PropTypes.bool,
  };

  state = {
    zoom: 1,
  };

  componentDidMount() {
    const handleWheel = e => {
      if (!this.props.zoomable) {
        return;
      }
      e.preventDefault();
      window.requestAnimationFrame(() => {
        this.setState((state, props) => {
          const nextZoom = Number((state.zoom - e.deltaY * 0.01).toFixed(4));
          if (nextZoom >= 1 && nextZoom <= props.maxZoom) {
            return {
              zoom: nextZoom,
            };
          }
          return state;
        });
      });
    };

    window.addEventListener("wheel", handleWheel);

    this.unsubscribe = () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return this.props.children({ zoom: this.state.zoom });
  }
}
