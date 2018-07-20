import React from "react";
import ImagePicker from "./components/ImagePicker";
import Stage from "./components/Stage";

export default class App extends React.Component {
  state = {
    image: null,
  };

  handleFileSelect(file) {
    const reader = new FileReader();
    reader.onload = event => {
      this.setState({ image: { src: event.target.result } });
    };
    reader.readAsDataURL(file);
  }

  render() {
    const image = this.state.image;
    return (
      <React.Fragment>
        <ImagePicker onFileSelect={data => this.handleFileSelect(data)} />
        <Stage image={image} />
      </React.Fragment>
    );
  }
}
