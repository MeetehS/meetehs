// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import marked from 'marked'

import './index.css'

// import Avatar from '../Avatar'

marked.setOptions({
  sanitize: true
})

class PostItem extends Component {
  static propTypes = {
    id: PropTypes.string,
    content: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string
    }),
    comments: PropTypes.array,
    onEditButtonClick: PropTypes.func,
    showWholeContent: PropTypes.bool,
  }

  static defaultProps = {
    showWholeContent: true,
  }

  onEditButtonClick = () => {
    const { id, content, onEditButtonClick } = this.props

    onEditButtonClick({ id, content })
  }

  render() {
    const {
      content,
      modified,
      showWholeContent,
    } = this.props

    const renderContentHtml = () => {
      if (showWholeContent || content.length <= 140) {
        return {
          __html: marked(content)
        }
      } else {
        return {
          __html: marked(`${content.substr(0, 140)}...`)
        }
      }
    }

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

        {showWholeContent &&
          <section className="PostItem__operations">
            {/* <button>Reply</button> */}
            {/* <button>Like</button> */}
            <button onClick={this.onEditButtonClick}>Edit</button>
          </section>}

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
    )
  }
}

export default PostItem
