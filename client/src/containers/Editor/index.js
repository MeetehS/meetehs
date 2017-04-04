import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'

import './index.css'

import { addPostMutation } from './graphql'
import { postsQuery } from '../Posts/graphql'

import Avatar from '../../components/Avatar'

const MODES = {
  normal: Symbol('normal'),
  mini: Symbol('mini'),
  whole: Symbol('whole'),
}

class Editor extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
  }

  state = {
    mode: MODES.normal,
    shareButtonDisabled: true,
    value: '',
  }

  handleInputFocus = () => {
    this.setState((prevState) => ({
      ...prevState,
      mode: MODES.mini,
    }))
  }

  handleTextareaBlur = () => {
    this.setState((prevState) => ({
      ...prevState,
      mode: MODES.normal,
    }))
  }

  handleChange = ({ target: { value } }) => {
    this.setState((prevState) => ({
      ...prevState,
      value,
    }))

    if (value.length >= 1) {
      this.setState((prevState) => ({
        ...prevState,
        shareButtonDisabled: false,
      }))
    } else {
      this.setState((prevState) => ({
        ...prevState,
        shareButtonDisabled: true,
      }))
    }

    if (value.length >= 140) {
      this.setState((prevState) => ({
        ...prevState,
        mode: MODES.whole,
      }))
    } else {
      this.setState((prevState) => ({
        ...prevState,
        mode: MODES.mini,
      }))
    }
  }

  handleShareButtonClick = async () => {
    const { value } = this.state
    const { mutate } = this.props

    try {
      await mutate({
        variables: { content: value },
        refetchQueries: [{
          query: postsQuery,
          variables: {
            pageNo: 1,
            perPage: 10,
          },
        }],
      })

      this.setState((prevState) => ({
        ...prevState,
        value: '',
        shareButtonDisabled: true,
      }))
    } catch (e) {
      console.error(`Editor > handleKeyPress > mutate error ${e.message}`)
    }
  }

  render() {
    const { mode, shareButtonDisabled, value } = this.state

    let MiniEditor = (
      <input
        className="Editor__input"
        type="text"
        placeholder="Share..."
        value={value}
        onFocus={this.handleInputFocus}
      />
    )

    if (mode === MODES.mini || mode === MODES.whole) {
      MiniEditor = (
        <textarea
          className="Editor__textarea"
          rows={mode === MODES.whole ? 23 : 3}
          minLength="1"
          placeholder="Share..."
          value={value}
          autoFocus
          onBlur={this.handleTextareaBlur}
          onChange={this.handleChange}
        />
      )
    }

    return (
      <div className="Editor">
        {MiniEditor}

        <div className="Editor__toolbox">
          <Avatar className="Editor__avatar" />

          {(mode === MODES.normal && value === '') || (
            <button
              className="Editor__share"
              disabled={shareButtonDisabled}
              onClick={this.handleShareButtonClick}
            >
              Share
            </button>
          )}
        </div>
      </div>
    )
  }
}

export default graphql(addPostMutation)(Editor)
