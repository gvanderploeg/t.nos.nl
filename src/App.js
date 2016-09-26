import React, { Component } from 'react';

import './App.css';

class App extends Component {

constructor(props) {
    super(props);
    this.state = {
      title: 'initial'
    };
  }


  componentDidMount() {
    this.serverRequest = fetch(this.props.source, {
      mode: 'no-cors'
    })
    .then(function(response) {
      this.setState({
        title: "" + response.data
      })
      
    }.bind(this));
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }


  render() {
      return (
         <div>
        Title is: {this.state.title}</div>
      );
    
  }
}

export default App;
