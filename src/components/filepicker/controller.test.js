import controller from "./controller";

describe("controller", function() {
  it("subscribes 'change' listener on fileInput", () => {
    const fileInput = {
      addEventListener: jest.fn(),
    };
    controller({ fileInput });
    expect(fileInput.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });
});
