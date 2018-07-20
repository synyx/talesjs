import React from "react";
import PropTypes from "prop-types";
import Zoomable from "./Zoomable";
import Moveable from "./Moveable";

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
              <Moveable movable={zoom !== 1}>
                {({ left, top }) => (
                  <img
                    src={image.src}
                    style={{
                      transform: `scale(${zoom}, ${zoom}) translate3d(${left}px, ${top}px, 0)`,
                    }}
                  />
                )}
              </Moveable>
            )}
          </Zoomable>
        ) : null}
      </div>
    );
  }
}
