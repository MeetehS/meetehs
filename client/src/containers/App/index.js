import React, { Component } from 'react'

import './index.css'

import Editor from '../Editor'
import Posts from '../Posts'

import ImageWall from '../../components/ImageWall'

class App extends Component {
  render() {
    return (
      <div className="App">
        <aside>
          <ImageWall />
        </aside>

        <main className="Posts">
          <header className="Posts__header">
            <Editor />
          </header>

          <section className="Posts__body">
            <Posts />
          </section>
        </main>
      </div>
    )
  }
}

export default App
