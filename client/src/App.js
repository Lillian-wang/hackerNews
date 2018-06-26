import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    lists: []
  };

  componentDidMount() {
    this.getLists()
      .then(res => {
        this.setState({ lists: res })
      })
      .catch(err => console.log(err));
  }

  getLists = async () => {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <span className="title"><img alt="icon" src="https://news.ycombinator.com/y18.gif" />Hacker News</span>
          <span>new | comments | show | ask | jobs | submit </span>
          <span className="login">Login</span>
        </div>
        <ul className="list-item-container">
          {this.state.lists.map((list, index) => <ListItem index={index} listItem={list} key={index} />)}
        </ul>
      </div>
    );
  }
}

class ListItem extends Component {
  state = {};
  componentDidMount() {
    this.getContent()
      .then(res => {
        this.setState(Object.assign(this.state, res))
      })
      .catch(err => console.log(err));
  }

  getContent = async () => {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${this.props.index}.json?print=pretty`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
      <div>
        <li className="list-item" key={this.props.index}>
          {this.state.type === 'story' &&
            <div>
              <span className="upper-arrow"></span><a className="article-title" href={this.state.url}> {this.state.title}</a>
              <p className="sub-title"> {this.state.score} points by {this.state.by} {Math.round((new Date().getTime() - this.state.time * 1000) / (60000 * 60 * 24 * 365))} years ago | past | web | {this.state.descendants} comments </p>
            </div>
          }
        </li>
      </div>
    );
  }
}

export default App;