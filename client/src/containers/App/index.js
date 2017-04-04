import React, { Component } from 'react'

import './index.css'

import Editor from '../Editor'
import Posts from '../Posts'

import ImageWall from '../../components/ImageWall'

class App extends Component {
  state = {
    post: null,
  }

  onEditButtonClick = (post) => {
    this.setState((prevState) => ({
      ...prevState,
      post,
    }))
  }

  render() {
    const { post } = this.state

    return (
      <div className="App">
        <aside>
          <ImageWall />
        </aside>

        <main className="Posts">
          <header className="Posts__header">
            <Editor post={post} />
          </header>

          <section className="Posts__body">
            <Posts onEditButtonClick={this.onEditButtonClick} />
          </section>
        </main>
      </div>
    )
  }
}

export default App
