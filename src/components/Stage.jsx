import React from "react";
import PropTypes from "prop-types";
import Zoomable from "./Zoomable";

export default class Stage extends React.Component {
  static propTypes = {
    image: PropTypes.object,
  };

  render() {
    const { image } = this.props;
    return (
      <div style={{ overflow: "hidden", width: "800px", height: "400px" }}>
        {image ? (
          <Zoomable maxZoom={5}>
            {({ zoom }) => (
              <img
                src={image.src}
                style={{ transform: `scale(${zoom}, ${zoom})` }}
              />
            )}
          </Zoomable>
        ) : null}
      </div>
    );
  }
}
