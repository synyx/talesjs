import ReactTestRendererShallow from "react-test-renderer/shallow";

export default function renderShallow(component) {
  const renderer = ReactTestRendererShallow.createRenderer();
  renderer.render(component);
  return renderer.getRenderOutput();
}
