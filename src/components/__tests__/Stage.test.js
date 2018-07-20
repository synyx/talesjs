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
    const tree = render(<Stage image={image} />);
    expect(tree).toMatchSnapshot();
  });
});
