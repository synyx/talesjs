const store = new Map();

export function subscribe(topic, listener) {
  if (store.has(topic)) {
    store.set(topic, [...store.get(topic), listener]);
  } else {
    store.set(topic, [listener]);
  }
  return () => {
    store.set(topic, [store.get(topic).filter(l => l !== listener)]);
  };
}

export function dispatch(topic, data) {
  store.get(topic).forEach(listener => listener(data));
}

export default {
  subscribe,
  dispatch,
};
