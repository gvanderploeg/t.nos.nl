import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

export default class Article extends Component {

	render() {
		return (<div>
    				{ReactHtmlParser(this.props.content)}

      			<div className="articleFooter">
      				<a href={this.props.link}>{this.props.link}</a>
  				</div>
      			<div className="articleFooter">{this.props.pubDate}</div>
      		</div>)
	}
}