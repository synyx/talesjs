import React from "react";
import PropTypes from "prop-types";
import Zoomable from "./Zoomable";
import Moveable from "./Moveable";
import RectangleDrawer from "./RectangleDrawer";
import styles from "./stage.css";

export default class Stage extends React.Component {
  static propTypes = {
    image: PropTypes.object,
    action: PropTypes.oneOf(["zoom", "select"]),
  };

  static defaultProps = {
    action: "zoom",
  };

  render() {
    const { image, action } = this.props;
    return (
      <div className={styles.stage}>
        {image ? (
          <Zoomable maxZoom={5} zoomable={action === "zoom"}>
            {({ zoom }) => (
              <Moveable movable={action === "zoom" && zoom !== 1}>
                {({ left, top }) => (
                  <RectangleDrawer drawable={action === "select"}>
                    <img
                      src={image.src}
                      style={{
                        transform: `scale(${zoom}, ${zoom}) translate3d(${left}px, ${top}px, 0)`,
                      }}
                    />
                  </RectangleDrawer>
                )}
              </Moveable>
            )}
          </Zoomable>
        ) : null}
      </div>
    );
  }
}
