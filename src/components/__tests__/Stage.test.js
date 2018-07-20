import React from "react";
import Stage from "../Stage";
import { renderShallow } from "../../../test";

describe("Stage", () => {
  it("renders without image", () => {
    const tree = renderShallow(<Stage />);
    expect(tree).toMatchSnapshot();
  });

  it("renders with image", () => {
    const image = { src: "awesome-image-source" };
    const tree = renderShallow(<Stage image={image} />);
    expect(tree).toMatchSnapshot();
  });
});
