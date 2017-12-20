// @flow

import React, { Component } from "react";

import * as UnsplashServices from "../../services/unsplash";

import "./index.css";

import IMG_IMAGE_WALL from "./image-wall.jpg";

class ImageWall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: IMG_IMAGE_WALL
    };
  }

  async componentDidMount() {
    try {
      const regularUrl = await UnsplashServices.getRandomPhoto();

      this.setState({
        url: regularUrl
      });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <div className="ImageWall">
        <img src={this.state.url} alt="The wall of images" />
      </div>
    );
  }
}

export default ImageWall;
