import React, { Component } from 'react';
import Paragraph from './Paragraph';

export default class Article extends Component {

	render() {
		return (<div>
				{this.props.content.split('\n').map(t => {
        			return <Paragraph key={t} text={t} />
      			})}
      			<div className="articleFooter">
      				<a href={this.props.link}>{this.props.link}</a>
  				</div>
      			<div className="articleFooter">{this.props.pubDate}</div>
      		</div>)
	}
}