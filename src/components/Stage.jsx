import React from "react";
import PropTypes from "prop-types";

export default class Stage extends React.Component {
  static propTypes = {
    image: PropTypes.object,
  };

  render() {
    const { image } = this.props;
    return <div>{image ? <img src={image.src} /> : null}</div>;
  }
}
