import React, { Component } from 'react';

export default class Paragraph extends Component {

	render() {
		var length = this.props.text.length,
			text = this.props.text;

		if (length > 20) {
			return <p key={text}>{text}</p>;
		} else {
			return <h4 key={text}>{text}</h4>;
		}		
	}
}