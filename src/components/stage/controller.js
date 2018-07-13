export default function create({ events, stage }) {
  events.subscribe("image/selected", function handleImageSelection(file) {
    const img = document.createElement("img");
    stage.removeChild(stage.firstChild);
    stage.appendChild(img);

    const reader = new FileReader();
    reader.onload = event => {
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
}
