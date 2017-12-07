// @flow

import * as React from "react";

import "./index.css";

type Props = {
  total: number,
  pageNo: number,
  perPage: number,
  onLoad: Function
};

class BottomLoading extends React.Component<Props> {
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
