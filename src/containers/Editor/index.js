// @flow

import * as React from "react";
import { graphql } from "react-apollo";

import { addPostMutation } from "./graphql";
import { postsQuery } from "../PostList/graphql";
import { postQuery } from "../Post/graphql";

import Avatar from "../../components/Avatar";

import { COMMANDS, COMMAND_TRIGGERS } from "../../model/Commands";

import "./index.css";

const MODES = {
  normal: Symbol("normal"),
  mini: Symbol("mini"),
  whole: Symbol("whole")
};

const STATUS = {
  add: Symbol("add"),
  edit: Symbol("edit")
};

type Post = {
  id: string,
  content: string,
  modified: string
};

type Props = {
  mutate: Function,
  post: Post
};

type State = {
  status: Symbol,
  mode: Symbol,
  shareButtonDisabled: boolean,
  value: string
};

class Editor extends React.Component<Props, State> {
  static defaultProps = {
    post: {
      id: null
    }
  };

  state = {
    status: STATUS.add,
    mode: MODES.normal,
    shareButtonDisabled: true,
    value: ""
  };

  componentWillReceiveProps(nextProps: Props) {
    const { post } = nextProps;
    const { content } = post;
    const { value } = this.state;

    if (content === undefined) {
      return;
    }

    if (content !== value) {
      let mode = MODES.mini;
      if (content.length > 140) {
        mode = MODES.whole;
      }
      this.setState(prevState => ({
        ...prevState,
        status: STATUS.edit,
        mode,
        value: content
      }));
    }
  }

  handleInputFocus = () => {
    const { value } = this.state;
    let mode = MODES.mini;
    if (value.length > 140) {
      mode = MODES.whole;
    }
    this.setState(prevState => ({
      ...prevState,
      mode
    }));
  };

  handleTextareaBlur = () => {
    const { value } = this.state;
    let mode = MODES.normal;
    if (value.length > 140) {
      mode = MODES.whole;
    } else if (value.length > 0) {
      mode = MODES.mini;
    }
    this.setState(prevState => ({
      ...prevState,
      mode
    }));
  };

  handleKeyDown = (e: SyntheticInputEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const { value } = e.target;

      COMMAND_TRIGGERS.forEach(trigger => {
        if (value.startsWith(`@${trigger}`)) {
          e.preventDefault();
          COMMANDS[trigger](value.slice(trigger.length + 1));
        }
      });
    }
  };

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const { status } = this.state;

    this.setState(prevState => ({
      ...prevState,
      value
    }));

    if (status === STATUS.edit && value === "") {
      this.setState(prevState => ({
        ...prevState,
        status: STATUS.add
      }));
    }

    if (value.length >= 1) {
      this.setState(prevState => ({
        ...prevState,
        shareButtonDisabled: false
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        shareButtonDisabled: true
      }));
    }

    if (value.length >= 140) {
      this.setState(prevState => ({
        ...prevState,
        mode: MODES.whole
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        mode: MODES.mini
      }));
    }
  };

  handleShareButtonClick = async () => {
    const { value, status } = this.state;
    const { mutate, post } = this.props;

    this.setState(prevState => ({
      ...prevState,
      value: "",
      mode: MODES.normal,
      shareButtonDisabled: true
    }));

    let variables = { content: value, id: undefined };

    if (status === STATUS.edit) {
      variables.id = post.id;

      this.setState(prevState => ({
        ...prevState,
        status: STATUS.add
      }));
    }

    try {
      await mutate({
        variables,
        refetchQueries: [
          {
            query: postsQuery,
            variables: {
              pageNo: 1,
              perPage: 10
            }
          },
          {
            query: postQuery,
            variables: {
              id: post.id
            }
          }
        ]
      });
    } catch (e) {
      console.error(
        `Editor > handleShareButtonClick > mutate error ${e.message}`
      );
    }
  };

  render() {
    const { mode, shareButtonDisabled, value } = this.state;

    let MiniEditor = (
      <input
        className="Editor__input"
        type="text"
        placeholder="Share..."
        value={value}
        onFocus={this.handleInputFocus}
        onChange={this.handleChange}
      />
    );
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
          onKeyDown={this.handleKeyDown}
        />
      );
    }

    return (
      <div className="Editor">
        {MiniEditor}

        <div className="Editor__toolbox">
          <Avatar className="Editor__avatar" />

          {(mode === MODES.normal && value === "") || (
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
    );
  }
}

export default graphql(addPostMutation)(Editor);
