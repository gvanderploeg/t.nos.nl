import React, { Component } from 'react';

import './App.css';
//import ListItem from './ListItem.js';
//import Collapse from 'rc-collapse';
//var Panel = Collapse.Panel;
import { Accordion, AccordionItem } from 'react-sanfona';

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
        title: [].slice.call(doc.getElementsByTagName('title'))[0].textContent,
        items: [].slice.call(doc.getElementsByTagName("item"))
      });

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
          <h2>{this.state.title}</h2>
          <Accordion>

          {this.state.items.map(function(item, x) {
                var content = item.childNodes[7].textContent;
                var contentParagraphs = content.split('\n').map(t => {
                    return <p key={t}>{t}</p>;
                })
                return <AccordionItem key={x} slug={x} title={item.childNodes[1].textContent}>{contentParagraphs}</AccordionItem>
          })}
        </Accordion>
        </div>
      );
    
  }
}

export default App;
