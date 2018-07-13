import controller from "./controller";
import events from "../eventbus";

export default function create({ stage }) {
  return controller({ events, stage });
}
