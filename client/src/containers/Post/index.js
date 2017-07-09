// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import { postQuery } from './graphql'

import Editor from '../Editor'
import PostItem from '../../components/PostItem'

class Post extends Component {
  state = {
    post: {
      content: '',
      modified: '',
    },
  }

  onEditButtonClick = post => {
    this.setState(prevState => ({
      ...prevState,
      post,
    }))
  }

  render() {
    const { post } = this.state
    const { match } = this.props
    const id = match.params.id

    return (
      <div>
        <Editor post={post} />

        <PostItemWithData id={id} onEditButtonClick={this.onEditButtonClick} />
      </div>
    )
  }
}

const PostItemWithData = graphql(postQuery, {
  options: ({ id }) => ({
    variables: {
      id,
    },
  }),
  props: ({ ownProps, data }) => {
    const post = data.post || {}
    const { content = '', modified = ''} = post

    return {
      ...ownProps,
      content,
      modified,
    }
  },
})(PostItem)

export default Post
