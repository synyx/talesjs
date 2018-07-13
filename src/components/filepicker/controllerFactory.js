import controller from "./controller";
import events from "../eventbus";

export default function create({ fileInput }) {
  return controller({ events, fileInput });
}
