// @flow

import * as React from "react";
import moment from "moment";
import marked from "marked";

import "./index.css";

// import Avatar from '../Avatar'

marked.setOptions({
  sanitize: true
});

type Props = {
  id: string,
  content: string,
  modified: string,
  author: Object,
  // comments: Array,
  onEditButtonClick: Function,
  showWholeContent: boolean
};

class PostItem extends React.Component<Props> {
  static defaultProps = {
    showWholeContent: true
  };

  onEditButtonClick = () => {
    const { id, content, onEditButtonClick } = this.props;

    onEditButtonClick({ id, content });
  };

  render() {
    const { content, modified, showWholeContent } = this.props;

    const renderContentHtml = () => {
      if (showWholeContent || content.length <= 140) {
        return {
          __html: marked(content)
        };
      } else {
        return {
          __html: marked(`${content.substr(0, 140)}...`)
        };
      }
    };

    return (
      <article className="PostItem">
        <header className="PostItem__meta">
          {/* <Avatar className="PostItem__meta__avatar" /> */}
          {/* <span className="PostItem__meta__name">jelly&nbsp;</span> */}
          <span className="PostItem__meta__date">{`shared ${moment(
            modified
          ).fromNow()}`}</span>
        </header>

        <section
          className="PostItem__content"
          dangerouslySetInnerHTML={renderContentHtml()}
        />

        {showWholeContent && (
          <section className="PostItem__operations">
            {/* <button>Reply</button> */}
            {/* <button>Like</button> */}
            <button onClick={this.onEditButtonClick}>Edit</button>
          </section>
        )}

        {/* <section className="PostItem__comments">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="PostItem__comment">
          <Avatar className="PostItem__comment__avatar" />
          <span className="PostItem__comment__name">Food:&nbsp;</span>
          <span className="PostItem__comment__content">I'm using</span>
            </div>
          ))}
        </section> */}
      </article>
    );
  }
}

export default PostItem;
