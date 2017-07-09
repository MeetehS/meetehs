// @flow

import PropTypes from "prop-types";
import React, { Component } from "react";

import "./index.css";

class BottomLoading extends Component {
  static propTypes = {
    total: PropTypes.number.isRequired,
    pageNo: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    onLoad: PropTypes.func.isRequired
  };

  nativeBottomLoading = null;

  componentDidMount() {
    const intersectionObserver = new IntersectionObserver(entries => {
      const { total, pageNo, perPage, onLoad } = this.props;

      if (entries[0].intersectionRatio <= 0) {
        return;
      }

      if (total > pageNo * perPage) {
        onLoad(pageNo);
      }
    });

    intersectionObserver.observe(this.nativeBottomLoading);
  }

  render() {
    const { total, pageNo, perPage } = this.props;

    return (
      <div
        className="BottomLoading"
        ref={ele => {
          this.nativeBottomLoading = ele;
        }}
      >
        <span className="BottomLoading__loading">
          {pageNo * perPage >= total ? "No more" : "Loading..."}
        </span>
        <br />
        <span className="BottomLoading__tip">
          You have seen{" "}
          <span className="BottomLoading__tip__page-no">{pageNo}</span> pages
        </span>
      </div>
    );
  }
}

export default BottomLoading;
