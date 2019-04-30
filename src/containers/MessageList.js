import React, { Component } from 'react';

export default class MessageList extends Component {
	render() {
		return (
			<div>
				{
					this.props.messages.map((message, index) => (
						<div key={index}>{message}</div>
					))
				}
			</div>
		);
	}
}

