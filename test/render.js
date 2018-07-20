import ReactTestRenderer from "react-test-renderer";

export default function renderShallow(component, options) {
  return ReactTestRenderer.create(component, options);
}
