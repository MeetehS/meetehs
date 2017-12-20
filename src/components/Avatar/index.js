// @flow

import * as React from "react";

import "./index.css";

import ICON_AVATAR_DEFAULT from "./avatar-default.png";

type Props = {
  className: string,
  src: string,
  alt: string
};

class Avatar extends React.Component<Props> {
  static defaultProps = {
    src: ICON_AVATAR_DEFAULT,
    alt: ""
  };

  render() {
    const { className, alt, ...other } = this.props;

    return <img alt={alt} className={`Avatar ${className}`} {...other} />;
  }
}

export default Avatar;
