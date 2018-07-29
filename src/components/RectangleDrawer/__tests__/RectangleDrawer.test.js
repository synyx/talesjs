import React from "react";
import RectangleDrawer from "../RectangleDrawer";
import { renderShallow } from "../../../../test";

describe("RectangleDrawer", () => {
  it("renders", () => {
    const props = setupProperties();
    const tree = renderShallow(
      <RectangleDrawer {...props}>
        <img src="some.image" />
      </RectangleDrawer>,
    );
    expect(tree).toMatchSnapshot();
  });

  function setupProperties() {
    return {
      drawable: false,
    };
  }
});
