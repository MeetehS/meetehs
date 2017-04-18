import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import Post from '../../components/Post'
import BottomLoading from '../../components/BottomLoading'

import { postsQuery } from './graphql'

class Posts extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.instanceOf(Error),
      posts: PropTypes.array,
      total: PropTypes.number,
    }),
    onEditButtonClick: PropTypes.func,
  }

  state = {
    pageNo: 1,
    perPage: 10,
  }

  handleLoad = () => {
    const { pageNo, perPage } = this.state
    const { data: { fetchMore } } = this.props

    fetchMore({
      variables: {
        pageNo: pageNo + 1,
        perPage,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult
        }
        return {
          ...previousResult,
          posts: [...previousResult.posts, ...fetchMoreResult.posts],
        }
      },
    })

    this.setState((prevState) => ({
      ...prevState,
      pageNo: prevState.pageNo + 1,
    }))
  }

  render() {
    const { pageNo, perPage } = this.state
    const { data: { posts = [], total = 0 }, onEditButtonClick } = this.props

    return (
      <div>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            content={post.content}
            modified={post.modified}
            onEditButtonClick={() => { onEditButtonClick(post) }}
          />
        ))}

        <BottomLoading
          total={total}
          pageNo={pageNo}
          perPage={perPage}
          onLoad={this.handleLoad}
        />
      </div>
    )
  }
}

export default graphql(postsQuery, {
  options: {
    variables: {
      pageNo: 1,
      perPage: 10,
    },
  },
})(Posts)
