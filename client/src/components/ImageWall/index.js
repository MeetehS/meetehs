import React, { Component } from 'react'

import './index.css'

import IMG_IMAGE_WALL from './image-wall.jpg'

class ImageWall extends Component {
  render() {
    return (
      <div className="ImageWall">
        <img className="ImageWall__img" src={IMG_IMAGE_WALL} alt="The wall of images" />
      </div>
    )
  }
}

export default ImageWall
