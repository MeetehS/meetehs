// @flow

import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PostList from "../PostList";
import Post from "../Post";

import ImageWall from "../ImageWall";

import "./index.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <aside>
          <ImageWall />
        </aside>

        <main className="List">
          <Router>
            <div>
              <Route exact path="/" component={PostList} />
              <Route path="/post/:id" component={Post} />
            </div>
          </Router>
        </main>
      </div>
    );
  }
}

export default App;
