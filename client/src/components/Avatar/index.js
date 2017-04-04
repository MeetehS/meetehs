import React, { Component, PropTypes } from 'react'

import './index.css'

import ICON_AVATAR_DEFAULT from './avatar-default.png'

class Avatar extends Component {
  static propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
  }

  static defaultProps = {
    src: ICON_AVATAR_DEFAULT,
    alt: '',
  }

  render() {
    const { className, alt, ...other } = this.props

    return (
      <img alt={alt} className={`Avatar ${className}`} {...other} />
    )
  }
}

export default Avatar
