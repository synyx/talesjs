import React from "react";
import ImagePicker from "../ImagePicker";
import { renderShallow, renderIntoDocument } from "../../../test";

describe("ImagePicker", () => {
  beforeEach(() => {});

  it("renders", () => {
    const props = setupProperties();
    const tree = renderShallow(<ImagePicker {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("invokes #onFileSelect on file selection", () => {
    const props = setupProperties();
    const { simulate } = renderIntoDocument(<ImagePicker {...props} />);

    expect(props.onFileSelect).not.toHaveBeenCalled();

    const file = { type: "image/foo" };
    simulate.change("input", { target: { files: [file] } });

    expect(props.onFileSelect).toHaveBeenCalledWith(file);
  });

  function setupProperties() {
    return {
      onFileSelect: jest.fn(),
    };
  }
});
