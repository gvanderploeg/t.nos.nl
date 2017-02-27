import React, { Component } from 'react';

import './App.css';
import Article from './Article';

//import ListItem from './ListItem.js';
//import Collapse from 'rc-collapse';
//var Panel = Collapse.Panel;
import { Accordion, AccordionItem } from 'react-sanfona';

class App extends Component {

  
  constructor(props) {
    super(props);
  
    this.initialState = {
      title: 'Loading...',
      pubDate: new Date(),
      items: []
    };

    this.state = this.initialState;
    this.refresh = this.refresh.bind(this);

  }

  parseRss(rss) {
    var doc = new DOMParser().parseFromString(rss, "text/xml");

      this.setState({
        title: [].slice.call(doc.getElementsByTagName('title'))[0].textContent,
        pubDate: new Date([].slice.call(doc.getElementsByTagName('pubDate'))[0].textContent),
        items: [].slice.call(doc.getElementsByTagName("item"))
      });

  }
  componentDidMount() {
    this.state = this.initialState;
    console.log("didmount");
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

  formatDateTime(d) {
    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    return datestring;
  }

  firstChildElementText(element, tagName) {
    var children = element.getElementsByTagName(tagName);
    if (children[0])
      return element.getElementsByTagName(tagName)[0].textContent;
    else 
      return "";
  }

  refresh(e) {
    e.preventDefault();
    this.componentDidMount();
  }


  render() {
      return (
         <div>
          <h2>{this.state.title}</h2>
          <div className="pageSubTitle">
            <a href="#" onClick={this.refresh}>{this.formatDateTime(this.state.pubDate)}</a>
          </div>
          {(this.state.items.length > 0) ? (
            <Accordion activeItem={-1}>
            {this.state.items.map(function(item, x) {
              var pubDate = item.getElementsByTagName("pubDate")[0].textContent;
              var content = item.getElementsByTagName("description")[0].textContent;
              var title = item.getElementsByTagName("title")[0].textContent;
              var link = item.getElementsByTagName("link")[0].textContent;
              return (<AccordionItem key={x} slug={x} title={title}>
                      <Article content={content} pubDate={pubDate} link={link} />
                    </AccordionItem>)
            })}
            </Accordion>
          ) : (<img role="presentation" src="throbber.gif" />)}          
        </div>
      );
    
  }
}

export default App;
