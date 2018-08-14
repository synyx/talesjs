import React from "react";
import PropTypes from "prop-types";

export default class ImagePicker extends React.Component {
  static propTypes = {
    onFileSelect: PropTypes.func.isRequired,
  };

  handleFileSelect(event) {
    const file = event.target.files[0];
    this.props.onFileSelect(file);
  }

  render() {
    return (
      <input
        type="file"
        accept="image/*"
        onChange={event => this.handleFileSelect(event)}
      />
    );
  }
}
