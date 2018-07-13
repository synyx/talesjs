export default function create({ events, fileInput }) {
  fileInput.addEventListener("change", event => {
    const file = event.target.files[0];
    if (file.type.startsWith("image/")) {
      events.dispatch("image/selected", file);
    }
  });
}
