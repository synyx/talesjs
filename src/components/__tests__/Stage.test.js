import React from "react";
import Stage from "../Stage";
import { render } from "../../../test";

describe("Stage", () => {
  it("renders without image", () => {
    const tree = render(<Stage />);
    expect(tree).toMatchSnapshot();
  });

  it("renders with image", () => {
    const image = { src: "awesome-image-source" };
    const tree = render(<Stage image={image} />, { createNodeMock });
    expect(tree).toMatchSnapshot();
  });

  // ref does not work with TestRenderer without configuration
  // we have to create an element by ourselves which is used as ref node
  function createNodeMock(element) {
    if (element.type === "div") {
      return document.createElement("div");
    }
    return null;
  }
});
