// @flow

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'

import Editor from '../Editor'

import PostItem from '../../components/PostItem'
import BottomLoading from '../../components/BottomLoading'

import { postsQuery } from './graphql'

import './index.css'

class PostList extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.instanceOf(Error),
      posts: PropTypes.array,
      total: PropTypes.number
    }),
    onEditButtonClick: PropTypes.func
  }

  state = {
    pageNo: 1,
    perPage: 10
  }

  handleLoad = () => {
    const { pageNo, perPage } = this.state
    const { data: { fetchMore } } = this.props

    fetchMore({
      variables: {
        pageNo: pageNo + 1,
        perPage
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult
        }
        return {
          ...previousResult,
          posts: [...previousResult.posts, ...fetchMoreResult.posts]
        }
      }
    })

    this.setState(prevState => ({
      ...prevState,
      pageNo: prevState.pageNo + 1
    }))
  }

  render() {
    const { pageNo, perPage } = this.state
    const { data: { posts = [], total = 0 }, onEditButtonClick } = this.props

    return (
      <div className="PostList">
        <Editor />

        {posts.map(post =>
          <Link key={post.id} to={`/post/${post.id}`}>
            <PostItem
              id={post.id}
              showWholeContent={false}
              content={post.content}
              modified={post.modified}
              onEditButtonClick={() => {
                onEditButtonClick(post)
              }}
            />
          </Link>
        )}

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
      perPage: 10
    }
  }
})(PostList)
