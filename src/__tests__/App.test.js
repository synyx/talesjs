import React from "react";
import { renderShallow } from "../../test";
import App from "../App";

describe("App", () => {
  it("renders", () => {
    const tree = renderShallow(<App />);
    expect(tree).toMatchSnapshot();
  });
});
