import React from "react";
import ImagePicker from "./components/ImagePicker";
import Stage from "./components/Stage";

export default class App extends React.Component {
  state = {
    image: null,
    action: "zoom",
  };

  handleFileSelect(file) {
    const reader = new FileReader();
    reader.onload = event => {
      this.setState({ image: { src: event.target.result } });
    };
    reader.readAsDataURL(file);
  }

  handleActionChange(event) {
    this.setState({ action: event.target.value });
  }

  render() {
    const { image, action } = this.state;
    return (
      <React.Fragment>
        <ImagePicker onFileSelect={data => this.handleFileSelect(data)} />
        <div>
          <input
            type="radio"
            name="action"
            value="zoom"
            id="action_zoom"
            onChange={event => this.handleActionChange(event)}
            checked={action === "zoom"}
          />
          <label htmlFor="action_zoom">zoom</label>
          <input
            type="radio"
            name="action"
            value="select"
            id="action_select"
            onChange={event => this.handleActionChange(event)}
            checked={action === "select"}
          />
          <label htmlFor="action_select">select</label>
        </div>
        <Stage image={image} action={action} />
      </React.Fragment>
    );
  }
}
