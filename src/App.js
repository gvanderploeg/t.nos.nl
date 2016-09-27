import React, { Component } from 'react';

import './App.css';

class App extends Component {

  
constructor(props) {
    super(props);
    this.state = {
      title: 'initial',
      items: []
    };
  }


  parseRss(rss) {
    var doc = new DOMParser().parseFromString(rss, "text/xml");

      this.setState({
        title: "Doc found!",
        items: [].slice.call(doc.getElementsByTagName("item"))
      });
      console.log(this.state.items[0]);

  }
  componentDidMount() {
    this.serverRequest = fetch(this.props.source)
      // TODO: keep and parse it like a stream, instead of consuming the stream here.
    .then(r => r.text())
    .then(function(text) {
      this.parseRss(text);      
    }.bind(this));
    
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }


  render() {
      return (
         <div>
          <h3>Title is: {this.state.title}</h3>
          <ul>
          {this.state.items.map(function(item, x) {
              return <li key={x}>{x}: {item.childNodes[1].innerHTML}</li>;
          })}
            
          </ul>
        </div>
      );
    
  }
}

export default App;
