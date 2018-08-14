import React from "react";
import Rectangle from "../Rectangle";
import { renderShallow } from "../../../../test";

describe("Rectangle", () => {
  it("renders", () => {
    const props = setupProperties();
    const tree = renderShallow(<Rectangle {...props} />);
    expect(tree).toMatchSnapshot();
  });

  function setupProperties() {
    return {
      x: 10,
      y: 20,
      width: 800,
      height: 600,
    };
  }
});
