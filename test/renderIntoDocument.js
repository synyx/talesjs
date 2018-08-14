import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";

export default function renderIntoDocument(
  component,
  root = document.createElement("div"),
) {
  const tree = ReactDOM.render(component, root);

  return {
    find(element) {
      const resultList = ReactTestUtils.findAllInRenderedTree(tree, data => {
        return ReactTestUtils.isCompositeComponentWithType(data, element);
      });
      if (resultList.length !== 1) {
        throw new Error(
          "expected exactly one element to exist. But found nothing ore more.",
        );
      }
      return resultList[0];
    },

    simulate: new Proxy(ReactTestUtils.Simulate, {
      get(target, prop, receiver) {
        return new Proxy(target[prop], {
          apply(target, thisArg, argumentsList) {
            const [selector, ...args] = argumentsList;
            const node = root.querySelector(selector);
            return target(node, ...args);
          },
        });
      },
    }),

    expectToMatchSnapshot() {
      expect(root).toMatchSnapshot();
    },
  };
}
