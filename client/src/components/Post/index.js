import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import marked from 'marked'

import './index.css'

marked.setOptions({
  sanitize: true,
})

class Post extends Component {
  static propTypes = {
    id: PropTypes.string,
    content: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    comments: PropTypes.array,
  }

  state = {
    showWholeContent: false,
  }

  handleContentClick = () => {
    this.setState(prevState => ({
      ...prevState,
      showWholeContent: !prevState.showWholeContent,
    }))
  }

  render() {
    const { showWholeContent } = this.state
    const { content, modified } = this.props

    const renderContentHtml = () => {
      if (showWholeContent || content.length <= 140) {
        return {
          __html: marked(content),
        }
      } else {
        return {
          __html: marked(`${content.substr(0, 140)}...`)
        }
      }
    }

    return (
      <article className="Post">
        <header className="Post__meta">
          {/* <Avatar className="Post__meta__avatar" /> */}
          {/* <span className="Post__meta__name">jelly&nbsp;</span> */}
          <span className="Post__meta__date">{`shared ${moment(modified).fromNow()}`}</span>
        </header>

        <section
          className="Post__content"
          dangerouslySetInnerHTML={renderContentHtml()}
          onClick={this.handleContentClick}
        />

        {/* <section className="Post__operations">
          <button>Reply</button>
          <button>Like</button>
        </section> */}

        {/* <section className="Post__comments">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="Post__comment">
              <Avatar className="Post__comment__avatar" />
              <span className="Post__comment__name">Food:&nbsp;</span>
              <span className="Post__comment__content">I'm using</span>
            </div>
          ))}
        </section> */}
      </article>
    )
  }
}

export default Post
